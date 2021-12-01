import styled, {keyframes} from "styled-components";

const show = keyframes`
    from{
        opacity: 0;
        transform: translateX(-500px);
    }
    to{
        opacity: 1;
        transform: initial;
    }
`

const hide = keyframes`
    from{
        opacity: 1;
        transform: initial;
    }
    to{
        opacity: 0;
        transform: translateX(-500px);
    }
`

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
    @media(max-width: 600px){
        display: none;
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

export const SubMenu = styled.div`
    position: relative;
    cursor: pointer;
    color: #fff;
    border-color: #fff;
    padding: 5px 10px;
    margin-right: 5px;
    height: 100%;
    text-decoration: none;
    transition: border-bottom .05s;
    & div{
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.35);
        display: flex;
        flex-direction: column;
        transform: translateX(-30%);
        & a{
            width: 100%;
            padding: 10px 20px;
            border-bottom: 1px solid #cdcdcd;
            color: #444;
            text-decoration: none;
            transition: all .4s;
            &:hover{
                border-bottom: 1px solid #444;
                color: #444;
            }
        }
    }
`

export const SideMenuStyle = styled.nav`
    background-color: #fff;
    box-shadow: 3px -1px 9px -1px rgba(0,0,0,0.76);
    position: fixed;
    height: 100vh;
    width: 75%;
    overflow-y: auto;
    top: 0;
    left: 0;
    bottom: 0;
    animation-name: ${({closeAnim}) => closeAnim ? hide : show};
    animation-duration: .5s;
    animation-direction: forwards;
    z-index: 4;
    display: flex;
    flex-direction: column;
    & a{
        width: 100%;
        padding: 20px 10px;
        border-bottom: 1px solid #cdcdcd;
        color: #444;
        text-decoration: none;
    }
`