import React from 'react'
import { Button } from 'reactstrap'

import AppActions from 'actions/app.js'


export default function logoutButton(){
    return (
        <Button onClick={AppActions.azureSignOut}>SIGN OUT</Button>
    )
}
