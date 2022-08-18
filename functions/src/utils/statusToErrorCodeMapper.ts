import * as functions from "firebase-functions";

const statusToErrorCodeMapper: {
  [key: number]: functions.https.FunctionsErrorCode;
} = {
  500: "internal",
  409: "already-exists",
};

export default statusToErrorCodeMapper;
