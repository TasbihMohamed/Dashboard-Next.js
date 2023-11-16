import { randomBytes, randomInt, randomUUID } from 'crypto';
import { Document, MongoClient, UpdateFilter } from 'mongodb';
import {
  Category,
  CategoryInsertionData,
  Customer,
  ExportableCategory,
  ExportableCustomer,
  ExportableOrder,
  ExportableProduct,
  Order,
  Product,
  ProductInsertionData,
  Store,
  Token,
  User,
} from '../types/DataBase';

const client = new MongoClient(
  'mongodb+srv://shoptak:Shoptak000@shoptak.qxlpen6.mongodb.net',
  {
    family: 4,
  },
);

export const db = client.db('shoptak-platform');

export const Collections = {
  Users: db.collection<User>('users'),
  Products: db.collection<Product>('products'),
  Stores: db.collection<Store>('stores'),
  Orders: db.collection<Order>('orders'),
  Categories: db.collection<Category>('categories'),
  Tokens: db.collection<Token>('tokens'),
  Customers: db.collection<Customer>('customers'),
};

/* Users Start */

export async function addNewUser(data: User): Promise<string> {
  const _id = randomBytes(16).toString('hex');
  await Collections.Users.insertOne({ ...data });
  return _id;
}

export async function getUserById(_id: string): Promise<User | null> {
  const user = await Collections.Users.findOne({ _id });

  if (user) return user;

  return null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await Collections.Users.findOne({ email });

  if (user) return user;

  return null;
}

export async function updateUserData(
  _id: string,
  payload: User,
): Promise<boolean> {
  await Collections.Users.updateOne({ _id }, { $set: payload });
  return true;
}

/* Users End */

/* Tokens Start */

export async function addToken(id: string, time: number): Promise<void> {
  await Collections.Tokens.insertOne({ _id: id, time });
}

export async function setToken(id: string, time: number): Promise<void> {
  await Collections.Tokens.updateOne({ _id: id }, { $set: { time } });
}

export async function hasToken(id: string, time: number): Promise<boolean> {
  return Boolean(await Collections.Tokens.countDocuments({ _id: id, time }));
}

/* Tokens End */

/* Store Start */

export async function getUserStore(_id: string): Promise<Store | null> {
  const store = await Collections.Stores.findOne({ _id });

  if (store) return store;

  return null;
}

export async function getStoreByUserId(userId: string): Promise<Store | null> {
  const store = await Collections.Stores.findOne({ userId });

  if (store) return store;

  return null;
}

export async function updateUserStore(
  _id: string,
  payload: Store,
): Promise<boolean | null> {
  const store = await Collections.Stores.updateOne({ _id }, { $set: payload });
  if (store) return true;
  return null;
}

/* Store End */

/* Products Start */

export async function addNewProduct(
  data: ProductInsertionData,
): Promise<string> {
  const _id = `SP${randomInt(100_000_000, 999_999_999)}`;

  await Collections.Products.insertOne({
    _id,
    ...data,
  });

  return _id;
}

export async function getProducts(
  userId: string,
  offset: number = 0,
  limit: number = 10,
): Promise<ExportableProduct[]> {
  return (await Collections.Products.aggregate([
    { $match: { owner: userId } },
    { $addFields: { id: '$_id' } },
    { $project: { _id: 0, owner: 0 } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [
          { $addFields: { id: '$_id' } },
          { $project: { _id: 0, owner: 0 } },
        ],
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        id: 1,
        name: 1,
        description: 1,
        price: 1,
        category: { $ifNull: ['$category', null] },
        discount: 1,
        tax: 1,
        mainImage: 1,
        barcode: 1,
        sku: 1,
        weight: 1,
        stockQuantity: 1,
        images: 1,
      },
    },
    { $skip: offset },
    { $limit: limit },
  ]).toArray()) as ExportableProduct[];
}

export async function getProductsCount(userId: string): Promise<number> {
  return await Collections.Products.countDocuments({ owner: userId });
}

export async function productExists(
  userId: string,
  _id: string,
): Promise<boolean> {
  return Boolean(
    await Collections.Products.countDocuments({ owner: userId, _id }),
  );
}

export async function getProductById(
  userId: string,
  _id: string,
): Promise<ExportableProduct | null> {
  const product = (await Collections.Products.aggregate([
    { $match: { _id, owner: userId } },
    { $addFields: { id: '$_id' } },
    { $project: { _id: 0, owner: 0 } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [
          { $addFields: { id: '$_id' } },
          { $project: { _id: 0, owner: 0 } },
        ],
      },
    },
    {
      $unwind: {
        path: '$category',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        id: 1,
        name: 1,
        description: 1,
        price: 1,
        category: { $ifNull: ['$category', null] },
        discount: 1,
        tax: 1,
        mainImage: 1,
        barcode: 1,
        sku: 1,
        weight: 1,
        stockQuantity: 1,
        images: 1,
      },
    },
  ]).next()) as ExportableProduct;

  if (product) return product;

  return null;
}

export async function updateProductById(
  userId: string,
  _id: string,
  update: UpdateFilter<Product>,
): Promise<void> {
  await Collections.Products.updateOne({ _id, owner: userId }, update);
}

export async function deleteProductById(
  userId: string,
  _id: string,
): Promise<void> {
  await Collections.Products.deleteOne({ _id, owner: userId });
}

