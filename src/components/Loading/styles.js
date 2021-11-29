import styled, {keyframes} from "styled-components";

const loading = keyframes`
    to{
        transform: rotate(360deg);
    }
`

export const LoadingDiv = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    opacity: .8;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
`

export const Spin = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 10px solid #cf8502;
    border-right-color: transparent;
    animation: ${loading} 1s infinite;   
`