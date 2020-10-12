import React from "react";
import Reflux from "reflux"
import _ from 'lodash'
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


export default class NotificationTypes extends Reflux.Component  {
  constructor(props) {
    super(props);

    this.state = {
      notificationTypes: [],
      notificationType: {},
      notificationtype_status: '',
    };

    this.store = AppStore;
    this.storeKeys = ["notificationtype",
    'notification_status'];

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  
	componentDidMount() {
		AppActions.universalGet("NotificationType")
	}

  render() {
     
		
    return (
      <Container>
        <Form>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  placeholder="Name of notification type"
                  onChange={this.handleTextChange} 
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
              <Button color="primary" onClick={this.handleSave}>Save</Button>{" "}
            </Col>
            <Col md={1}>
              <Button color="primary" onClick={this.handleCancel}>Cancel</Button>{" "}
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }

  handleTextChange(x){ 
    const dataObject = _.cloneDeep(this.state)
    dataObject.notificationType[x.target.name] = x.target.value
    this.setState({dataObject})
  }

  handleSave(x){  

    const postObject = _.cloneDeep(this.state.notificationType)
    AppActions.universalSave('NotificationType', postObject)
     
  } 

  handleCancel(x){  
    this.setState({ description : '', name : '' })
  }
}
