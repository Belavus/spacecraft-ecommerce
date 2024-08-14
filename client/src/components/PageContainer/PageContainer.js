import React from 'react';
import { StyledPageContainer } from './PageContainerStyled';

const PageContainer = ({ children, withHeaderOffset = true }) => {
    return (
        <StyledPageContainer withHeaderOffset={withHeaderOffset}>
            {children}
        </StyledPageContainer>
    );
};

export default PageContainer;
