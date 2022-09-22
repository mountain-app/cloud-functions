import * as admin from "firebase-admin";
admin.initializeApp();
import * as functions from "firebase-functions";

export const updatePassword = functions
  .region("europe-west2")
  .https.onCall(async (userCredential: { email: string; password: string }) => {
    admin
      .auth()
      .getUserByEmail(userCredential.email)
      .then((userRecord) => {
        console.log("Successfully fetched user data:", userRecord.toJSON());
        admin
          .auth()
          .updateUser(userRecord.uid, {
            password: userCredential.password,
          })
          .then(() => {
            console.log("Password updated");
          })
          .catch(() => {
            console.log("Error while updating the user password");
          });
      })
      .catch(() => {
        console.log("Error while getting the user uid");
      });
  });
