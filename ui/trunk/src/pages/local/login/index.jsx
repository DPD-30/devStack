import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router-dom';
import { Alert, Card, CardBody, Button, FormGroup,FormFeedback, Label, Input } from "reactstrap"
import _ from 'lodash'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'
 

//css
import 'css/login.css'


export default class Login extends Reflux.Component {
// export default class Login extends React.Component {
    constructor(props) {
		super(props)

        this.state = {
            email: '',
            password: '',
            successfulLogin: false,
            formSubmitted: false,
            user: [],
        }

        this.store = AppStore
        this.storeKeys = ['localUser_status']
 
        this.onClickLogin = this.onClickLogin.bind(this)
        this.resetLogin = this.resetLogin.bind(this)
    }
 

    onClickLogin(event) {
        this.setState({formSubmitted: true})

        const hasErrors = ( !this.state.email || !this.state.password)

        if(!hasErrors) {
            AppActions.localSignIn({
                password: this.state.password,
                userName: this.state.email,
                // onSuccess: () => 

                //     this.setState({successfulLogin: true})
            })
        }
    }

    resetLogin() {
        this.setState({loginEmail:'',loginPassword:'', formSubmitted: false})
    }

    handleTextChange =  e => {
            const dataObject = _.cloneDeep(this.state); 
            dataObject[e.target.name] = e.target.value;
            this.setState(dataObject);
    }

    render() { 
        return (
            <Card>
                <CardBody>
                    <div>
                        <h2>Login</h2>

                        <br/><br/>

                        {
                            this.state.localUser_status === 'FAILURE' &&

                            <p>
                                <Alert color="warning">Login Error Occurred</Alert>
                            </p>
                        }

                        <FormGroup>
                            <Label for="email">Email Address</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=""
                                onChange={this.handleTextChange}
                                invalid={this.state.formSubmitted &&!this.state.email}
                                value={this.state.email}
                            />
                            <FormFeedback>Email address is required</FormFeedback>
                        </FormGroup>
                        <br/>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                onChange={this.handleTextChange}
                                invalid={this.state.formSubmitted && !this.state.password}
                                value={this.state.password}
                            />
                            <FormFeedback>Password is required</FormFeedback>
                        </FormGroup>
                        <div className="justify-content-center">
                            <Button className="reset" color="secondary" size="lg" onClick={this.resetLogin}>Reset</Button>
                            <Button className="login" color="primary" size="lg" style={{marginLeft:"20px"}} onClick={this.onClickLogin}>Login</Button>
                        </div>

                        <br />

                        <hr />

                        <p>
                            <Link to="/register">
                                <Button color="link">
                                    Register
                                </Button>
                            </Link>
                        </p>
                    </div>
                </CardBody>
            </Card>
        )
    }
}