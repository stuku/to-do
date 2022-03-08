import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export async function connectDb(): Promise<void> {
    mongoServer = await MongoMemoryServer.create();;
    const uri: string = mongoServer.getUri();
    await mongoose.connect(uri);
};

export async function disconnectDb(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

export async function clearDb(): Promise<void> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};