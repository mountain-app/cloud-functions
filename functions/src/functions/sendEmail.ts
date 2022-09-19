import * as functions from "firebase-functions";
import sgMail = require("@sendgrid/mail");

export const sendEmail = functions
  .region("europe-west2")
  .https.onCall(() => {
    sgMail.setApiKey(""); // TODO: Set to env variables
    const msg = {
      to: "example@example.com",
      from: "example@example.com",
      subject: "Lorem ipsum dolor sit amet",
      text: "Lorem ipsum dolor sit amet",
      html: "Lorem ipsum dolor sit amet",
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
