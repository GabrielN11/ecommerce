import styled, {keyframes} from "styled-components";

const show = keyframes`
    from{
        opacity: 0;
        transform: translateX(500px);
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
        transform: translateX(500px);
    }
`

export const CartMain = styled.div`
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #cdcdcd;
`

export const CartWindow = styled.div`
    position: ${({mobile}) => mobile ? 'relative' : 'fixed'};
    overflow-y: auto;
    min-height: ${({mobile}) => mobile ? 'calc(100vh - 220px)': 'initial'};
    height: ${({mobile}) => mobile ? 'initial': '100vh'};
    width: ${({mobile}) => mobile ? '100%': '500px'};
    padding: 10px;
    background-color: #fff;
    right: ${({mobile}) => mobile ? 'unset': '0'};
    bottom: ${({mobile}) => mobile ? 'unset': '0'};
    border-left: 1px solid #cdcdcd;
    box-shadow: -7px -1px 5px -7px rgba(0,0,0,0.76);
    animation-name: ${({closeAnim, mobile}) => mobile ? 'none' : closeAnim ? hide : show};
    animation-duration: .6s;
    animation-direction: forwards;
    z-index: ${({mobile}) => mobile ? '0': '5'};;
`

export const CartContent = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid #cdcdcd;
    & img{
        width: 20%;
        max-height: 145px;
    }
    @media(max-width: 550px){
        font-size: .85rem;
    }
`

export const CartInfo = styled.div`
    margin: 0 30px;
`

export const TotalPrice = styled.h1`
    font-weight: bolder;
    font-size: 1.7rem;
    margin: 0;
`

export const CartQuantity = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
    border: 1px solid #cdcdcd;
    background-color: #eee;
    text-align: center;
    & div{
        flex-grow: 1;
        cursor: pointer;
    }
    & div:hover{
        background-color: #ddd;
    }   
`

export const CartHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 1px solid #cdcdcd;
`

export const CartTitle = styled.h1`
    margin: 10px 0px;
    font-size: 1.5rem;
    color: #444;
`

export const CartEmpty = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 100px;
    font-size: 1.2rem;
`

export const CartContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
`

export const CartButton = styled.button`
    padding: ${({size}) => `${size/2}px ${size}px`};
    background-color: ${({color}) => color};
    border: none;
    color: #fff;
    &:disabled{
        opacity: 0.7;
    }
`

export const CartInput = styled.input`
    width: 31px;
    outline: none;
`

export const CodeInput = styled.input`
    border-radius: 5px;
    border: 1px solid #cdcdcd;
    outline: none;
    padding: 5px 3px;
    &:focus{
        border: 1px solid #0071DC;
    }
`
