import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "asdafdsf";
    mongo = await MongoMemoryServer.create();
    const mongo_uri = mongo.getUri();

    await mongoose.connect(mongo_uri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})