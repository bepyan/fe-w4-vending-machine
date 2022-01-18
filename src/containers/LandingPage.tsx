import { IProductStock } from '@types';
import React, { useEffect, useState } from 'react';
import { VendingItem, VendingMachineView, VideoBackground, WalletView } from '../components';
import { getProductStockList } from '../utils';

const LandingPage = () => {
    const [insertedMoney, setInsertedMoney] = useState(0);
    const [productStockList, setProductStockList] = useState<IProductStock[]>([]);
    const [progressLogList, setProgressLogList] = useState<string[]>([]);

    useEffect(() => {
        const initProductStorckList = getProductStockList();
        setProductStockList(initProductStorckList);
    }, []);

    const decrementProductStock = (product: IProductStock) => {
        const newProductStockList = [...productStockList];
        newProductStockList[product.id].stock -= 1;
        const PRODUCT_RELEASE_DELAY = 2000;
        setTimeout(() => {
            setProductStockList(newProductStockList);
        }, PRODUCT_RELEASE_DELAY);
    };

    const pushLogList = (newLog: string) => {
        const newProgressLogList = [...progressLogList, newLog];
        setProgressLogList(newProgressLogList);
    };

    return (
        <>
            <VideoBackground />
            <VendingMachineView
                productStockList={productStockList}
                progressLogList={progressLogList}
                onProductClick={decrementProductStock}
                onProgress={pushLogList}
            />
            <WalletView
            // onCoinClick={setInsertMoney}
            // onProgress={pushLogList}
            />
        </>
    );
};

export default LandingPage;
