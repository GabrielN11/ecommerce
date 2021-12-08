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
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
`

export const SideLoadingDiv = styled.div`
    position: fixed;
    bottom: 110px;
    right: 25px;
`

export const Spin = styled.div`
    width: ${({size}) => size + 'px'};
    height: ${({size}) => size + 'px'};
    border-radius: 50%;
    border: 10px solid #0071DC;
    border-right-color: transparent;
    animation: ${loading} 1s infinite;   
`