import * as functions from "firebase-functions";
import { setApiKey, send, MailDataRequired } from "@sendgrid/mail";
import { PasswordResetInfo } from "../entities/PasswordResetInfo";

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async (passwordResetInfo: PasswordResetInfo) => {
    setApiKey("");
    const msg: MailDataRequired = {
      to: passwordResetInfo.email,
      from: "denardincarlodev@gmail.com",
      subject: "Recupero password MountainApp",
      text: `Il codice per recuperare la password è ${passwordResetInfo.code}`,
      templateId: "d-4e9220fbe02d402ea13c5c236c2095a4",
    };
    send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  });
