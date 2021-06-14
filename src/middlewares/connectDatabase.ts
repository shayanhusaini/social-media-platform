import { User } from "../entity/User";
import { createConnection, Connection } from "typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import { Post } from "../entity/Post";

let _db: Connection;
async function connect(): Promise<Connection> {
  return createConnection({
    type: process.env.DB_TYPE || "mongodb",
    url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [User, Post],
    migrations: [__dirname + "../migration/**/*.{.ts,.js}"],
    subscribers: [__dirname + "../subscriber/**/*.{.ts,.js}"],
    cli: {
      entitiesDir: __dirname + "../entity",
      migrationsDir: __dirname + "../migration",
      subscribersDir: __dirname + "../subscriber",
    },
  } as MongoConnectionOptions).catch((reason: any) => {
    console.error(reason);
    return {} as Connection;
  });
}

export async function getDb(): Promise<Connection> {
  if (!_db) {
    _db = await connect();
  }

  return _db;
}
