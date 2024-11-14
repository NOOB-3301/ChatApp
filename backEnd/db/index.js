import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

const uri = "mongodb+srv://arkabasak62:oICWAAbsL4Ywk1Ql@cluster0.2ulvm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


async function connectdb() {
  try {
    const connResp = await mongoose.connect(uri)
    console.log("database connected",connResp.connection.host)
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

export {  connectdb };
