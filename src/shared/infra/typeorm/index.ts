import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const isTestEnvironment = process.env.NODE_ENV === "test";

  Object.assign(defaultOptions, {
    host: isTestEnvironment ? "localhost" : host,
    database: isTestEnvironment ? "rentx_test" : defaultOptions.database,
  });

  return createConnection(defaultOptions);
};
