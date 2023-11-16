import { LANGS } from '../constant/UserDashboard';

const getCurrentLanguage = (key: string) => {
  return LANGS.find(lang => lang.key === key);
};

const paginatePages = <Item, _Array extends Array<Item> = Array<Item>>(
  arr: _Array,
  pageIndex: number,
  pageSize: number,
) => {
  const endIndex = Math.min((pageIndex + 1) * pageSize, arr.length);
  return arr.slice(Math.max(endIndex - pageSize, 0), endIndex);
};

export { getCurrentLanguage, paginatePages };
