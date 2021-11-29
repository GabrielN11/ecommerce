import React from 'react'
import { LoadingDiv, Spin } from './styles'

const Loading = ({loading}) => {

    if(!loading) return null

    return (
        <LoadingDiv>
            <Spin/>
        </LoadingDiv>
    )
}

export default Loading
