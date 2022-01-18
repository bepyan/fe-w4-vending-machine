import { IWalletItem } from '@types';
import React from 'react';
import styled, { css } from 'styled-components';
import { renderMoney } from '../utils';

interface Props {
    item: IWalletItem;
    onClick: (item: IWalletItem) => void;
}

export const CurrencyItem = ({ item, onClick }: Props) => {
    const isActive = !!item.cnt;

    return (
        <Wrapper isActive={isActive} onClick={() => onClick(item)}>
            <CurrencyUnit isActive={isActive}>{renderMoney(item.currencyUnit)}원</CurrencyUnit>
            <div>{item.cnt}개</div>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    user-select: none;
    ${({ isActive }) =>
        !isActive &&
        css`
            opacity: 0.5;
            cursor: not-allowed;
        `}}
`;

const CurrencyUnit = styled.div<{ isActive: boolean }>`
    background-color: var(--content-bg);
    border: 1px solid var(--theme-bg-color);
    border-radius: 14px;
    padding: 1rem;
    margin-right: 0.5rem;
    
    ${({ isActive }) =>
        isActive &&
        css`
            cursor: pointer;
            transition: transform 300ms ease-in-out;
            &:hover {
                transform: scale(1.02);
                background-color: var(--theme-bg-color);
            }
        `}}
`;
