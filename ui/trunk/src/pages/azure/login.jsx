import React from 'react'
import { Button } from 'reactstrap'

import AppActions from 'actions/app.js'
 
export default function login(){
  return (
    <Button onClick={AppActions.azureSignIn}>Admin Login</Button>
  )
}
