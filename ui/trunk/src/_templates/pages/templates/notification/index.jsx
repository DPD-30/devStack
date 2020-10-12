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
            <h2>Template Library/Notification</h2>
          </Col>
        </Row>
        
        <Row xs="2">
          <Col>
            <Link to="./notification/notification">Notifications</Link>
          </Col>
        </Row> 
        <Row xs="2">
          <Col>
            <Link to="./notification/notificationtypes">Notification Types</Link>
          </Col>
        </Row> 
      </Container>
    </div>
  );
}
