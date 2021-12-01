import styled from "styled-components";

export const MainStyle = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: main;
    grid-column-start: 2;
    grid-column-end: 3;
    @media(max-width: 800px){
        grid-column-start: 1;
        grid-column-end: 4;
    }
`