import { Pool, QueryResultRow } from "pg";

export class Repository {
  constructor(private readonly pool: Pool) {}

  public async connectQueryAndDisconnect<T extends QueryResultRow>(
    query: string,
    values: any[]
  ): Promise<T[]> {
    const client = await this.pool.connect();

    const queryResult = await client.query<T>(query, values);

    client.release();

    return queryResult.rows;
  }
}
