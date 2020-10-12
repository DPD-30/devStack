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
            <h2>Template Library</h2>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/table">Table</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/forms">Forms</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/search">Search</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/posts">Posts</Link>
          </Col>
        </Row>
    
        <Row xs="2">
          <Col>
            <Link to="./templates/gis">GIS</Link>
          </Col>0
        </Row>
        <Row xs="2">
          <Col>
           {"Chief Technology Office Based Templates"}
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/investigation">Investigation</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/notification">Notification</Link>
          </Col>
        </Row>
        <Row xs="2">
          <Col>
            <Link to="./templates/planning">Planning</Link>
          </Col>
        </Row>
       
      </Container>
    </div>
  );
}
