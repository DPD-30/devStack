import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'

export default function dropdown(props){
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {props.label}
            </DropdownToggle>
            <DropdownMenu>
                {props.children}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}
