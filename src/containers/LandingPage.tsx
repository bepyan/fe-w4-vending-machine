import React, { useState } from 'react';
import { VendingItem, VendingMachineView, VideoBackground, WalletView } from '../components';
import initialProductStockList from '../productStockList.json';

interface IProductStock {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const LandingPage = () => {
    return (
        <>
            <VideoBackground />
            <VendingMachineView
            // onProductClick={setProductStockList}
            // onProgress={setProgressLogList}
            />
            <WalletView
            // onCoinClick={setInsertMoney}
            // onProgress={setProgressLogList}
            />
        </>
    );
};

export default LandingPage;
