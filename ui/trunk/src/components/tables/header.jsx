import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from "react-router-dom";
import _ from 'lodash'


export default function header(props){
    return (
        <Container fluid>
            <Row>
                <Col xs={9}>
                    <h2>
                        {props.headerText}
                    </h2>
                    {
                        (props.headerSubText) &&

                        <h3>
                            {props.headerSubText}
                        </h3>
                    }
                </Col>
                <Col xs={3} style={{textAlign: 'right'}}>
                    {
                        _.has(props, 'buttonLink') &&

                        <Link to={props.buttonLink}>
                            <Button color="primary">
                                {props.buttonText}
                            </Button>
                        </Link>
                    }
                    {
                        _.has(props, 'buttonClick') &&

                        <Button color="primary" onClick={props.buttonClick}>
                            {props.buttonText}
                        </Button>
                    }
                </Col>
            </Row>
        </Container>
    )
}
