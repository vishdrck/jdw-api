import mongoose, { MongooseError } from 'mongoose';
import { BaseCommad } from './base.command';
import 'dotenv';

export class RefreshDBCommand extends BaseCommad {
  constructor() {
    const commandName = 'refresh';
    const help =
      '--refresh [Drop the database. Database name must be configured in .env file.]';
    super(commandName, help);
  }

  public async execute(): Promise<boolean> {
    const mongoURL = this.parseMongoURL();
    mongoose
      .connect(mongoURL)
      .then((res) => {
        console.log(res);
      })
      .catch((error: MongooseError) => {
        console.log(error.message);
      });
    mongoose.connection.once('open', () => {
      console.log('Connection to the Mongo has been initialized');
    });

    await mongoose.connection
      .dropDatabase()
      .then(async (result) => {
        try {
          mongoose.connection.close();
          return result;
        } catch (errorDropDatabase) {
          console.error(errorDropDatabase);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return false;
  }

  private parseMongoURL(): string {
    const DB_NAME = process.env.DB_NAME;
    const DB_USERNAME = process.env.DB_USERNAME;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_PORT = process.env.DB_PORT;
    const DB_HOSTNAME = process.env.DB_HOSTNAME;

    if (DB_NAME && DB_USERNAME && DB_PASSWORD) {
      return `mongodb://${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@${
        DB_HOSTNAME ?? 'localhost'
      }:${DB_PORT ?? '27017'}/${DB_NAME}`;
    } else {
      return `mongodb://${DB_HOSTNAME ?? 'localhost'}:${
        DB_PORT ?? '27017'
      }/${DB_NAME}`;
    }
  }
}
