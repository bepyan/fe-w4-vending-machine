import { IProductStock } from '@types';
import React from 'react';
import styled from 'styled-components';

interface Props {
    onItemClickHandler: (product: IProductStock) => void;
    product: {
        name: string;
        price: number;
    };
}

const selectProduct = (
    product: IProductStock,
    onItemClickHandler: (product: IProductStock) => void,
) => {
    if (product.stock === 0) return;
    onItemClickHandler(product);
};

export const VendingItem = (props: Props) => {
    const { onItemClickHandler, product } = props;
    return (
        <Wrapper>
            <Title>{product.name}</Title>
            <Price>
                <span>{product.price}</span>
                <span className="txt__unit">원</span>
            </Price>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--content-bg);
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    padding: 1rem;
    cursor: pointer;
    transition: transform 300ms ease-in-out;

    &:hover {
        transform: scale(1.02);
        background-color: var(--theme-bg-color);
    }
`;

const Title = styled.div``;

const Price = styled.div`
    margin-top: auto;
    .txt__unit {
        font-size: 14px;
        margin-left: 2px;
    }
`;
