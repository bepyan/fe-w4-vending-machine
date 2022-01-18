import { IWalletItem } from '@types';
import React, { useEffect, useState } from 'react';
import { WalletView } from '../components';
import { getMyWalletDataList } from '../utils';

interface Props {
    insertMoney: (money: number) => void;
}

export const WalletContainer = ({ insertMoney }: Props) => {
    const [walletDataList, setWalletDataList] = useState<IWalletItem[]>([]);

    useEffect(() => {
        setWalletDataList(getMyWalletDataList());
    }, []);

    const decreaseWalletMoney = (item: IWalletItem) => {
        const newDataList = [...walletDataList];
        const target = newDataList.find((v) => v.currencyUnit === item.currencyUnit);
        if (!target || !target.cnt) return;

        target.cnt--;
        setWalletDataList(newDataList);
    };

    const onClickCurrencyItem = (item: IWalletItem) => {
        if (!item.cnt) return;

        insertMoney(item.currencyUnit);
        decreaseWalletMoney(item);
    };

    return <WalletView walletDataList={walletDataList} onClickCurrencyItem={onClickCurrencyItem} />;
};
