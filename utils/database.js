import mongoose from 'mongoose';

let isConnected = false; //singleton -> track if db is connected (to avoid multiple connections)

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('=> using new database connection');
  } catch (error) {
    console.log('=> error while connecting with database:', error);
    throw error;
  }
};
