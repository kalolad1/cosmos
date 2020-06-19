import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as authUtil from '../../util/auth_util';

import ReactBootstrapButton from 'react-bootstrap/Button';
import ReactBootstrapForm from 'react-bootstrap/Form';


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

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            [name]: element.value
        });
    }


    handleLoginRequest(event: React.SyntheticEvent): void {
        event.preventDefault();
        let self = this;
        authUtil.sendLoginRequest(this.state.email, this.state.password)
            .then(function () {
                self.props.history.replace(urlPathConstants.HOME);
            })
    }

    render() {
        return (
            <div className="login-signup-form-container">
                <div className="login-signup-form-content rounded-grey-container">
                    <h1>Sign in</h1>
                    <ReactBootstrapForm className="login-signup-form" onSubmit={this.handleLoginRequest}>
                        <ReactBootstrapForm.Group>
                            <ReactBootstrapForm.Label>Email address</ReactBootstrapForm.Label>
                            <ReactBootstrapForm.Control name="email" value={this.state.email} onChange={this.handleInputChange}
                                          type="email" placeholder="Enter email"/>
                            <ReactBootstrapForm.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </ReactBootstrapForm.Text>
                        </ReactBootstrapForm.Group>
                        <ReactBootstrapForm.Group>
                            <ReactBootstrapForm.Label>Password</ReactBootstrapForm.Label>
                            <ReactBootstrapForm.Control name="password" value={this.state.password} onChange={this.handleInputChange}
                                          type="password" placeholder="Password"/>
                        </ReactBootstrapForm.Group>
                        <div className="login-signup-form-button-container">
                            <ReactBootstrapButton variant="primary" type="submit">
                                Submit
                            </ReactBootstrapButton>
                        </div>
                        <ReactRouterDOM.Link to={urlPathConstants.SIGNUP}>
                            <p>Not an existing user? Sign up here.</p>
                        </ReactRouterDOM.Link>
                    </ReactBootstrapForm>
                </div>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(LoginForm);
