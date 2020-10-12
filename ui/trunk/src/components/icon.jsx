import React from 'react'
import FontAwesome from 'react-fontawesome'

export default function Icon(props){
    let theName = props.name

    if (props.name === 'hour-glass-half - f252'){
        theName = 'hourglass-half'
    } else if (props.name === 'exclamation point - f12a'){
        theName = 'exclamation point'
    }

    return (
        <FontAwesome name={theName} />
    )
}
