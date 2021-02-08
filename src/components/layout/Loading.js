import React from 'react'
import {  Redirect } from 'react-router-dom'
var dayjs = require('dayjs')

const Loading = () => {
    return (
        <Redirect to={`/budget/${dayjs().format('MMMYYYY')}`}/>
    )
}

export default Loading
