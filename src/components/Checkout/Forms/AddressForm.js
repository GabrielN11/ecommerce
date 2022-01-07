import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { InputText } from '../..'
import { CheckoutForm, ButtonContainer } from '../styles'
import Select from '../../Form/Select'
import { CartButton } from '../../Cart/styles'
import Loading from '../../Loading/Loading'
import { GlobalContext } from '../../GlobalContext'
import { commerce } from '../../../lib/commerce'



const AddressForm = ({ checkoutToken, next, shippingData }) => {
    const [firstName, setFirstName] = React.useState(shippingData.firstName || '')
    const [lastName, setLastName] = React.useState(shippingData.lastName || '')
    const [address, setAddress] = React.useState(shippingData.address || '')
    const [email, setEmail] = React.useState(shippingData.email || '')
    const [city, setCity] = React.useState(shippingData.city || '')
    const [code, setCode] = React.useState(shippingData.code || '')

    const [shippingCountries, setShippingCountries] = React.useState([])
    const [shippingCountry, setShippingCountry] = React.useState(shippingData.shippingCountry || '')
    const [shippingSubdivisions, setShippingSubdivisions] = React.useState([])
    const [shippingSubdivision, setShippingSubdivision] = React.useState(shippingData.shippingSubdivision || '')
    const [shippingOptions, setShippingOptions] = React.useState([])
    const [shippingOption, setShippingOption] = React.useState(shippingData.shippingOption || '')

    const [loading, setLoading] = React.useState(false)

    let isSubscribed = React.useRef()
    const { displayAlert } = React.useContext(GlobalContext)
    const navigate = useNavigate()

    const transformArray = (obj) => {
        const values = Object.keys(obj)
        const texts = Object.values(obj)
        const finalArray = values.map((value, i) => {
            return {
                value: value,
                text: texts[i]
            }
        })
        return finalArray
    }

    const fetchShippingCountries = React.useCallback(async (checkoutTokenId) => {
        try {
            const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
            const finalArray = transformArray(countries)
            if (isSubscribed.current) setShippingCountries(finalArray)
            if (!shippingData.shippingCountry && isSubscribed.current)
            setShippingCountry(finalArray[0].value)
        } catch (e) {
            displayAlert('Algo de errado aconteceu, tente novamente mais tarde.', 'danger', 10000)
            navigate('/')
        }
    }, [shippingData.shippingCountry, displayAlert, navigate])

    const fetchShippingSubdivisions = React.useCallback(async (checkoutTokenId, country) => {
        try {
            const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, country)
            const finalArray = transformArray(subdivisions)
            if (isSubscribed.current) setShippingSubdivisions(finalArray)
            if (!shippingData.shippingSubdivision && isSubscribed.current)
                setShippingSubdivision(finalArray[0].value)
        } catch (e) {
        displayAlert('Algo de errado aconteceu, tente novamente mais tarde.', 'danger', 10000)
        navigate('/')
    }
}, [shippingData.shippingSubdivision, displayAlert, navigate])

const fetchShippingOptions = React.useCallback(async (checkoutTokenId, country) => {
    try {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country })
        const array = options.map(option => ({ value: option.id, text: `${option.description} - (${option.price.formatted_with_symbol})` }))
        if (isSubscribed.current) setShippingOptions(array)
        if (!shippingData.shippingOption && isSubscribed.current)
            setShippingOption(array[0].value)
    } catch (e) {
        displayAlert('Algo de errado aconteceu, tente novamente mais tarde.', 'danger', 10000)
        navigate('/')
    }
}, [shippingData.shippingOption, displayAlert, navigate])

React.useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
}, [fetchShippingCountries, checkoutToken.id])

React.useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(checkoutToken.id, shippingCountry)
}, [shippingCountry, fetchShippingSubdivisions, checkoutToken.id])

React.useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry)
}, [shippingSubdivision, shippingCountry, fetchShippingOptions, checkoutToken.id])

React.useEffect(() => {
    isSubscribed.current = true
    return () => {
        isSubscribed.current = false
    }
}, [])

React.useEffect(() => {
    const fetchCode = async (cep) => {
        try {
            const result = await fetch(`https://ws.apicep.com/cep/${cep}.json`)
            const json = await result.json()
            if (json.status === 200) {
                setCity(json.city)
                setAddress(json.address + ', 0, ' + json.district)
                setShippingSubdivision(json.state)
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    if (code.length === 8 && shippingCountry === 'BR') {
        setLoading(true)
        const formattedCepArr = code.split('')
        formattedCepArr.splice(5, 0, '-')
        const formattedCep = formattedCepArr.join().replaceAll(',', '')
        fetchCode(formattedCep)
    }
}, [code, shippingCountry]) //you may remove this useEffect if your API doesn't deliver to Brazil

const handleSubmit = () => {
    const data = { firstName, lastName, address, email, city, code, shippingCountry, shippingSubdivision, shippingOption }
    next(data)
}

return (
    <>
        {shippingSubdivisions.length > 0 && shippingCountries.length > 0 && shippingOptions.length > 0 ?
            <CheckoutForm onSubmit={handleSubmit}>
                <InputText label='Digite seu primeiro nome' title='Primeiro nome' placeholder='Ex: Ana' required text={firstName}
                    setText={setFirstName} />
                <InputText label='Digite seu sobrenome' title='Sobrenone' placeholder='Ex: Araújo de Mendonça' required text={lastName}
                    setText={setLastName} />
                <InputText label='Digite seu E-mail' title='Email' placeholder='Ex: ana123@gmail.com' type='email' required text={email}
                    setText={setEmail} />
                <Select items={shippingCountries} value={shippingCountry} setText={setShippingCountry} required label='Selecione seu país' />
                <InputText label='Digite seu CEP / Address Code' title='CEP' placeholder='Ex: 70680159' number required text={code}
                    setText={setCode} />
                <Select items={shippingSubdivisions} value={shippingSubdivision} setText={setShippingSubdivision} required label='Selecione seu estado' />
                <InputText label='Digite seu endereço' title='Endereço' placeholder='Ex: Rua Fulano de tal, 155, 12B' required text={address}
                    setText={setAddress} />
                <InputText label='Digite o nome de sua cidade' title='Cidade' placeholder='Ex: Santos' required text={city}
                    setText={setCity} />
                <Select items={shippingOptions} value={shippingOption} setText={setShippingOption} required label='Selecione a opção de frete' />
                <ButtonContainer>
                    <Link to='/'><CartButton color='#6c757d' size={30}>Cancelar</CartButton></Link>
                    <CartButton color='#0071DC' size={30}>Prosseguir</CartButton>
                </ButtonContainer>
            </CheckoutForm> : <Loading loading={true} />}
        <Loading loading={loading} />
    </>
)
}

export default AddressForm
