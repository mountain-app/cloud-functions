import * as functions from "firebase-functions";
import { User } from "../db/entities";
import pool from "../db/pool";
import {
  CREATE_USER_QUERY,
  FIND_USER_BY_ID_OR_EMAIL_QUERY,
} from "../db/queries";

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
      const findUserByIdOrEmailResult = await pool.query<User>(
        FIND_USER_BY_ID_OR_EMAIL_QUERY,
        [auth.uid, auth.token.email]
      );

      const existingUser = findUserByIdOrEmailResult.rows[0];

      if (existingUser) {
        return existingUser;
      }

      functions.logger.error("Creating user with id: ", auth.uid);

      const createUserResult = await pool.query<User>(CREATE_USER_QUERY, [
        auth.uid,
        auth.token.email,
        auth.token.name,
      ]);

      const createdUser = createUserResult.rows[0];

      functions.logger.error("User successfully created: ", createdUser);

      return createdUser;
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
      throw new functions.https.HttpsError("unknown", err);
    }
  });
