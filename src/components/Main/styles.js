import styled from "styled-components";

export const MainStyle = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: main;
    grid-column-start: ${({mediaQuery}) => mediaQuery ? 0 : 2};
    grid-column-end: ${({mediaQuery}) => mediaQuery ? 4 : 3};
`