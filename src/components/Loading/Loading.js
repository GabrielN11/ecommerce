import React from 'react'
import { LoadingDiv, Spin } from './styles'

const Loading = ({loading}) => {

    if(!loading) return null

    return (
        <LoadingDiv>
            <Spin size={60}/>
        </LoadingDiv>
    )
}

export default Loading
