import React from 'react'

const useAlert = () => {
    const [alert, setAlert] = React.useState({items: []})
    const timeout = React.useRef()

    const displayAlert = React.useCallback((text= 'Alerta disparado.', type, duration=5000) => {

        const id = Math.random() * (1000 - 1) + 1

        const pickColor = type => {
            if(type === 'success') return '#28a745'
            if(type === 'warning') return '#cc6600'
            if(type === 'danger') return '#dc3545'
            return '#007bff'
        }

        const color = pickColor(type)

        const removeAlert = obj => {
            const newArr = obj.items.filter((item) => item.id!== id)
            return {items: newArr}
        }

        const addAlert = obj => {
            const newArr = [...obj.items, {id, color, duration, text}]
            return {items: newArr}
        }

        setAlert(addAlert)
        timeout.current = setTimeout(() => {
            setAlert(removeAlert)
        }, duration)
    }, [])

    return {alert, displayAlert}
}

export default useAlert