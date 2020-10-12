import React from "react"
import Reflux from "reflux"
import _ from "lodash"
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"

import AppStore from "stores/app.js"
import AppActions from "actions/app.js"

export default class NotificationTypes extends Reflux.Component {
  constructor(props) {
    super(props)

    this.state = {
      notificationTypes: [],
      notificationType: {},
      notificationtype_status: "",
      objectType : "Notification",
    }

    this.store = AppStore
    this.storeKeys = ["notificationTypes", "notification_status"]

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount() {
    AppActions.universalGet("NotificationType")
  }

  render() {
    const notificationTypes = this.state.notificationTypes.map((r) => (
      <option>r.Name</option>
    ))

    return (
      <Container>
        <Form>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="NotificationType">Name</Label>
                <Input type="select" name="select" id="notificationType" onChange={this.handleTextChange}>
                  {notificationTypes}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="description">Message</Label>
                <Input
                  type="description"
                  name="description"
                  id="description"
                  value={this.state.message}
                  placeholder="Description of notification type"
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
    )
  }

  handleTextChange(x) {
    const dataObject = _.cloneDeep(this.state)
    dataObject[this.state.objectType][x.target.name] = x.target.value
    this.setState({ dataObject })
  }

  handleSave(x) {
    const postObject = _.cloneDeep(this.state[this.state.objectType])
    AppActions.universalSave(this.state.objectType, postObject)
  }

  handleCancel(x) {
    this.setState({ description: "", name: "" })
  }
}
