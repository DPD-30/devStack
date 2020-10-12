import React from 'react'
import { Button } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

import AppActions from 'actions/app.js'

import styles from 'layout/header/burger.module.css'

export default function burger(){
    return (
        <Button onClick={AppActions.toggleMenu} className={styles.headerBurger}>
            <FontAwesome
                name="bars"
            />
        </Button>
    )
}
