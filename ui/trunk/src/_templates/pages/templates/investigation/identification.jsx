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

export default class Identification extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = { 
      identification: {},
      identification_status: "",
    };

    this.store = AppStore;
    this.storeKeys = ["identification", "identification_status"];

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    AppActions.universalGet("Identification");
  }

  render() { 
      
    return (
      <Container>
        <Form>
        <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="name">Title</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  value={this.state.title}
                  placeholder="Identificaiton name"
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
                  placeholder="Identification description"
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
    dataObject.identification[x.target.name] = x.target.value;
    this.setState({ dataObject });
  }

  handleSave(x) {
    const postObject = _.cloneDeep(this.state.identification);
    AppActions.universalSave("Identification", postObject);
  }

  handleCancel(x) {
    this.setState({ description: "", name: "" });
  }
}
