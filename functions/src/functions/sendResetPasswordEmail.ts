import * as functions from "firebase-functions";
import * as sendGrid from "@sendgrid/mail";

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async ({ email, code }: { email: string; code: string }) => {
    sendGrid.setApiKey("");

    const msg: sendGrid.MailDataRequired = {
      to: email,
      from: "denardincarlodev@gmail.com",
      subject: "Recupero password MountainApp",
      text: `Il codice per recuperare la password è ${code}`,
      templateId: "d-3233deca4c654dfe96691847f3aea421",
      dynamicTemplateData: {
        name: "Carlodev",
      },
    };

    try {
      sendGrid.send(msg);
      console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  });
