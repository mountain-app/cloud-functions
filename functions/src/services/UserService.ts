/* eslint-disable require-jsdoc */
import { Pool, QueryResult } from "pg";
import { pool } from "../clients/postgres";
import { UserDTO } from "../dtos/UserDTO";
import { User } from "../entities/User";

class UserService {
  constructor(private readonly pool: Pool) {}

  async getUserByIdOrEmail(id: string, email: string): Promise<UserDTO> {
    const queryResult = await this.pool.query(
      `
        SELECT * FROM "User" 
            WHERE id = $1 OR email = $2
      `,
      [id, email]
    );

    return UserService.mapUserResult(queryResult)[0];
  }

  async createUser(user: User): Promise<UserDTO> {
    const queryResult = await this.pool.query(
      `
        INSERT INTO "User" (
            id, 
            email, 
            first_name, 
            last_name, 
            birthday, 
            gender, 
            updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING *
      `,
      [
        user.id,
        user.email,
        user.firstName,
        user.lastName,
        user.birthday,
        user.gender,
      ]
    );

    return UserService.mapUserResult(queryResult)[0];
  }

  private static mapUserResult(queryResult: QueryResult): UserDTO[] {
    return queryResult.rows
      .map((row) => {
        const userDTO: UserDTO = {
          id: row.id,
          email: row.email,
          firstName: row.first_name,
          lastName: row.last_name,
          birthday: row.birthday,
          createdAt: row.created_at.toISOString(),
          updatedAt: row.updated_at.toISOString(),
        };

        return userDTO;
      })
      .filter((user) => user.id !== undefined);
  }
}

export const userService = new UserService(pool);
