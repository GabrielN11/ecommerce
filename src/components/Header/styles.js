import styled from "styled-components";

export const HeaderStyle = styled.header`
    position: ${({ scrolled }) => scrolled ? 'fixed' : 'static'};
    width: ${({ scrolled }) => scrolled ? '90vw' : '100%'};
    height: ${({ scrolled }) => scrolled ? 'fit-content' : '100px'};
    background-color: #191818;
    grid-area: header;
    box-shadow: 0px 1px 1px grey;
    border-radius: ${({ scrolled }) => scrolled ? '0px 0px 10px 10px' : '0'};
    justify-self: center;
`

export const TopHeader = styled.div`
    display: flex;
    height: 65px;
    padding: 0px 30px;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`

export const BottomHeader = styled.nav`
    display: ${({scrolled}) => scrolled ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0px 30px;
    height: 35px;
    & a{
        color: #fff;
        border-color: #fff;
        padding: 5px 10px;
        margin-right: 5px;
        height: 100%;
        text-decoration: none;
        transition: border-bottom .05s;
        &:hover{
            border-bottom: 2px solid #fff;
        }
    }
`

export const Logo = styled.h1`
    text-decoration: none;
    font-family: monospace;
    margin-right: auto;
    margin-bottom: 0;
    font-weight: normal;
    & a{
        color: #ffffff;
        text-decoration: none;

    }
`