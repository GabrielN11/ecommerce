import styled from "styled-components";

export const HeaderStyle = styled.header`
    position: ${({scrolled}) => scrolled? 'fixed' : 'static'};
    width: ${({scrolled}) => scrolled ? '90vw' : '100%'};
    height: ${({scrolled}) => scrolled ? 'fit-content' : '100px'};
    background-color: #fff;
    grid-area: header;
    box-shadow: 0px 1px 1px grey;
    border-radius: ${({scrolled}) => scrolled ? '0px 0px 10px 10px' : '0'};
    padding: 0px 30px;
    justify-self: center;
    border: ${({scrolled}) => scrolled ? '1px solid lightgray' : 'none'};
`

export const TopHeader = styled.div`
    display: flex;
    height: 75px;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`

export const BottomHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const Logo = styled.h1`
    font-family: monospace;
    margin-right: auto;
    font-weight: normal;
`