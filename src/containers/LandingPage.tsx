import { IProductStock, IWalletItem } from '@types';
import React, { useEffect, useState } from 'react';
import { LandingLayout, VendingMachineView, VideoBackground, WalletView } from '../components';
import {
    getCurrencyUnitList,
    getMyWalletDataList,
    getProductStockList,
    renderMoney,
} from '../utils';

const PRODUCT_RELEASE_DELAY = 2000;
const COUNTDOWN_TIME = 5;
export const NON_LOADED_PRODUCT_ID = -1;

const LandingPage = () => {
    const [insertedMoney, setInsertedMoney] = useState(0);

    const [productStockList, setProductStockList] = useState<IProductStock[]>([]);
    const [progressLogList, setProgressLogList] = useState<string[]>([]);
    const [onloadingProductId, setOnloadingProductId] = useState(NON_LOADED_PRODUCT_ID);

    const [walletDataList, setWalletDataList] = useState<IWalletItem[]>([]);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        setProductStockList(getProductStockList());
        setWalletDataList(getMyWalletDataList());
    }, []);

    useEffect(() => {
        if (!countdown) {
            returnMoney();
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prevState) => prevState - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    // 자판기 유틸

    const decreaseProductStock = (product: IProductStock) => {
        const newProductStockList = [...productStockList];
        const target = newProductStockList.find((v) => v.id === product.id);
        if (!target || !target.stock) return;

        target.stock--;
        setProductStockList(newProductStockList);
    };

    const pushLogList = (newLog: string) => {
        setProgressLogList((prevState) => [...prevState, newLog]);
    };

    const startCountDown = () => {
        setCountdown(COUNTDOWN_TIME);
    };

    const stopCountDown = () => {
        setCountdown(0);
    };

    const onClickVendingItem = (product: IProductStock) => {
        if (product.stock === 0) return;

        pushLogList(`${product.name} 배출중 입니다...`);
        setOnloadingProductId(product.id);
        decreaseProductStock(product);

        setTimeout(() => {
            pushLogList(`${product.name}(이)가 배출 되었습니다.`);
            setOnloadingProductId(NON_LOADED_PRODUCT_ID);
            if (!!insertedMoney) startCountDown();
        }, PRODUCT_RELEASE_DELAY);

        setInsertedMoney((prevState) => prevState - product.price);
        startCountDown();
    };

    // 내 지갑 유틸

    const insertMoney = (money: number) => {
        setInsertedMoney((prevState) => prevState + money);
    };

    const returnMoney = () => {
        if (!insertedMoney) return;

        const currencyUnitList = getCurrencyUnitList();
        const newWalletDataList = [...walletDataList];

        let remainMoney = insertedMoney;
        for (const currencyUnit of currencyUnitList) {
            if (remainMoney >= currencyUnit) {
                const cnt = Math.floor(remainMoney / currencyUnit);

                const target = newWalletDataList.find((v) => v.currencyUnit === currencyUnit);
                if (!target) continue;

                target.cnt += cnt;
                remainMoney -= cnt * currencyUnit;
            } else if (remainMoney === 0) {
                break;
            }
        }

        pushLogList(`잔돈 ${renderMoney(insertedMoney)}원 반환되었습니다.`);
        setInsertedMoney(0);
        setWalletDataList(newWalletDataList);
    };

    const decreaseWalletMoney = (item: IWalletItem) => {
        const newDataList = [...walletDataList];
        const target = newDataList.find((v) => v.currencyUnit === item.currencyUnit);
        if (!target || !target.cnt) return;

        target.cnt--;
        setWalletDataList(newDataList);
    };

    const onClickReturnMoney = () => {
        returnMoney();
        stopCountDown();
    };

    const onClickCurrencyItem = (item: IWalletItem) => {
        if (!item.cnt) return;

        pushLogList(`${renderMoney(item.currencyUnit)}원이 투입되었습니다.`);
        insertMoney(item.currencyUnit);
        decreaseWalletMoney(item);
        startCountDown();
    };

    return (
        <>
            <VideoBackground />
            <LandingLayout>
                <VendingMachineView
                    countdown={countdown}
                    insertedMoney={insertedMoney}
                    onloadingProductId={onloadingProductId}
                    productStockList={productStockList}
                    progressLogList={progressLogList}
                    onClickVendingItem={onClickVendingItem}
                    onClickReturnMoney={onClickReturnMoney}
                />
                <WalletView
                    walletDataList={walletDataList}
                    onClickCurrencyItem={onClickCurrencyItem}
                />
            </LandingLayout>
        </>
    );
};

export default LandingPage;
