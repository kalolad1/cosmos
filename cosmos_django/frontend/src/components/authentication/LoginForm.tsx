import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as authApi from '../../api/auth_api';
import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as urlPathConstants from '../../constants/url_path_constants';

import {Button, Snackbar, TextField} from '@material-ui/core';
import {Alert} from "@material-ui/lab";


interface LoginFormState {
    email: string,
    password: string,
    isErrorSnackbarOpen: boolean,
}


class LoginForm extends React.Component<any, LoginFormState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isErrorSnackbarOpen: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleErrorSnackbarClose = this.handleErrorSnackbarClose.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleLoginRequest(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log('Received request to log in.');
        const self = this;
        authApi.loginRequest(this.state.email, this.state.password)
            .then(function () {
                self.props.history.replace(urlPathConstants.HOME);
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    ...self.state,
                    isErrorSnackbarOpen: true,
                })
            });
    }

    handleErrorSnackbarClose() {
        this.setState({
            ...this.state,
            isErrorSnackbarOpen: false,
        });
    }

    render() {
        return (
            <div className="login-signup-form-container">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.isErrorSnackbarOpen}
                    onClose={this.handleErrorSnackbarClose}>
                    <Alert onClose={this.handleErrorSnackbarClose} severity="error">
                        Email or password is incorrect!
                    </Alert>
                </Snackbar>
                <div className="login-signup-form-content rounded-grey-container box-shadow-container">
                    <div className="login-signup-form-content-logo-container">
                        <img
                            src={apiEndpointConstants.TEXT}
                            alt="Cosmos logo with text."/>
                    </div>
                    <h1>Sign in</h1>
                    <form
                        className="login-signup-form"
                        onSubmit={this.handleLoginRequest}>
                        <div className="form-input-container">
                            <TextField
                                className="form-input-field"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                label="Email"
                                type="email"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}/>
                        </div>
                        <div className="form-input-container">
                            <TextField
                                className="form-input-field"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                label="Password"
                                type="password"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}/>
                        </div>
                        <div className="form-button-container">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large">
                                Next
                            </Button>
                        </div>
                        <div className="login-signup-redirect-link-container">
                            <ReactRouterDOM.Link to={urlPathConstants.SIGNUP}>
                                Not an existing user? Sign up here.
                            </ReactRouterDOM.Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(LoginForm);
