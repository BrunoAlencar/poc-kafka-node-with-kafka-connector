import mongoose, { Mongoose, Connection } from 'mongoose';

let database: Connection;
export const connect = () => {
  // add your own uri below
  const uri = String(process.env.MONGODB_URI);
  console.log('🚀 ~ file: database.ts ~ line 7 ~ connect ~ uri', uri);

  if (database) {
    return;
  }
  mongoose.connect(uri);
  database = mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
