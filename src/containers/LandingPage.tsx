import { IProductStock } from '@types';
import React, { useEffect, useState } from 'react';
import { VendingItem, VendingMachineView, VideoBackground } from '../components';
import { getProductStockList } from '../utils';
import { WalletContainer } from './WalletContainer';

const PRODUCT_RELEASE_DELAY = 2000;

const LandingPage = () => {
    const [insertedMoney, setInsertedMoney] = useState(0);
    const [productStockList, setProductStockList] = useState<IProductStock[]>([]);
    const [progressLogList, setProgressLogList] = useState<string[]>([]);

    useEffect(() => {
        const initProductStorckList = getProductStockList();
        setProductStockList(initProductStorckList);
    }, []);

    const decreaseProductStock = (product: IProductStock) => {
        const newProductStockList = [...productStockList];
        newProductStockList[product.id].stock -= 1;
    };

    const pushLogList = (newLog: string) => {
        setProgressLogList((prevState) => [...prevState, newLog]);
    };

    const releaseProduct = (product: IProductStock) => {
        decreaseProductStock(product);
        setTimeout(() => {
            pushLogList(`${product.name}(이)가 선택됨.`);
        }, PRODUCT_RELEASE_DELAY);
        // insertedMoney를 상품의 가격만큼 차감
        // setInsertedMoney((prevState) => prevState - product.price)
    };

    const insertMoney = (money: number) => {
        console.log(money);
        setInsertedMoney((prevState) => prevState + money);
    };

    return (
        <>
            <VideoBackground />
            <VendingMachineView
                insertedMoney={insertedMoney}
                productStockList={productStockList}
                progressLogList={progressLogList}
                releaseProduct={releaseProduct}
            />
            <WalletContainer
                insertMoney={insertMoney}
                // onCoinClick={setInsertMoney}
                // onProgress={pushLogList}
            />
        </>
    );
};

export default LandingPage;
