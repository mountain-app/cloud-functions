/* eslint-disable require-jsdoc */
import { Pool, QueryResult } from "pg";
import { UserDTO } from "../../dtos/UserDTO";

export class UserService {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

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

  async createUser(user: UserDTO): Promise<UserDTO> {
    const queryResult = await this.pool.query(
      `
        INSERT INTO "User" (id, email, name, updated_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
      `,
      [...Object.values(user)]
    );

    return UserService.mapUserResult(queryResult)[0];
  }

  private static mapUserResult(queryResult: QueryResult): UserDTO[] {
    return queryResult.rows
      .map((row) => {
        return {
          id: row.id,
          email: row.email,
          name: row.name || undefined,
          createdAt: row.created_at.toISOString(),
          updatedAt: row.updated_at.toISOString(),
        };
      })
      .filter((user) => user.id !== undefined);
  }
}
