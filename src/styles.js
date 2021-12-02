import styled from "styled-components";

export const Root = styled.div`
    background-color: #f8f9fa;
    display: grid;
    max-width: 100vw;
    height: 100vh;
    row-gap: 5px;
    grid-template-columns: 1fr 10fr 1fr;
    grid-template-rows: 100px 1fr 200px;
    grid-template-areas: 
    'header header header'
    'main main main'
    'footer footer footer';

`