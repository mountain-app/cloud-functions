import { QueryResultRow } from "pg";
import { Gender } from "../../types";

export class User {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public birthday: Date;
  public gender: Gender;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    birthday: Date,
    gender: Gender,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.gender = gender;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromTableRow(row: QueryResultRow): User {
    return new User(
      row.id,
      row.email,
      row.first_name,
      row.last_name,
      row.birthday,
      row.gender,
      row.created_at,
      row.updated_at
    );
  }
}
