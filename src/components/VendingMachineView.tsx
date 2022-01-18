import { IProductStock } from '@types';
import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { NON_LOADED_PRODUCT_ID } from '../containers/LandingPage';
import { renderMoney } from '../utils';
import { VendingItem } from './VendingItem';

interface Props {
    countdown: number;
    insertedMoney: number;
    onloadingProductId: number;
    productStockList: IProductStock[];
    progressLogList: string[];
    onClickVendingItem: (product: IProductStock) => void;
    onClickReturnMoney: () => void;
}

export const VendingMachineView = ({
    countdown,
    insertedMoney,
    onloadingProductId,
    productStockList,
    progressLogList,
    onClickVendingItem,
    onClickReturnMoney,
}: Props) => {
    const statusDisplayBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        statusDisplayBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [progressLogList]);

    const renderVendingItems = () => {
        return productStockList.map((product: IProductStock) => (
            <VendingItem
                key={product.id}
                product={product}
                isSelectable={
                    product.price <= insertedMoney && onloadingProductId === NON_LOADED_PRODUCT_ID
                }
                isOnloading={product.id === onloadingProductId}
                onClick={onClickVendingItem}
            />
        ));
    };

    const renderProgressLogs = () => progressLogList.map((log: string, i) => <p key={i}>{log}</p>);

    return (
        <VendingMachineWrapper>
            <ProductView>{renderVendingItems()}</ProductView>

            <ProgressView>
                <h1>카카오 자판기</h1>

                <MoneyDisplayWrapper>
                    <span className="txt__money">{renderMoney(insertedMoney)}</span>
                    <span className="txt__unit">원</span>
                </MoneyDisplayWrapper>

                <ReturnButton isActive={!!insertedMoney} onClick={onClickReturnMoney}>
                    반환
                </ReturnButton>

                <CountdownText isActive={!!countdown}>
                    {countdown}
                    <span className="txt__desc">초 후 금액이 반환됩니다.</span>
                </CountdownText>

                <StatusDisplayWrapper>
                    {renderProgressLogs()}
                    <div ref={statusDisplayBottomRef}></div>
                </StatusDisplayWrapper>
            </ProgressView>
        </VendingMachineWrapper>
    );
};

const VendingMachineWrapper = styled.div`
    flex: 3;
    display: flex;
    color: var(--theme-color);
    background-color: var(--theme-bg-color);
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
    overflow-y: scroll;

    @media screen and (max-width: 1080px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 720px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const ProgressView = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        padding: 2rem;
    }
`;

const ReturnButton = styled.button<{ isActive: boolean }>`
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

    ${({ isActive }) =>
        isActive
            ? css`
                  transition: background-color 300ms ease-out;
                  &:hover {
                      background-color: rgba(255, 255, 255, 0.2);
                  }
              `
            : css`
                  opacity: 0.5;
                  cursor: not-allowed;
              `}
`;

const CountdownText = styled.p<{ isActive: boolean }>`
    margin: 0rem auto;
    font-size: 1.5rem;
    font-weight: bold;
    transition: opacity 200ms ease-in-out;
    opacity: ${(props) => (props.isActive ? 1 : 0)};

    .txt__desc {
        font-size: 1rem;
        font-weight: normal;
        margin-left: 4px;
    }
`;

const StatusDisplayWrapper = styled.div`
    margin: 2rem;
    padding: 2rem;
    background-color: var(--theme-bg-color);
    height: 100%;
    overflow-y: scroll;

    & > * + * {
        margin-top: 0.75rem;
    }
`;
