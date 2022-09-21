import * as functions from "firebase-functions";
import { PasswordResetInfo } from "../entities/PasswordResetInfo";
import * as sendGrid from "@sendgrid/mail";

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async (passwordResetInfo: PasswordResetInfo) => {
    sendGrid.setApiKey("");

    const msg: sendGrid.MailDataRequired = {
      to: passwordResetInfo.email,
      from: "denardincarlodev@gmail.com",
      subject: "Recupero password MountainApp",
      text: `Il codice per recuperare la password è ${passwordResetInfo.code}`,
    };

    try {
      sendGrid.send(msg);
      console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  });
