import { IProductStock, IWalletItem } from '@types';
import productStockList from './datas/productStockList.json';
import myWalletDataList from './datas/myWalletDataList.json';

export const getProductStockList = (): IProductStock[] => {
    return productStockList;
};

export const getMyWalletDataList = (): IWalletItem[] => {
    return myWalletDataList;
};
