import React from 'react'
import { StepperDiv, Step, Checkbox, Line } from './styles'

const Stepper = ({ steps = ['Step 1', 'Step 2', 'Step 3'], activeStep = 0 }) => {
    return (
        <StepperDiv>
            {steps.map((step, i) => (
                <Step key={step} last={i+1 === steps.length}>
                    <Checkbox active={i <= activeStep}>{i + 1}</Checkbox>
                    <p style={{ fontWeight: i === activeStep ? 'bold' : 'normal' }}>{step}</p>
                    {i + 1 !== steps.length && <Line />}
                </Step>
            ))}
        </StepperDiv>
    )
}

export default Stepper
