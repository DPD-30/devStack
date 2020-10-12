import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
export default function () {
  return (
    <div>
      <Container>
        <Row xs="2">
          <Col>
            {" "}
            <h2>Template Library/Investigation</h2>
          </Col>
        </Row>
        
        <Row xs="2">
          <Col>
            <Link to="./forms/allInputs">All Inputs</Link>
          </Col>
        </Row> 
        <Row xs="2">
          <Col>
            <Link to="./forms/basicform">Basic Form</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./forms/breadcrumbs">Breadcrumbs</Link>
          </Col>
        </Row> 
        <Row xs="2">
          <Col>
            <Link to="./forms/buttons">Buttons</Link>
          </Col>
        </Row> 
      </Container>
    </div>
  );
}
