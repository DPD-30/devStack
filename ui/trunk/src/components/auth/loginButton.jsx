import React from 'react'
// import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

// import AppActions from 'actions/app.js'


export default function loginButton(){
    // <Button onClick={AppActions.azureSignIn}>SIGN IN</Button>
    return (
        <Link to="/login">SIGN IN</Link>
    )
}
