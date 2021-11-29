import styled from "styled-components";

export const InputTextStyle = styled.label`
    display: block;
    width: 400px;
    margin-bottom: 20px;
    & input{ 
        width: 100%;
        margin-top: 5px;
        padding: 5px;
        height: 35px;
        border: 1px solid lightgrey;
        border-radius: 5px;
        transition: all .5s;
    }
    & input:focus{ 
        outline: none;
        border: 1px solid grey;
        background-color: #eee;
    }
    & p{ 
        color: brown;
        margin: 0;
        margin-top: 2px !important;
    }
    @media(max-width: 600px){
        width: 250px;
        align-self: center;
    }
`

export const SelectStyle = styled.label`
    display: block;
    width: 400px;
    margin-bottom: 20px;
    & select{
        width: 100%;
        margin-top: 5px;
        padding: 5px;
        height: 35px;
        border: 1px solid lightgray;
        background-color: #fff;
        border-radius: 5px;
        transition: all .5s;
    }
    @media(max-width: 600px){
        width: 250px;
        align-self: center;
    }
`

export const FormButtonStyle = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    &:hover{
        background-color: #fff;
        border: 1px solid #000;
        padding: 9px 19px;
        color: #000;
    }
    &:disabled{
        background-color: #222;
        color: #fff;
        border: none;
        padding: 10px 20px;
    }
    @media(max-width: 600px){
        width: 250px;
        align-self: center;
    }
`