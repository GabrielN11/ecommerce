import React from 'react'
import { useNavigate } from 'react-router'
import SvgSearch from '../../assets/SvgSearch'
import { SearchButton, SearchForm, SearchInput } from './styles'

const SearchBar = ({setBar, color, mobile, handleToggle}) => {
    const [search, setSearch] = React.useState('')
    const bar = React.useRef()
    const navigate = useNavigate()

    React.useEffect(() => {
        if(!mobile) bar.current.focus()
    }, [mobile])

    function handleSubmit(e){
        e.preventDefault()
        if(handleToggle) handleToggle()
        navigate(`/?q=${search.toLowerCase()}`)
    }
    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput type='text' color={color} ref={bar} value={search} mobile={mobile}
            onChange={({target}) => setSearch(target.value)} onBlur={() => setBar && setBar(false)} placeholder='Pesquise produtos aqui...'/>
            <SearchButton><SvgSearch color={color} mobile={mobile}/></SearchButton>
        </SearchForm>
    )
}

export default SearchBar
