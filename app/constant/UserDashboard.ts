import React from 'react';
import { BiStore, BiSupport } from 'react-icons/bi';
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { FiSettings } from 'react-icons/fi';
import danish from '../../messages/da.json';
import deutsch from '../../messages/de.json';
import english from '../../messages/en.json';
import {
  ColorPlatte,
  LangItem,
  NavItem,
  TimelineItem,
} from '../types/UserDashboard';

const SalesByLocation = [
  {
    country: 'United Kingdom',
    salesCount: 580,
    revenue: 17678,
    percentage: '-14%',
    key: 'uk',
  },
  {
    country: 'Denmark',
    salesCount: 685,
    revenue: 17678,
    percentage: '-14%',
    key: 'da',
  },
  {
    country: 'USA',
    salesCount: 42,
    revenue: 17678,
    percentage: '-14%',
    key: 'us',
  },
  {
    country: 'Germany',
    salesCount: 20,
    revenue: 17678,
    percentage: '-14%',
    key: 'de',
  },
  {
    country: 'Sweeden',
    salesCount: 35,
    revenue: 17678,
    percentage: '-14%',
    key: 'se',
  },
];

const Categories = [
  {
    id: 0,
    title: 'Mobiles & Electronices',
    thumbnail: '',
    sales: 560,
    added: new Date(),
    stock: 51,
  },
  {
    id: 1,
    title: 'Accessoires',
    thumbnail: '',
    sales: 100,
    added: new Date(),
    stock: 58,
  },
];

const ProductsMockupArray = [
  {
    id: '0',
    name: 'Black Bag - From Zara 3',
    sku: 202015,
    Meta: [],
    price: 9.25,
    ImageSrc: '/placeholder_product.jpg',
    Sales: 100,
    Amount: 8540,
    status: 'LowStock',
    category: 1,
    brand: 'Zara',
    description: 'This is Product',
    createdAt: new Date(),
    stockQuantity: 5,
    weight: 1.5, // "mass" Value in KG
    owner: 'Okasha', // @User.id
    quantity: 0,
  },
];

const COLORS: ColorPlatte = {
  _primaryColor: '#771FCB',
  _primaryColor100: '#DEDEFA',
  _primaryColor50: '#dedefa7d',
  _altColor: '#F81E6E',
  _buttonBorder: '#E0E2E7',
  _grayOne: '#667085',
  _hover: '#dce8f2',
  _borderLightColor: '#e0e0e05c',
  _lightSelected: '#DEDEFA',
  _lightSelectedTwo: '#EFEFFD',
  _yellow_500: '#E46A11',
  _yellow_50: '#FDF1E8',
  _darkBackground: '#2d3748',
  _lightBackground: '#2e2e2f08',
};

const LANGS: Array<LangItem> = [
  { title: 'English', lang: english, key: 'en', ico: '/lang/en.png' },
  { title: 'Danske', lang: danish, key: 'da', ico: '/lang/da.png' },
  { title: 'Deutsch', lang: deutsch, key: 'de', ico: '/lang/de.png' },
];

const oneDay = 24 * 60 * 60 * 1000;

const TIMELINES: Array<TimelineItem> = [
  { time: 'All Time', value: 1, timestamp: Number.MAX_SAFE_INTEGER },
  { time: '12 Months', value: 2, timestamp: 12 * 30 * oneDay },
  { time: '30 Days', value: 3, timestamp: 30 * oneDay },
  { time: '7 Days', value: 4, timestamp: 7 * oneDay },
  { time: '24 Hour', value: 5, timestamp: oneDay },
];

