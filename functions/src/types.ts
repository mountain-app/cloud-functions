import { UserDTO } from "./dtos/UserDTO";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export type UserInfo = Pick<UserDTO, "firstName" | "lastName" | "birthday">;
