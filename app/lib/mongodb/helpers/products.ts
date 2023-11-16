import MongoDBClient from '../client';

const getProducts = async () => {
  const client = await MongoDBClient;
  const db = client.db('shoptak_userDB');
  return db.collection('products').aggregate().toArray();
};

export { getProducts };