const NAV_ITEMS: Array<NavItem> = [
  {
    title: 'Dashboard',
    route: '/',
    icon: React.createElement(RxDashboard),
    isMain: false,
  },
  {
    title: 'Products',
    route: '/products',
    icon: React.createElement(AiOutlineShopping),
    isMain: false,
    children: [
      {
        title: 'Products',
        route: '/products',
        icon: React.createElement(IoAddCircleOutline),
      },
      {
        title: 'Category',
        route: '/products/category',
        icon: React.createElement(IoAddCircleOutline),
      },
    ],
  },
  {
    title: 'Orders',
    route: '/orders',
    icon: React.createElement(AiOutlineShoppingCart),
    isMain: false,
  },
  {
    title: 'Customers',
    route: '/customers',
    icon: React.createElement(LuUsers),
    isMain: false,
  },
  { title: 'Store', route: '/store', icon: React.createElement(BiStore) },

  {
    title: 'Support',
    route: '/support',
    icon: React.createElement(BiSupport),
    isMain: true,
  },
  {
    title: 'Settings',
    route: '/settings',
    icon: React.createElement(FiSettings),
    isMain: true,
  },
];

const Customers = [
  {
    name: 'Jhon Doe',
    phone: '+1 1017504320',
    orders: 125,
    balance: 100,
    currency: '$',
    status: 'Active',
    createdAt: new Date(),
  },
];

const RecentOrdersData = [
  {
    id: '302012',
    title: 'Handmade Pouch',
    extraProductsCount: 3,
    date: new Date('19 Sep 2023'),
    customer: {
      name: 'John Bushmill',
      email: 'Johnb@mail.com',
    },
    total: '$121.00',
    payment: 'Mastercard',
    status: 'Processing',
  },
  {
    id: '302002',
    title: 'Smartwatch E1',
    date: new Date('18 Sep 2023'),
    customer: {
      name: 'Mohammad Karim',
      email: 'm_karim@mail.com',
    },
    total: '$125.00',
    payment: 'Transfer',
    status: 'Shipped',
  },
  {
    id: '301900',
    title: 'Iphone X',
    date: new Date('19 Sep 2023'),
    customer: {
      name: 'Josh Adam',
      email: 'josh_adam@mail.com',
    },
    total: '$607.00',
    payment: 'Visa',
    status: 'Delivered',
  },
  {
    id: '301881',
    title: 'Puma Shoes',
    extraProductsCount: 1,
    date: new Date('5 Jan 2023'),
    customer: {
      name: 'Sin Tae',
      email: 'sin_tae@mail.com',
    },
    total: '$234.00',
    payment: 'Visa',
    status: 'Cancelled',
  },
];

const TransactionsHistoryData = [
  {
    id: '302012',
    title: 'Handmade Pouch',
    extraProductsCount: 3,
    date: new Date('19 Sep 2023'),
    customer: {
      name: 'John Bushmill',
      email: 'Johnb@mail.com',
    },
    total: '$121.00',
    payment: 'Mastercard',
    status: 'Processing',
  },
  {
    id: '302002',
    title: 'Smartwatch E1',
    date: new Date('18 Sep 2023'),
    customer: {
      name: 'Mohammad Karim',
      email: 'm_karim@mail.com',
    },
    total: '$125.00',
    payment: 'Transfer',
    status: 'Shipped',
  },
  {
    id: '301900',
    title: 'Iphone X',
    date: new Date('19 Sep 2023'),
    customer: {
      name: 'Josh Adam',
      email: 'josh_adam@mail.com',
    },
    total: '$607.00',
    payment: 'Visa',
    status: 'Delivered',
  },
  {
    id: '301881',
    title: 'Puma Shoes',
    extraProductsCount: 1,
    date: new Date('5 Jan 2023'),
    customer: {
      name: 'Sin Tae',
      email: 'sin_tae@mail.com',
    },
    total: '$234.00',
    payment: 'Visa',
    status: 'Cancelled',
  },
  {
    id: '301881',
    title: 'Puma Shoes',
    extraProductsCount: 1,
    date: new Date('5 Jan 2023'),
    customer: {
      name: 'Sin Tae',
      email: 'sin_tae@mail.com',
    },
    total: '$234.00',
    payment: 'Visa',
    status: 'Cancelled',
  },
];

export {
  COLORS,
  LANGS,
  NAV_ITEMS,
  TIMELINES,
  ProductsMockupArray,
  SalesByLocation,
  RecentOrdersData,
  TransactionsHistoryData,
  Categories,
  Customers,
};
