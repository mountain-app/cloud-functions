import * as functions from "firebase-functions";
import { HttpsError } from "firebase-functions/v1/auth";
import { UserService } from "../db/services/UserService";
import { UserInfo } from "../types";
import { genderize } from "../utils/genderize";

export const persistPostgresUser = functions
  .region("europe-west2")
  .https.onCall(async (userInfo: UserInfo, { auth }) => {
    const userService = new UserService();

    if (!auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    try {
      const existingUser = await userService.getUserByIdOrEmail(
        auth.uid,
        auth.token.email!
      );

      if (existingUser) {
        return existingUser;
      }

      functions.logger.info("Creating user with id: ", auth.uid);

      const gender = await genderize(userInfo.firstName);

      functions.logger.info(userInfo.birthday);

      const createdUser = await userService.createUser({
        id: auth.uid,
        email: auth.token.email!,
        gender,
        ...userInfo,
      });

      functions.logger.info(
        `User with id: ${createdUser.id} successfully created`
      );

      return createdUser;
    } catch (err) {
      functions.logger.error(err);

      if (err instanceof HttpsError) {
        throw err;
      }

      throw new functions.https.HttpsError("internal", "Something went wrong");
    }
  });
