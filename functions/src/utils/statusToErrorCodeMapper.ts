import * as functions from "firebase-functions";

const statusToErrorCodeMapper: {
  [key: number]: functions.https.FunctionsErrorCode;
} = {
  500: "internal",
  409: "already-exists",
  404: "not-found",
  400: "invalid-argument",
};

export default statusToErrorCodeMapper;
