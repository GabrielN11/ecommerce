import React from 'react'
import { SelectStyle } from './styles'

const Select = ({name, id, label='Selecione o campo', setText, items=[{value: 'exemplo', text: 'Exemplo'}], required = false}) => {

    function handleChange({target}){
        setText(target.value)
    }

    return (
        <SelectStyle>
            {required && <p style={{color: 'brown', display: 'inline'}}>*</p>} {label}:
            <select name={name} id={id} required={required} onChange={handleChange}>
                {items.map(item => (
                    <option key={item.value} value={item.value}>{item.text}</option>
                ))}
            </select>
        </SelectStyle>
    )
}

export default Select
