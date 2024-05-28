import React from 'react';

// styled components
import styled from 'styled-components/native';


const StyledView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    `;

    const RowContainer = (props) => {
        return <StyledView {...props}>{props.children}</StyledView>;
    };

    export default RowContainer;