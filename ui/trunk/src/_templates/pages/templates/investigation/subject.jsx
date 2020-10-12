import React from "react";
import Reflux from "reflux";
import _ from "lodash";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import AppStore from "stores/app.js";
import AppActions from "actions/app.js";

export default class Subject extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = { 
      subject: {},
      subject_status: "",
    };

    this.store = AppStore;
    this.storeKeys = ["subject", "subject_status"];

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    AppActions.universalGet("Subject");
  }

  render() { 
      
    return (
      <Container>
        <Form>
        <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="firstname">First Name</Label>
                <Input
                  type="firstname"
                  name="firstname"
                  id="firstname"
                  value={this.state.firstname}
                  placeholder="Subject first name"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="middlename">Middle Name</Label>
                <Input
                  type="middlename"
                  name="middlename"
                  id="middlename"
                  value={this.state.middlename}
                  placeholder="Subject middle name"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="lastname">Last Name</Label>
                <Input
                  type="lastname"
                  name="lastname"
                  id="lastname"
                  value={this.state.lastname}
                  placeholder="Subject last name"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="dob">Date of Birth</Label>
                <Input
                  type="dob"
                  name="dob"
                  id="dob"
                  value={this.state.dob}
                  placeholder="Date of birth"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row> 
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="description"
                  name="description"
                  id="description"
                  value={this.state.description}
                  placeholder="Description"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}></Col>
            <Col md={1}>
              <Button color="primary" onClick={this.handleSave}>
                Save
              </Button>{" "}
            </Col>
            <Col md={1}>
              <Button color="primary" onClick={this.handleCancel}>
                Cancel
              </Button>{" "}
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

  handleTextChange(x) {
    const dataObject = _.cloneDeep(this.state);
    dataObject.subject[x.target.name] = x.target.value;
    this.setState({ dataObject });
  }

  handleSave(x) {
    const postObject = _.cloneDeep(this.state.subject);
    AppActions.universalSave("Subject", postObject);
  }

  handleCancel(x) {
    this.setState({ description: "", name: "" });
  }
}
