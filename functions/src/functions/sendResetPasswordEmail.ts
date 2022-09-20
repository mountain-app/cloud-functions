import * as functions from "firebase-functions";
import sgMail = require("@sendgrid/mail");
import { PasswordResetInfo } from "../entities/PasswordResetInfo";

// TODO: Generate the code here and send back to the caller if the send gives no errors.
export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async (passwordResetInfo: PasswordResetInfo) => {
    sgMail.setApiKey(
      "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");
    const msg = {
      to: passwordResetInfo.email,
      from: "denardincarlodev@gmail.com",
      subject: "Recupero password MountainApp",
      text: `Il codice per recuperare la password è ${passwordResetInfo.code}`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  });
