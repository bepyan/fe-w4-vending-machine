import { IProductStock } from '@types';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { renderMoney } from '../utils';
import { ReactComponent as Loading } from '../images/spinner.svg';

interface Props {
    product: IProductStock;
    isSelectable: boolean;
    isOnloading: boolean;
    onClick: (product: IProductStock) => void;
}

export const VendingItem = ({ product, isSelectable, isOnloading, onClick }: Props) => {
    const isItemActive = useMemo(
        () => isSelectable && !!product.stock && !isOnloading,
        [product.stock, isSelectable, isOnloading],
    );

    return (
        <Wrapper isActive={isItemActive} onClick={() => onClick(product)}>
            <LoadingWrapper isLoading={isOnloading}>
                <Loading width="75px" height="75px" />
            </LoadingWrapper>

            <Title>{product.name}</Title>

            <Price>
                <span>{renderMoney(product.price)}</span>
                <span className="txt__unit">원</span>
            </Price>

            <Stock isActive={!!product.stock}>
                {product.stock}
                <span className="txt__unit">개 남음</span>
            </Stock>
        </Wrapper>
    );
};

const LoadingWrapper = styled.div<{ isLoading: boolean }>`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: ${({ isLoading }) => (isLoading ? 'visible' : 'hidden')};
`;

const Wrapper = styled.div<{ isActive: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 1rem;
    user-select: none;

    transition: all 300ms ease-in-out;

    ${({ isActive }) =>
        isActive
            ? css`
                  cursor: pointer;
                  &:hover {
                      transform: scale(1.02);
                      background-color: var(--theme-bg-color);
                  }
              `
            : css`
                  pointer-events: none;
                  cursor: default;
                  opacity: 0.5;
              `}
`;

const Title = styled.div`
    word-break: keep-all;
`;

const Price = styled.div`
    margin-top: auto;
    .txt__unit {
        font-size: 12px;
        margin-left: 2px;
        opacity: 0.8;
    }
`;

const Stock = styled.div<{ isActive: boolean }>`
    transition: opacity 200ms ease-in-out;
    ${({ isActive }) =>
        !isActive &&
        css`
            opacity: 0;
        `}

    .txt__unit {
        font-size: 12px;
        margin-left: 2px;
        opacity: 0.8;
    }
`;
