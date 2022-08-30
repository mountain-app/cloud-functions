import * as functions from "firebase-functions";
import { userService } from "../db";

export const createUser = functions
  .region("europe-west2")
  .https.onCall(async (_, { auth }) => {
    if (!auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    try {
      const existingUser = await userService.getUserByIdOrEmail(
        auth.uid,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        auth.token.email!
      );

      if (existingUser) {
        return existingUser;
      }

      functions.logger.info("Creating user with id: ", auth.uid);

      const createdUser = await userService.createUser(
        auth.uid,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        auth.token.email!,
        auth.token.name
      );

      functions.logger.info("User successfully created", createdUser);

      return createdUser;
    } catch (err) {
      functions.logger.error(err as Error);

      throw new functions.https.HttpsError("internal", "Something went wrong");
    }
  });
