import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import statusToErrorCodeMapper from "./utils/statusToErrorCodeMapper";
import { User } from "./dtos";
import { Prisma } from "@mountain-app/orm";

admin.initializeApp(); // forse non serve

// o usiamo il context per accedere ai dati dello user
// oppure lo passiamo noi come primo argomento
export const createUser = functions.https.onCall(async (_, { auth }) => {
  if (!auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );
  }

  functions.logger.info("Creating user with id: ", auth.uid);

  const userToCreate: User = {
    id: auth.uid,
    email: auth.token.email || "", // c'è sempre o no la mail?
    name: auth.token.name,
  };

  try {
    const user = await Prisma.getInstance().user.create({
      data: userToCreate,
    });

    functions.logger.info(
      `User with id: ${user.id} successfully created: `,
      user
    );

    return user;
  } catch (err: any) {
    throw new functions.https.HttpsError(
      statusToErrorCodeMapper[err.response.data.status],
      err.response.data.message,
      {
        status: err.response.data.status,
      }
    );
  }
});
