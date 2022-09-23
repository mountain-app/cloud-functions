import * as functions from "firebase-functions";
import * as sendGrid from "@sendgrid/mail";
import * as dotenv from "dotenv";

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(async ({ email, code }: { email: string; code: string }) => {
    dotenv.config();

    console.log(process.env.SENDGRID_API_KEY);

    sendGrid.setApiKey(process.env.SENDGRID_API_KEY || "");

    try {
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

      await sendGrid.send(msg);

      console.log("Email sent");
    } catch (error) {
      console.error(error);
    }
  });
