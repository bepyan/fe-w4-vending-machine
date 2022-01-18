import { IProductStock } from '@types';
import React from 'react';
import styled from 'styled-components';
import { VendingItem } from './VendingItem';

interface Props {
    productStockList: IProductStock[];
    progressLogList: string[];
    onProductClick: (product: IProductStock) => void;
    onProgress: (progressLog: string) => void;
}

export const VendingMachineView = (props: Props) => {
    const { productStockList, progressLogList, onProductClick, onProgress } = props;

    const onItemClickHandler = (product: IProductStock) => {
        onProductClick(product);
        onProgress(`${product.name}(이)가 선택됨.`);
    };

    const renderVendingItems = () => {
        return productStockList.map((product: IProductStock) => (
            <VendingItem
                key={product.id}
                product={product}
                onItemClickHandler={onItemClickHandler}
            />
        ));
    };

    const renderProgressLogs = () => {
        return progressLogList.map((log: string, i) => <p key={i}>{log}</p>);
    };

    return (
        <VendingMachineWrapper>
            <ProductView>{renderVendingItems()}</ProductView>

            <ProgressView>
                <h1>카카오 자판기</h1>

                <MoneyDisplayWrapper>
                    <span className="txt__money">{1000}</span>
                    <span className="txt__unit">원</span>
                </MoneyDisplayWrapper>

                <ReturnButton>반환</ReturnButton>

                <StatusDisplayWrapper>{renderProgressLogs()}</StatusDisplayWrapper>
            </ProgressView>
        </VendingMachineWrapper>
    );
};

const VendingMachineWrapper = styled.div`
    flex: 3;
    color: var(--theme-color);
    background-color: var(--theme-bg-color);
    width: 100%;
    height: 100%;
    max-width: 1250px;
    max-height: 860px;
    display: flex;
    overflow: hidden;
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    & > * {
        flex: 1;
    }
`;

const MoneyDisplayWrapper = styled.div`
    background-color: var(--theme-bg-color);
    padding: 2rem;
    text-align: right;
    .txt__money {
        font-weight: bold;
        font-size: 1.5rem;
    }
    .txt__unit {
        font-size: 1rem;
        margin-left: 4px;
    }
`;

const ProductView = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(auto, 140px));
    gap: 4px;
    background-color: var(--theme-bg-color);
    height: 100%;
    padding: 2rem;
`;

const ProgressView = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        padding: 2rem;
    }
`;

const ReturnButton = styled.button`
    margin: 2rem;
    padding: 1rem 0;
    cursor: pointer;
    border: 0;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);

    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;

    transition: background-color 300ms ease-out;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const StatusDisplayWrapper = styled.div`
    margin: 2rem;
    padding: 2rem;
    background-color: var(--theme-bg-color);
    height: 100%;
    overflow-y: scroll;

    & > * + * {
        margin-top: 0.5rem;
    }
`;
