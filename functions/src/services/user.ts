import { User, Prisma } from "@mountain-app/orm";
import * as functions from "firebase-functions";
import { UserDTO } from "../dtos";
// import statusToErrorCodeMapper from "../utils/statusToErrorCodeMapper";

export const createUser = functions
  .region("europe-west2")
  .https.onCall(async (_, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    const existingUser = await Prisma.getInstance().user.findFirst({
      where: {
        OR: [{ email: auth.token.email }, { id: auth.uid }],
      },
    });

    if (existingUser) {
      return existingUser;
    }

    functions.logger.info("Creating user with id: ", auth.uid);

    const userToCreate: UserDTO = {
      id: auth.uid,
      email: auth.token.email || "", // c'è sempre o no la mail?
      name: auth.token.name,
    };

    try {
      const user: User = await Prisma.getInstance().user.create({
        data: userToCreate,
      });

      functions.logger.info(
        `User with id: ${user.id} successfully created: `,
        user
      );

      return user;
    } catch (err: any) {
      functions.logger.error(err);
      //   throw new functions.https.HttpsError(
      //     statusToErrorCodeMapper[err.response.data.status],
      //     err.response.data.message,
      //     {
      //       status: err.response.data.status,
      //     }
      //   );
      // @FIX
      throw new functions.https.HttpsError("unknown", JSON.stringify(err));
    }
  });
