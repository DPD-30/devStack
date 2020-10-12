import React from 'react'
import Reflux from 'reflux'
import { Container, Row, Col } from 'reactstrap'

import AppStore from 'stores/app.js'

// import appLogo from 'images/applogo.png'
import packageJSON from '../../../package.json'

import styles from 'layout/header/isClosed.module.css'


export default class isClosed extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['userAzureAccount']
    }
    render(){
        const name = this.state.userAzureAccount.name

        return (
            <div className={styles.header}>
                <Container fluid={true}>
                    <Row>
                        <Col xs={8} className={styles.appName}>
                            {packageJSON.friendlyName}
                        </Col>
                        <Col xs={4} className={styles.userName}>
                            {name}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
