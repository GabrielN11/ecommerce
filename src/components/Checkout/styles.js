import styled from "styled-components";

export const CheckoutWindow = styled.div`
    display: flex;
    width: 60%;
    height: 100%;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    align-self: center;
    @media(max-width: 1000px){
        width: 90%;
    }
    @media(max-width: 800px){
        width: 80%;
    }
    @media(max-width: 700px){
        width: 90%;
    }
    @media(max-width: 500px){
        width: 100%;
    }

`

export const CheckoutForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    & > *{
        width: 50%;
        padding: 0 5px;
        @media(max-width: 600px){
        width: 100%;
        flex-wrap: nowrap;
    }
    }
    @media(max-width: 600px){
        flex-direction: column;
        flex-wrap: nowrap;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

export const ReviewDiv = styled.div`
    border-bottom: 1px solid #cdcdcd;
    margin-bottom: 20px;
    & h3 span{
        font-weight: normal;
    }
    & p{
        color: #28a745;
        font-weight: bold;
    }
`

export const ReviewItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    margin: 5px 0;
`