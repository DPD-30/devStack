import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import logo from 'templates/images/caci-logo.svg'
import packageJSON from '../../../package.json'

import Menu from 'layout/menu/index.jsx'

import styles from 'layout/header/isOpened.module.css'


export default function isOpened(props){
    return (
        <div className={styles.header}>
            <Container fluid={true}>
                <Row>
                    <Col xs={2}>
                        <img src={logo} alt="CACI logo" className={styles.logo} />
                    </Col>
                    <Col xs={9} className={styles.appName}>
                        {packageJSON.friendlyName}
                    </Col>
                    <Col xs={1} />
                </Row>
            </Container>
            <Menu />
        </div>
    )
}
