import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MANGODB_URI);
    console.log("Database connected :" + conn.connection.host)
  } catch (error) {
    console.log("Error in connecting to Database", error.message);
  }
}

export default connectDb;