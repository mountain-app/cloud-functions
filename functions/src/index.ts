import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

const API_URL = "https://mountain-app-server-test.herokuapp.com/api";

export const createUser = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("Creating user with id:", user.uid);

  const token = await admin.credential.applicationDefault().getAccessToken();

  try {
    const response = await axios.post(
      `${API_URL}/restricted/users`,
      {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    functions.logger.info("User successfully created: ", response.data);

    return response.data;
  } catch (err) {
    functions.logger.error(err);
  }
});
