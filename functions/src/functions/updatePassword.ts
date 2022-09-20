import * as admin from "firebase-admin";
admin.initializeApp();
import * as functions from "firebase-functions";
import { UserCredential } from "../entities/UserCredential";

export const updatePassword = functions
  .region("europe-west2")
  .https.onCall(async (userCredential: UserCredential) => {
    admin.auth().getUserByEmail(userCredential.email)
        .then(function(userRecord) {
            console.log("Successfully fetched user data:", userRecord.toJSON());
            admin.auth().updateUser(userRecord.uid, {
                password: userCredential.password,
            })
                .then(function(userRecord) {
                    console.log("Password updated");
                })
                .catch(function(error) {
                  console.log("Error while updating the user password");
                });
        })
        .catch(function(error) {
            console.log("Error while getting the user uid");
        });
  });
