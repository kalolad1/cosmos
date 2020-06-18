import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPaths from "../url_paths";

import {sendLoginRequest} from "../authUtil";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {ChangeEvent, FormEvent} from "react";
import {url} from "inspector";


interface LoginFormState {
    email: string,
    password: string
}

class LoginForm extends React.Component<any, Partial<LoginFormState>> {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
    }

    handleInputChange(event): void {
        const element = event.target;
        const name: string = element.name;
        this.setState({
            [name]: element.value
        });
    }


    handleLoginRequest(event) {
        event.preventDefault();
        let self = this;
        sendLoginRequest(this.state.email, this.state.password)
            .then(function (response) {
                self.props.history.replace(urlPaths.HOME);
            })
    }

    render() {
        return (
            <div className="login-signup-form-container">
                <div className="login-signup-form-content rounded-grey-container">
                    <h1>Sign in</h1>
                    <Form className="login-signup-form" onSubmit={this.handleLoginRequest}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange}
                                          type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange}
                                          type="password" placeholder="Password"/>
                        </Form.Group>
                        <div className="login-signup-form-button-container">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                        <ReactRouterDOM.Link to={urlPaths.SIGNUP}>
                            <p>Not an existing user? Sign up here.</p>
                        </ReactRouterDOM.Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(LoginForm);
