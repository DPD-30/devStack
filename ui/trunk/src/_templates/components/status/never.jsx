import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Badge } from 'reactstrap'

export default function StatusNever(){
    return (
        <Badge color="default">
            <FontAwesome name="star" />
        </Badge>
    )
}