export async function productImageExists(
  productId: string,
  filename: string,
): Promise<boolean> {
  return Boolean(
    await Collections.Products.countDocuments({
      _id: productId,
      $or: [
        {
          mainImage: filename,
        },
        {
          images: filename,
        },
      ],
    }),
  );
}

export async function categoryHasProducts(
  userId: string,
  category: string,
): Promise<boolean> {
  return Boolean(
    await Collections.Products.countDocuments({ owner: userId, category }),
  );
}

/* Products End */

/* Categories Start */

export async function addNewCategory(
  data: CategoryInsertionData,
): Promise<string> {
  const _id = randomUUID({ disableEntropyCache: true });

  await Collections.Categories.insertOne({
    _id,
    ...data,
  });

  return _id;
}

export async function getAllCategories(
  userId: string,
): Promise<ExportableCategory[]> {
  return (await Collections.Categories.aggregate([
    { $match: { owner: userId } },
    { $addFields: { id: '$_id' } },
    { $project: { _id: 0, owner: 0 } },
  ]).toArray()) as ExportableCategory[];
}

export async function getCategoryById(
  userId: string,
  _id: string,
): Promise<ExportableCategory | null> {
  return (await Collections.Categories.aggregate([
    { $match: { owner: userId } },
    { $addFields: { id: '$_id' } },
    { $project: { _id: 0, owner: 0 } },
  ]).next()) as ExportableCategory;
}

export const userHasCategory = async (
  userId: string,
  _id: string,
): Promise<boolean> => {
  return Boolean(
    await Collections.Categories.countDocuments({
      owner: userId,
      _id,
    }),
  );
};

export async function deleteCategoryById(
  userId: string,
  _id: string,
): Promise<void> {
  await Collections.Categories.deleteOne({ _id, owner: userId });
}

export async function categoryImageExists(
  categoryId: string,
  filename: string,
): Promise<boolean> {
  return Boolean(
    await Collections.Categories.countDocuments({
      _id: categoryId,
      image: filename,
    }),
  );
}

/* Categories End */

/* Orders Start */

const ordersAggregationPipeline = [
  {
    $project: { store: 0 },
  },
  {
    $unwind: {
      path: '$products',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $unwind: {
      path: '$_products',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: 'customers',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer',
      pipeline: [
        { $addFields: { id: '$_id' } },
        { $project: { _id: 0, id: 1, name: 1, email: 1 } },
      ],
    },
  },
  {
    $lookup: {
      from: 'products',
      localField: 'products.id',
      foreignField: '_id',
      as: 'product',
      pipeline: [
        { $project: { _id: 0 } },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
            pipeline: [
              { $addFields: { id: '$_id' } },
              { $project: { _id: 0, owner: 0 } },
            ],
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            price: 1,
            category: { $mergeObjects: '$category' },
            mainImage: 1,
            images: 1,
            sku: 1,
            barcode: 1,
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 1,
      product: {
        $mergeObjects: ['$products', { $mergeObjects: '$product' }],
      },
      orderDate: 1,
      paymentMethod: 1,
      totalAmount: 1,
      shippingAddress: 1,
      status: 1,
    },
  },
  {
    $group: {
      _id: '$_id',
      products: { $push: '$product' },
      orderDate: { $first: '$orderDate' },
      paymentMethod: { $first: '$paymentMethod' },
      totalAmount: { $first: '$totalAmount' },
      shippingAddress: { $first: '$shippingAddress' },
      status: { $first: '$status' },
    },
  },
  { $addFields: { id: '$_id' } },
  { $project: { _id: 0 } },
];

function aggregateOrders($match: Document) {
  return Collections.Orders.aggregate<ExportableOrder>([
    { $match },
    ...ordersAggregationPipeline,
  ]);
}

export async function getOrderById(
  _id: string,
  store: string,
): Promise<ExportableOrder | null> {
  const order = await aggregateOrders({ _id, store }).next();

  if (order) return order;

  return null;
}

export async function getOrdersCount(store: string): Promise<number> {
  return await Collections.Orders.countDocuments({ store });
}

export async function getOrders(
  store: string,
  offset: number = 0,
  limit: number = 10,
): Promise<ExportableOrder[]> {
  return await aggregateOrders({ store }).skip(offset).limit(limit).toArray();
}

/* Orders End */

/* Customers Start */

function aggregateCustomers($match: Document) {
  return Collections.Customers.aggregate<ExportableCustomer>([
    { $match },
    {
      $lookup: {
        from: 'orders',
        let: {
          storeId: '$store',
          customerId: '$_id',
        },
        as: 'orders',
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $expr: {
                    $eq: ['$customer', '$$customerId'],
                  },
                },
                {
                  $expr: {
                    $eq: ['$store', '$$storeId'],
                  },
                },
              ],
            },
          },
          ...ordersAggregationPipeline,
          {
            $sort: {
              orderDate: -1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        id: '$_id',
        status: 'Active', // temporary static value
        lastOrder: { $first: '$orders' },
      },
    },
    {
      $addFields: {
        lastOrderDate: '$lastOrder.orderDate',
      },
    },
    { $project: { _id: 0, lastOrder: 0 } },
  ]);
}

export async function getCustomers(
  store: string,
  offset: number = 0,
  limit: number = 10,
): Promise<ExportableCustomer[]> {
  return await aggregateCustomers({ store })
    .skip(offset)
    .limit(limit)
    .toArray();
}

export async function getCustomerById(
  _id: string,
  store: string,
): Promise<ExportableCustomer | null> {
  return (await aggregateCustomers({ _id, store }).next()) || null;
}

/* Customers Start */
