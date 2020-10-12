import React from 'react'
import { Animated } from 'react-animated-css'


export default function transition(props){
    return (
        <div style={{ position: 'absolute', zIndex: 99, width: '100%' }}>
            <Animated
                animationIn="fadeInDown"
                animationOut="fadeOutUp"
                animationInDuration={850}
                animationOutDuration={600}
                isVisible={props.visible}
            >
                {props.children}
            </Animated>
        </div>
    )
}
