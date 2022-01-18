import React from 'react';
import styled from 'styled-components';

export const LandingLayout = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    max-height: 708px;
    max-width: 1500px;

    & > * + * {
        margin-left: 1rem;
    }
`;
