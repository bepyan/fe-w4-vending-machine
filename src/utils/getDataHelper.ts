import { IProductStock } from '@types';
import productStockList from './datas/productStockList.json';

export const getProductStockList = (): IProductStock[] => {
    return productStockList;
};
