import { UserDTO } from "./dtos/UserDTO";

export type UserInfo = Pick<UserDTO, "firstName" | "lastName" | "birthday">;
