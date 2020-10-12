import React from 'react'
import Reflux from 'reflux'
// import { Redirect } from 'react-router-dom';
import _ from 'lodash'
import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'
import { Card, CardBody, Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";

//css
import 'css/registration.css'

export default class Registration extends Reflux.Component {

	constructor(props) {
		super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            registered: false,
            success: false,
            formSubmitted: false,
            validPassword: false,
            mismatch: false,
        }
        
        this.store = AppStore

        this.onClickRegister = this.onClickRegister.bind(this)
        this.resetRegistration = this.resetRegistration.bind(this)
    }
 

    resetRegistration() {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            formSubmitted: false})
    }

    onClickRegister() {
        this.setState({formSubmitted: true})

        const hasErrors = ( !this.state.firstName || !this.state.lastName || !this.state.email || !this.state.password || !this.state.confirmPassword)

        console.log('\n\n\n\n\nhasErrors', hasErrors)
        console.log('\n\n\n\n\nvalidPassword', this.state.validPassword)
        console.log('\n\n\n\n\nmismatch', this.state.mismatch)

        if(!hasErrors && !this.state.validPassword && !this.state.mismatch) {
            AppActions.register({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.email,
                password: this.state.password,
                userName: this.state.email,
                middle: ' ',
                createdName: 'User1',
                modifiedUser: 'User1',
                isActive: true,
                isApproved: true,
            })
        }
    }

    handleTextChange =  e => {
            const dataObject = _.cloneDeep(this.state);
            dataObject[e.target.name] = e.target.value;
            this.setState(dataObject);
    }

    handlePassword =  e => {
        const dataObject = _.cloneDeep(this.state)
        dataObject[e.target.name] = e.target.value
        this.setState(dataObject)

        const hasUpperCase = /[A-Z]/.test(e.target.value)
        const hasDigit = /[0-9]/.test(e.target.value)
        // const hasNoVowels = !/[aeiou]/.test(e.target.value)
        const hasAtLeast8Characters = String(e.target.value).length > 7 // length 8 to 14 char long
        const hasSpecialCharacters = /\W|_/g.test(e.target.value);

        const isValid = hasUpperCase && hasDigit && hasAtLeast8Characters && hasSpecialCharacters
        this.setState({validPassword: !isValid});
    }
 

    handleConfirmPassword =  e => {
        const dataObject = _.cloneDeep(this.state)
        dataObject[e.target.name] = e.target.value
        this.setState(dataObject)

        const valid = (e.target.value !== this.state.password)

        this.setState({mismatch: valid})
    }
 
 
    render() {
        return (
            <Card> 
                <CardBody>
                    <h3>Registration</h3>

                    <br/>

                    <Form>
                        { !_.isNil(this.state.response) && this.state.response === true &&  this.state.formSubmitted &&
                            <React.Fragment>
                                <h3><p style={{color:'red'}}>Please fill out required registration fields</p></h3>
                                <br/>
                            </React.Fragment>
                        }
                        { !_.isNil(this.state.response) && this.state.response.registration_status === 400 &&  this.state.formSubmitted &&
                            <React.Fragment>
                                <h3><p style={{color:'red'}}>{this.state.response.response.text}</p></h3>
                                <br/>
                            </React.Fragment>
                        }
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder=""
                                onChange={this.handleTextChange}
                                invalid={this.state.formSubmitted && !this.state.firstName}
                                value={this.state.firstName}
                            />
                            <FormFeedback valid={false}>First name is required</FormFeedback>
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder=""
                                onChange={this.handleTextChange}
                                invalid={this.state.formSubmitted && !this.state.lastName}
                                value={this.state.lastName}
                            />
                            <FormFeedback valid={false}>Last name is required</FormFeedback>
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label for="email">Email Address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                onChange={this.handleTextChange}
                                invalid={this.state.formSubmitted && !this.state.email}
                                value={this.state.email}
                            />
                            <FormFeedback valid={false}>Email address is required</FormFeedback>
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                onChange={this.handlePassword}
                                value={this.state.password}
                                invalid={this.state.validPassword || (this.state.formSubmitted && !this.state.password)}
                            />
                            { (this.state.validPassword || (this.state.formSubmitted && !this.state.password)) &&
                                <FormFeedback valid={false}>Required Password word must be alpha numeric and at least 8 characters long with at least one upper and special character</FormFeedback>
                            }
                        </FormGroup>

                        <br/>

                        <FormGroup>
                            <Label for="confirmPassword">Re-Type Password</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder=""
                                value={this.state.confirmPassword}
                                onChange={this.handleConfirmPassword}
                                invalid={this.state.mismatch || (this.state.formSubmitted && !this.state.confirmPassword)}
                            />
                            {  (this.state.mismatch || (this.state.formSubmitted && !this.state.confirmPassword)) &&
                                <FormFeedback valid={false}>Required Password and it must match password</FormFeedback>
                            }
                        </FormGroup>

                        <br/>

                        <p style={{ textAlign: 'center' }}>
                            <Button className="reset" color="secondary" onClick={this.resetRegistration}>Reset</Button>
                            {' '}
                            <Button className="register" color="primary" onClick={this.onClickRegister}>Register</Button>
                        </p>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}
