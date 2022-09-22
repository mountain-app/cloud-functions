import { Client, ClientConfig, QueryResultRow } from "pg";

export class Repository {
  private readonly pgClient: Client;
  constructor(pgClientConfig: ClientConfig) {
    this.pgClient = new Client(pgClientConfig);
  }

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
