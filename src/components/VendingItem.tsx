import { IProductStock } from '@types';
import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
    onItemClickHandler: (product: IProductStock) => void;
    product: IProductStock;
}

export const VendingItem = (props: Props) => {
    const { onItemClickHandler, product } = props;
    const selectProduct = () => {
        if (product.stock === 0) return;
        onItemClickHandler(product);
    };

    return (
        <Wrapper isSeletable={true} onClick={selectProduct}>
            <Title>{product.name}</Title>
            <Price>
                <span>{product.price}</span>
                <span className="txt__unit">원</span>
            </Price>
            <div>{product.stock}</div>
        </Wrapper>
    );
};

const Wrapper = styled.div<{ isSeletable: boolean }>`
    display: flex;
    flex-direction: column;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 1rem;
    user-select: none;

    ${({ isSeletable }) =>
        isSeletable
            ? css`
                  cursor: pointer;
                  transition: transform 300ms ease-in-out;
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
        font-size: 14px;
        margin-left: 2px;
    }
`;
