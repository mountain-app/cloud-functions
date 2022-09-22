import { User } from "../db/entities/User";
import { Gender } from "../types";

export class UserDTO {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public birthday: Date;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromEntity(user: User): UserDTO {
    return new UserDTO(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.birthday,
      user.createdAt,
      user.updatedAt
    );
  }

  public toEntity(gender: Gender): User {
    return new User(
      this.id,
      this.email,
      this.firstName,
      this.lastName,
      this.birthday,
      gender,
      this.createdAt,
      this.updatedAt
    );
  }
}
