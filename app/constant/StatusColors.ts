import { StatusColorsType } from '../types/StatusColors';

export const statusColorFilters = [
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export const StatusColors: StatusColorsType = {
  Processing: {
    background: '#FDF1E8',
    color: '#E46A11',
  },
  Shipped: {
    background: '#E8F8FD',
    color: '#13B2E4',
  },
  Delivered: {
    background: '#E7F4EE',
    color: '#0D894F',
  },
  Cancelled: {
    background: '#FEEDEC',
    color: '#F81E6E',
  },
  Draft: {
    background: '#F0F1F3',
    color: '#667085',
  },
  Published: {
    background: '#E7F4EE',
    color: '#0D894F',
  },
};
