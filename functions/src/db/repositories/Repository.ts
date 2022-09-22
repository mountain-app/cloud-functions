import { Client, QueryResultRow } from "pg";

export class Repository {
  constructor(private readonly pgClient: Client) {}

  public async connectQueryAndDisconnect<T extends QueryResultRow>(
    query: string,
    values: any[]
  ): Promise<T[]> {
    await this.pgClient.connect();

    const queryResult = await this.pgClient.query<T>(query, values);

    await this.pgClient.end();

    return queryResult.rows;
  }
}
