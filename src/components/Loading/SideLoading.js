import React from 'react'
import { SideLoadingDiv, Spin } from './styles'

const SideLoading = () => {
    return (
        <SideLoadingDiv>
            <Spin size={25}/>
        </SideLoadingDiv>
    )
}

export default SideLoading
