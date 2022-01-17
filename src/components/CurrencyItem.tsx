import React from 'react';
import styled from 'styled-components';

interface Props {}

export const CurrencyItem = (props: Props) => {
    return (
        <Wrapper>
            <CurrencyUnit>{10}원</CurrencyUnit>
            <div>{0}개</div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const CurrencyUnit = styled.div`
    background-color: var(--content-bg);
    border: 1px solid var(--theme-bg-color);
    border-radius: 14px;
    padding: 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
    transition: transform 300ms ease-in-out;
    &:hover {
        transform: scale(1.02);
        background-color: var(--theme-bg-color);
    }
`;
