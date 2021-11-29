import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 300px);
    row-gap: 10px;
    justify-content: space-evenly;
    padding: 5px;
    @media (max-width: 1200px){
        grid-template-columns: repeat(3, 300px);
    }
    @media (max-width: 900px){
        grid-template-columns: repeat(2, 300px);
    }
    @media (max-width: 600px){
        grid-template-columns: 300px;
    }
    @media (max-width: 400px){
        grid-template-columns: 100%;
    }
`

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid lightgray;
    background-color: #fff;
    border-radius: 5px;
    height: 300px;
    padding: 10px;
`

export const ProdImg = styled.img`
    max-width: 100%;
    max-height: 50%;
    align-self: center;
`

export const AddCart = styled.button`
    border: none;
    width: 100%;
    max-width: 300px;
    align-self: center;
    padding: 5px 0px;
    background-color: orange;
    color: #fff;
    transition: background-color .5s;
    &:hover{
        background-color: darkorange;
    }
`

export const ProdTitle = styled.h2`
    margin: 0;
`

export const ProdPrice = styled.h4`
    margin: 0;
    font-weight: normal;
`