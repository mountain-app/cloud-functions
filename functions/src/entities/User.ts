export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}
