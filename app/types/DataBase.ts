import { ImageObject } from '../utils/api-helpers';

export interface Category {
  _id: string;
  name: string;
  owner: string; // @User.id
  image: string;
}

export interface ExportableCategory
  extends Omit<Category, '_id' | 'image' | 'owner'> {
  id: string;
  image: ImagePipeline;
}

export type CategoryInsertionData = Omit<Category, '_id'>;

type Address = {
  country: string;
  city: string;
  state: string;
  street: string;
  street1: string;
  street2?: string;
  postalCode?: string;
};

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  tax: number;
  mainImage: string;
  images: string[];
  stockQuantity: number;
  barcode: string;
  sku: string;
  weight: number; // "mass" Value in KG
  owner: string; // @User.id
}

/*
  'string' => Initial value returned from Database
  'ImageObject' => Exported with Direct URL
  null => fallback if image not found
*/
type ImagePipeline = string | ImageObject | null;

export interface ExportableProduct
  extends Omit<Product, '_id' | 'owner' | 'category' | 'mainImage' | 'images'>,
    Omit<ProductExportableImages, 'category'> {
  id: string;
  category: ProductExportableImages['category'] | null;
}

export type ProductInsertionData = Omit<Product, '_id'>;

export type ProductUpdateData = Partial<Product>;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  birthday: number;
  balance: Currency;
  email: string;
  password: string;
  phoneNumber: string;
  address: Address;
  storeId: string | null;
  preferredCategories: Category[];
}

export interface Currency {
  unit: string;
  value: number;
  symbol: string;
}

type OrderedProduct = {
  id: string; // @Product.id
  quantity: number;
};

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  _id: string;
  customer: string; // @Customer.id
  store: string; // @Store.id
  products: OrderedProduct[];
  orderDate: number; // Timestamp
  paymentMethod: 'visa' | 'mastercard';
  totalAmount: Currency;
  shippingAddress: Address;
  status: OrderStatus;
}

type ProductExportableImages = {
  mainImage: ImagePipeline;
  images: ImagePipeline[];
  category: Omit<Category, '_id' | 'image' | 'owner'> & {
    id: string;
    image: ImagePipeline;
  };
};

export interface ExportableOrder {
  id: string;
  customer: string; // @Customer.id
  products: (OrderedProduct &
    Omit<Product, '_id' | 'category' | 'mainImage' | 'images'> &
    ProductExportableImages)[];
  orderDate: number; // Timestamp
  paymentMethod: 'visa' | 'mastercard';
  totalAmount: Currency;
  shippingAddress: Address;
  status: OrderStatus;
}

/* @WaleedKamal edit this */
type Payment = {
  name: string;
  type: 'visa' | 'mastercard';
  card: string; // Card number
  cvv: string;
  expireMonth: string;
  expireYear: string;
};

export interface Store {
  _id: string;
  userId: string;
  storeName: string;
  storeDescription: string;
  storeLogo: string;
}

export interface Customer {
  _id: string;
  store: string;
  name: string;
  email: string;
  phone: string;
  balance: string;
  joinTime: number;
  payment: Payment[];
  addresses: Address[];
}

export interface ExportableCustomer extends Omit<Customer, '_id'> {
  id: string;
  orders: ExportableOrder[];
}

export interface Token {
  _id: string;
  time: number;
}
