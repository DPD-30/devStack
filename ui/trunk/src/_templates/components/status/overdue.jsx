import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Badge } from 'reactstrap'

export default function StatusOverdue(){
    return (
        <Badge color="danger">
            <FontAwesome name="exclamation" />
        </Badge>
    )
}
