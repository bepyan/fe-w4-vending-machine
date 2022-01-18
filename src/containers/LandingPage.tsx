import { IProductStock, IWalletItem } from '@types';
import React, { useEffect, useState } from 'react';
import { VendingItem, VendingMachineView, VideoBackground, WalletView } from '../components';
import { getCurrencyUnitList, getMyWalletDataList, getProductStockList } from '../utils';

const PRODUCT_RELEASE_DELAY = 2000;
const COUNTDOWN_TIME = 5;

const LandingPage = () => {
    const [insertedMoney, setInsertedMoney] = useState(0);

    const [productStockList, setProductStockList] = useState<IProductStock[]>([]);
    const [progressLogList, setProgressLogList] = useState<string[]>([]);
    const [throttleId, setThrottleId] = useState(-1);

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
            setCountdown(countdown - 1);
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

    const onClickVendingItem = (product: IProductStock) => {
        if (product.stock === 0) return;

        if (throttleId > -1) {
            pushLogList('상품 배출중 입니다...');
            return;
        }

        setThrottleId(product.id);
        decreaseProductStock(product);
        setTimeout(() => {
            pushLogList(`${product.name}(이)가 선택됨.`);
            setThrottleId(-1);
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

        pushLogList(`잔돈 ${insertedMoney}원 반환.`);
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
    };

    const onClickCurrencyItem = (item: IWalletItem) => {
        if (!item.cnt) return;

        insertMoney(item.currencyUnit);
        decreaseWalletMoney(item);
        startCountDown();
    };

    return (
        <>
            <VideoBackground />
            <VendingMachineView
                countdown={countdown}
                insertedMoney={insertedMoney}
                loadingProductId={throttleId}
                productStockList={productStockList}
                progressLogList={progressLogList}
                onClickVendingItem={onClickVendingItem}
                onClickReturnMoney={onClickReturnMoney}
            />
            <WalletView walletDataList={walletDataList} onClickCurrencyItem={onClickCurrencyItem} />
        </>
    );
};

export default LandingPage;
