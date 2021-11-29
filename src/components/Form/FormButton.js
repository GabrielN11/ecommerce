import React from 'react'
import { FormButtonStyle } from './styles'

const FormButton = ({text, ...props}) => {
    return (
        <FormButtonStyle {...props}>
            {text}
        </FormButtonStyle>
    )
}

export default FormButton
