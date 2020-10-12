import React from 'react'
import { Button } from 'reactstrap'

import AppActions from 'actions/app.js'
 
export default function logout(){
  return (
    <Button onClick={AppActions.azureSignOut}>Admin Logout</Button>
  )
}
