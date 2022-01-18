import { IProductStock, IWalletItem } from '@types';
import productStockList from './datas/productStockList.json';
import myWalletDataList from './datas/myWalletDataList.json';

export const getProductStockList = (): IProductStock[] => {
    return productStockList;
};

export const getMyWalletDataList = (): IWalletItem[] => {
    return myWalletDataList;
};

export const getCurrencyUnitList = () => {
    const set = new Set<number>(myWalletDataList.map((v) => v.currencyUnit));
    return Array.from(set).sort((a, b) => b - a);
};
