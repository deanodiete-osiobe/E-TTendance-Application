import React from 'react';

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { accent } = colors;
import SmallText from './SmallText';

const StyledPressable = styled.Pressable`
    padding-vertical: 5px;
    align-self: center;
    `;

    const PressableText = (props) => {
        return (
        <StyledPressable onPress={props.onPress} {...props}>
            <SmallText style={{color: accent}}>{props.children}</SmallText>
        </StyledPressable>
    );
};

    export default PressableText;