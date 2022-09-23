import * as functions from "firebase-functions";
import * as sendGrid from "@sendgrid/mail";

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async () => {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY || "");

    try {
      const msg: sendGrid.MailDataRequired = {
        to: "denardincarlo@gmail.com",
        from: "denardincarlodev@gmail.com",
        subject: "Recupero password MountainApp",
        text: "Il codice per recuperare la password è 1234",
        templateId: "d-3233deca4c654dfe96691847f3aea421",
        dynamicTemplateData: {
          name: "Carlodev",
        },
      };

      await sendGrid.send(msg);

      console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  });
