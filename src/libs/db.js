import "server-only";
import { MongoClient, ServerApiVersion } from "mongodb"

if( ! process.env.MONGO_URI ){
    throw new Error('Please add your Mongo URI to .env.local')
}

const Client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function getDB(DBName) {
    try {
        await Client.connect();
        console.log("Connected successfully to database server");
        return Client.db(DBName);
    } catch (error) {
        console.log(error);
    }
}

export async function getCollection(collectionName) {
    const DB = await getDB(process.env.DB_NAME);
    if(DB){
        return DB.collection(collectionName);
    }
    return null;
}