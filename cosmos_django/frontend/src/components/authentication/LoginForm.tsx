import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as authApi from '../../api/auth_api';
import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as authUtil from '../../util/auth_util';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

interface LoginFormState {
    email: string;
    password: string;
    isErrorSnackbarOpen: boolean;
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
        this.handleErrorSnackbarClose = this.handleErrorSnackbarClose.bind(
            this
        );
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
        const self = this;
        authApi
            .loginRequest(this.state.email, this.state.password)
            .then(function (response) {
                authUtil.setAuthTokens(response.data);
                self.props.history.replace(urlPathConstants.HOME);
            })
            .catch(function () {
                self.setState({
                    ...self.state,
                    isErrorSnackbarOpen: true,
                });
            });
    }

    handleErrorSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
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
                    onClose={this.handleErrorSnackbarClose}
                >
                    <Alert
                        onClose={this.handleErrorSnackbarClose}
                        severity="error"
                    >
                        Email or password is incorrect!
                    </Alert>
                </Snackbar>
                <div className="login-signup-form-content rounded-grey-container box-shadow-container">
                    <div className="login-signup-form-content-logo-container">
                        <img
                            src={apiEndpointConstants.TEXT}
                            alt="Cosmos logo with text."
                        />
                    </div>
                    <h1>Sign in</h1>
                    <form
                        className="login-signup-form"
                        onSubmit={this.handleLoginRequest}
                    >
                        <div className="form-input-container">
                            <TextField
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                label="Email"
                                type="email"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}
                                fullWidth
                            />
                        </div>
                        <div className="form-input-container">
                            <TextField
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                label="Password"
                                type="password"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}
                                fullWidth
                            />
                        </div>
                        <div className="form-button-container">
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                            >
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
