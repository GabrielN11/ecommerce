import styled from "styled-components";

export const NotFoundContainer = styled.div`
    min-height: calc(100vh - 220px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NotFoundTitle = styled.h1`
    font-size: 5rem;
    color: #0071DC;
    margin: 5px 0;
`

export const NotFoundDescription = styled.p`
    font-size: 1.3rem;
    margin: 5px 0;
    text-align: center;
    & a{
        text-decoration: none;
        color: #0071DC;
    }
`