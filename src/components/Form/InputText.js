import React from 'react'
import { InputTextStyle } from './styles'

const InputText = ({ name, id, label = 'Digite o campo', type = 'text', placeholder = 'Preencha o campo', title='Campo', setText, text, limit = 100, required = false, number = false }) => {

    const [empty, setEmpty] = React.useState(false)

    React.useState(() => {
        return () => {
            setText('')
        }
    }, [])

    function handleChange({ target }) {
        if (required) {
            if (target.value.length > 0) setEmpty(false)
        }
        if (target.value.length > limit) return setText(target.value.substring(0, limit))
        if(number && target.value.length !== 0 && !/^\d+$/.test(target.value)) return setText(text)
        setText(target.value)
    }

    function handleBlur({ target }) {
        if (target.value.length === 0 && required) return setEmpty(true)
    }
    return (
        <InputTextStyle>
            {required && <p style={{color: 'brown', display: 'inline'}}>*</p>} {label}:
            <input type={type} name={name} id={id} placeholder={placeholder} value={text}
                onChange={handleChange} onBlur={handleBlur} required={required}/>
            {empty && <p>{title} não pode ficar vazio!</p>}
        </InputTextStyle>
    )
}

export default InputText
