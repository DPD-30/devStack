import React from 'react'
import { ProgressPlugin } from 'webpack'

export default function isAuthenticated(props){
    return (
        <div>
            {props.children}
        </div>
    )
}
