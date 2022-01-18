import { IWalletItem } from '@types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { renderMoney } from '../utils';
import { CurrencyItem } from './CurrencyItem';

interface Props {
    walletDataList: IWalletItem[];
    onClickCurrencyItem: (item: IWalletItem) => void;
}

export const WalletView = ({ walletDataList, onClickCurrencyItem }: Props) => {
    const totalMoney = useMemo(
        () => walletDataList.reduce((ac, v) => ac + v.currenyUnit * v.cnt, 0),
        [walletDataList],
    );

    return (
        <WalletWrapper>
            <h1>내 지갑</h1>

            <CurrencyItemWrapper>
                {walletDataList.map((v, idx) => (
                    <CurrencyItem key={idx} item={v} onClick={onClickCurrencyItem} />
                ))}
            </CurrencyItemWrapper>

            <TotalMoneyWrapper>
                <span className="txt__money">{renderMoney(totalMoney)}</span>
                <span className="txt__unit">원</span>
            </TotalMoneyWrapper>
        </WalletWrapper>
    );
};

const WalletWrapper = styled.div`
    flex: 1;
    color: var(--theme-color);
    background-color: var(--theme-bg-color);
    width: 100%;
    height: 100%;
    max-width: 1250px;
    max-height: 860px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 14px;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    h1 {
        padding: 2rem;
    }
`;

const CurrencyItemWrapper = styled.div`
    padding: 0px 2rem;
    display: flex;
    flex-direction: column;
    & > div + div {
        margin-top: 0.5rem;
    }
`;

const TotalMoneyWrapper = styled.div`
    background-color: var(--theme-bg-color);
    text-align: right;
    margin-top: auto;
    padding: 2rem;

    .txt__money {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .txt__unit {
        font-size: 1rem;
        margin-left: 4px;
    }
`;
