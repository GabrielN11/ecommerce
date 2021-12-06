import React from 'react'
import { Link } from 'react-router-dom'
import { InputText } from '../..'
import { CheckoutForm, ButtonContainer } from '../styles'
import { commerce } from '../../../lib/commerce'
import Select from '../../Form/Select'
import { CartButton } from '../../Cart/styles'


const AddressForm = ({checkoutToken, next, shippingData}) => {
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
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        const finalArray = transformArray(countries)
        setShippingCountries(finalArray)
        if(!shippingData.shippingCountry)
        setShippingCountry(finalArray[0].value)
    }, [shippingData.shippingCountry])

    const fetchShippingSubdivisions = React.useCallback(async(checkoutTokenId) => {
        const {subdivisions} = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, shippingCountry)
        const finalArray = transformArray(subdivisions)
        setShippingSubdivisions(finalArray)
        if(!shippingData.shippingSubdivision)
        setShippingSubdivision(finalArray[0].value)
    }, [shippingCountry, shippingData.shippingSubdivision])

    const fetchShippingOptions = React.useCallback(async(checkoutTokenId, country) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country})
        const array = options.map(option => ({value: option.id, text: `${option.description} - (${option.price.formatted_with_symbol})`}))
        setShippingOptions(array)
        if(!shippingData.shippingOption)
        setShippingOption(array[0].value)
    }, [shippingData.shippingOption])

    React.useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [fetchShippingCountries, checkoutToken.id])

    React.useEffect(() => {
        if(shippingCountry) fetchShippingSubdivisions(checkoutToken.id)
    }, [shippingCountry, fetchShippingSubdivisions, checkoutToken.id])

    React.useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry)
    }, [shippingSubdivision, shippingCountry, fetchShippingOptions, checkoutToken.id])

    const handleSubmit = () => {
        const data = {firstName, lastName, address, email, city, code, shippingCountry, shippingSubdivision, shippingOption }
        next(data)
    }

    return (
        <CheckoutForm onSubmit={handleSubmit}>
            <InputText label='Digite seu primeiro nome' title='Primeiro nome' placeholder='Ex: Ana' required text={firstName}
            setText={setFirstName}/>
            <InputText label='Digite seu sobrenome' title='Sobrenone' placeholder='Ex: Araújo de Mendonça' required text={lastName}
            setText={setLastName}/>
            <InputText label='Digite seu endereço' title='Endereço' placeholder='Ex: Rua Fulano de tal, 155, 12B' required text={address}
            setText={setAddress}/>
            <InputText label='Digite seu E-mail' title='Email' placeholder='Ex: ana123@gmail.com' type='email' required text={email}
            setText={setEmail}/>
            <InputText label='Digite o nome de sua cidade' title='Cidade' placeholder='Ex: Santos' required text={city}
            setText={setCity}/>
            <InputText label='Digite seu CEP / ZIP Code' title='CEP' placeholder='Ex: 70680159' number required text={code}
            setText={setCode} limit={8}/>
            <Select items={shippingCountries} value={shippingCountry} setText={setShippingCountry} required label='Selecione seu país'/>
            <Select items={shippingSubdivisions} value={shippingSubdivision} setText={setShippingSubdivision} required label='Selecione seu estado'/>
            <Select items={shippingOptions} value={shippingOption} setText={setShippingOption} required label='Selecione a opção de frete'/>
            <ButtonContainer>
                <Link to='/'><CartButton color='#6c757d' size={30}>Cancelar</CartButton></Link>
                <CartButton color='#0071DC' size={30}>Prosseguir</CartButton>
            </ButtonContainer>
        </CheckoutForm>
    )
}

export default AddressForm
