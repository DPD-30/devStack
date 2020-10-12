import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Badge } from 'reactstrap'

export default function StatusClose(){
    return (
        <Badge color="warning">
            <FontAwesome name="hour-glass-half" />
        </Badge>
    )
}
