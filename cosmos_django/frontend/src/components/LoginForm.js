import React from 'react'
import {Link, withRouter} from 'react-router-dom';

import UrlPaths from "../urlPaths";
import {sendLoginRequest} from "../authUtil";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }


    handleLoginRequest(event) {
        event.preventDefault();
        let self = this;
        sendLoginRequest(this.state.email, this.state.password)
            .then(function (response) {
                self.props.history.replace(UrlPaths.HOME);
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
                        <Link to={UrlPaths.SIGNUP}>
                            <p>Not an existing user? Sign up here.</p>
                        </Link>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm);
