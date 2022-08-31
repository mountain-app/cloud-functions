import { UserDTO } from "./dtos/UserDTO";

export type UserInfo = Omit<
  UserDTO,
  "id" | "email" | "createdAt" | "updatedAt"
>;
