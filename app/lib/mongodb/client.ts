import { MongoClient } from 'mongodb';

// Replace the following with values for your environment.
const username = encodeURIComponent('shoptak');
const password = encodeURIComponent('Shoptak000');
const clusterUrl = 'shoptak.qxlpen6.mongodb.net';
const authMechanism = 'DEFAULT';
// Replace the following with your MongoDB deployment's connection string.
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
// Create a new MongoClient
const MongoDBClient = new MongoClient(uri).connect();

export default MongoDBClient;
