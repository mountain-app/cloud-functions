import { User } from "../entities/User";
import { Repository } from "./Repository";
import { FIND_USER_BY_ID_OR_EMAIL, SAVE_USER } from "../queries/userQueries";

export interface IUserRepository {
  findByIdOrEmail(id?: string, email?: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export class UserRepository extends Repository implements IUserRepository {
  public async findByIdOrEmail(
    id?: string,
    email?: string
  ): Promise<User | null> {
    const users = await super.connectQueryAndDisconnect(
      FIND_USER_BY_ID_OR_EMAIL,
      [id, email]
    );

    return users.length ? User.fromTableRow(users[0]) : null;
  }

  public async save({
    id,
    email,
    firstName,
    lastName,
    birthday,
    gender,
  }: User): Promise<User> {
    const createdUser = await super.connectQueryAndDisconnect(SAVE_USER, [
      id,
      email,
      firstName,
      lastName,
      birthday,
      gender,
    ]);

    return User.fromTableRow(createdUser[0]);
  }
}
