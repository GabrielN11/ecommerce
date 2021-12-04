import styled from "styled-components";

export const StepperDiv = styled.div`
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
`

export const Step = styled.div`
    display: flex;
    align-items: center;
    min-width: fit-content;
    flex-grow: ${({last}) => last ? '0' : '1'};
`

export const Checkbox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    color: #fff;
    background-color: ${({active}) => active ? '#0071DC' : 'grey'};
`

export const Line = styled.span`
    flex-grow: 1;
    border-bottom: 1px solid #cdcdcd;
    margin: 0 10px;
`