import axios from "axios";
import { Gender } from "../types";

interface GenderizeResponse {
  name: string;
  gender: "male" | "female";
  probability: number;
  count: number;
}

export const GENDERIZE_API_KEY = "YOUR_API_KEY"; // For the future (possibly)
export const GENDERIZE_BASE_URL = "https://api.genderize.io";

/**
 * Genderize a name
 * @see https://api.genderize.io
 * @param {string} name The name to genderize
 * @return {Gender} MALE, FEMALE or UNKNOWN if probability is less that 0.7
 */
export const genderize = async (name: string): Promise<Gender> => {
  const firstName = name.split(" ")[0];

  const { data } = await axios.get<GenderizeResponse>(
    `${GENDERIZE_BASE_URL}/?name=${firstName}`
  );

  if (data.probability < 0.7) {
    return Gender.UNKNOWN;
  }

  return data.gender === "male" ? Gender.MALE : Gender.FEMALE;
};
