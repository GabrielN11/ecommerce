import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 300px);
    gap: 10px;
    justify-content: space-evenly;
    padding: 5px;
    @media (max-width: 1250px){
        grid-template-columns: repeat(3, 300px);
    }
    @media (max-width: 950px){
        grid-template-columns: repeat(2, 300px);
    }
    @media (max-width: 650px){
        grid-template-columns: 300px;
    }
    @media (max-width: 400px){
        grid-template-columns: 100%;
    }
`

export const Empty = styled.div`
    text-align: center;
    color: #555;
    margin: 10px;
    grid-column-start: 1;
    grid-column-end: 5;
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
    @media(max-width: 750px){
        align-items: center;
    }
`

export const ItemImg = styled.img`
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
    background-color: #0071DC;
    color: #fff;
    transition: background-color .5s;
    &:hover{
        background-color: #004F9A;
    }
`

export const ProductButton = styled.button`
    border: none;
    margin: 15px 0px;
    width: 175px;
    padding: 10px 20px;
    background-color: #0071DC;
    color: #fff;
    transition: background-color .5s;
    &:hover{
        background-color: #004F9A;
    }
`

export const ItemTitle = styled.h2`
    margin: 0;
    & a{
        text-decoration: none;
        color: #444; 
    }
`

export const ItemPrice = styled.h4`
    margin: 0;
    font-weight: normal;
`

export const ProductMainWindow = styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 220px);
    background-color: #fff;
    border-radius: 5px;
    @media(max-width: 750px){
        flex-direction: column;
        align-items: center;
    }
`

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 50px;
    width: 65%;
    height: 100%;
    @media(max-width: 750px){
        width: 100%;
    }
`

export const ProductInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 35%;
    padding: 0px 50px;
    @media(max-width: 750px){
        width: 100%;
        align-items: center;
    }
`

export const ProductImg = styled.img`
    max-width: 80%;
    max-height: 80%;
    border-radius: 5px;
`

export const ProductTitle = styled.h1`
    margin: 3px;
`

export const ProductPrice = styled.h2`
    margin: 3px;
    margin-bottom: 10px;
    color: #0071DC;
`

export const ProductDescription = styled.div`
    margin-bottom: 10px;
    font-size: 1.1rem;
    & p{
        margin: 0;
    }
`