import { ReactElement } from 'react';

export interface Product {
  id: string;
  name: string;
  sku: number;
  Meta: Array<string>;
  price: number;
  ImageSrc: Array<ProductImg> | string;
  Sales: number;
  Amount: number;
  status: string;
  category: {
    id: string;
    name: string;
    image: {
      uri: string;
      filename: string;
      size: number;
    };
  };
  brand: string;
  createdAt: Date;
  stockQuantity: number;
  description: string;
  weight: number; // "mass" Value in KG
  owner: string; // @User.id
  quantity: number;
}

export type ProductImg = {
  id: number;
  photoURL: string;
};

export interface FastAnalyticsItem {
  cardTitle: string;
  result: string;
  percentage: string;
  colorOne: string | null;
  colorTwo: string | null;
  iconColor: string | null;
  icon: ReactElement;
}

export interface NavItem {
  title: string;
  route: string;
  icon: ReactElement;
  isMain?: boolean;
  children?: Array<NavItem> | null;
}

export interface LangItem {
  title: string;
  lang: Object;
  key: string;
  ico: string;
}

export interface ColorPlatte {
  _primaryColor: string;
  _primaryColor100: string;
  _primaryColor50: string;
  _altColor: string;
  _grayOne: string;
  _hover: string;
  _borderLightColor: string;
  _lightSelected: string;
  _lightSelectedTwo: string;
  _buttonBorder: string;
  _yellow_500: string;
  _yellow_50: string;
  _darkBackground: string;
  _lightBackground: string;
}

export interface TimelineItem {
  time: string;
  value: number;
  timestamp: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
  balance: number;
  // curreny?: string;
  status: string;
  lastOrderDate: Date;
}

export interface Category {
  id: number;
  title: string;
  thumbnail: string;
  sales: number;
  added: Date;
  stock: number;
}

export interface Order {
  id: string;
  orderDate: Date;
  paymentMethod: string;
  totalAmount: {
    unit: string;
    value: number;
    symbol: string;
  };
  shippingAddress: {
    country: string;
    city: string;
    state: string;
    street1: string;
    postalCode: string;
  };
  status: string;
  products: Product[];

  // dummy types
  phone: string;
  email: string;
  invoice: string;
  customer: string;
  shippingMethod: string;
  shipping: string;
  rewards: string;
}

export type OrderDetails = Omit<Order, 'shippingMethod'> & {
  addresses: Order['shippingAddress'][];
  name: string;
  lastOrderDate: Date;
  orders: Order[];
};
