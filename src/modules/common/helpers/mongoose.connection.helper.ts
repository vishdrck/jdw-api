export function getMongooseConnection() {
  const DB_NAME = process.env.DB_NAME;
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_PORT = process.env.DB_PORT;

  if (DB_NAME && DB_USERNAME && DB_PASSWORD) {
    const url = `mongodb://${DB_USERNAME}:${encodeURIComponent(
      DB_PASSWORD,
    )}@localhost:${DB_PORT ?? '27017'}/${DB_NAME}`;
    console.log(url);
    return url;
  } else {
    const url = `mongodb://localhost:${DB_PORT ?? '27017'}/${DB_NAME}`;
    console.log(url);
    return url;
  }
}
