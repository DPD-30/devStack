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

export default class Case extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      statuses: [],
      case: {},
      case_status: "",
    };

    this.store = AppStore;
    this.storeKeys = ["statuses", "case_status"];

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    AppActions.universalGet("Case");
  }

  render() {
    const statuses = this.state.statuses.map((r) => (
        <option>r.Name</option>
      ));
      
    return (
      <Container>
        <Form>
        <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="title"
                  name="title"
                  id="title"
                  value={this.state.title}
                  placeholder="Title of case"
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
                  placeholder="Description of case"
                  onChange={this.handleTextChange}
                  invalid
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="StatusID">Name</Label>
                <Input type="select" name="select" id="StatusID" onChange={this.handleTextChange}>
                  {statuses}
                </Input>
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
    dataObject.case[x.target.name] = x.target.value;
    this.setState({ dataObject });
  }

  handleSave(x) {
    const postObject = _.cloneDeep(this.state.case);
    AppActions.universalSave("Case", postObject);
  }

  handleCancel(x) {
    this.setState({ description: "", name: "" });
  }
}
