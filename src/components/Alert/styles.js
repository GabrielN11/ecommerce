
import styled, {keyframes} from "styled-components";

const timer = keyframes`
to{
    width: 0px;
}
`

export const WarningBox = styled.div`
    position: fixed;
    bottom: 50px;
    right: 25px;
    display: flex;
    flex-direction: column-reverse;
    width: fit-content;
    z-index: 15;
    @media(max-width: 500px){
        right: 10px;
    }
`

export const Warning = styled.div`
    background-color: ${({color}) => color};
    padding: 10px 20px;
    color: #fff;
    margin-top: 10px;
    border-radius: 5px 5px 0px 0px;
    user-select: none;
`

export const WarningBar = styled.div`
    height: 5px;
    background-color: ${({color}) => color};
    opacity: .5;
    width: 100%;
    animation: ${timer} ${({time}) => time}ms forwards ease-out;
`