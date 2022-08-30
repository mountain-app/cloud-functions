import * as functions from "firebase-functions";
import pool from "../db/pool";
import {
  CREATE_USER_QUERY,
  FIND_USER_BY_ID_OR_EMAIL_QUERY,
} from "../db/queries";

/**
 * @TODO Fix Timestamps, add mapping from user table to User entity
 */

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
      const findUserByIdOrEmailResult = await pool.query(
        FIND_USER_BY_ID_OR_EMAIL_QUERY,
        [auth.uid, auth.token.email]
      );

      const existingUser = findUserByIdOrEmailResult.rows[0];

      if (existingUser) {
        // use a mapper to map from user table to User entity and to do this
        existingUser.created_at = existingUser.created_at.toISOString();
        existingUser.updated_at = existingUser.updated_at.toISOString();
        return existingUser;
      }

      functions.logger.info("Creating user with id: ", auth.uid);

      const createUserResult = await pool.query(CREATE_USER_QUERY, [
        auth.uid,
        auth.token.email,
        auth.token.name,
      ]);

      const createdUser = createUserResult.rows[0];

      functions.logger.info("User successfully created", createdUser);

      // use a mapper to map from user table to User entity and to do this
      createdUser.created_at = createdUser.created_at.toISOString();
      createdUser.updated_at = createdUser.updated_at.toISOString();

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
