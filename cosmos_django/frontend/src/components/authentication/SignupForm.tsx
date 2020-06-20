import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as ReactRouterDOM from 'react-router-dom';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as axiosConfig from '../../configs/axios_config';
import * as authUtil from '../../util/auth_util';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';


const SEX_OPTIONS = [
    {id: 1, value: 'male', humanReadable: 'Male'},
    {id: 2, value: 'female', humanReadable: 'Female'},
];

interface SignupFormState {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    sex: string
}

class SignupForm extends React.Component<any, SignupFormState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            sex: '',
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
        this.createSexMenuItems = this.createSexMenuItems.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const element = event.target;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    createSexMenuItems() {
        return SEX_OPTIONS.map(function(option) {
            return (
                <MenuItem
                    key={option.id}
                    value={option.value}>{option.humanReadable}</MenuItem>
            );
        });
    }

    handleRegistrationRequest(event: React.SyntheticEvent): void {
        event.preventDefault();
        const self = this;

        axiosConfig.axiosClient.post(apiEndpointConstants.ACCOUNTS, {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: {
                'year': this.state.dateOfBirth!.getFullYear(),
                // Zero index to 1 index
                'month': this.state.dateOfBirth!.getMonth() + 1,
                'day': this.state.dateOfBirth!.getDate()
            },
            sex: this.state.sex
        })
            .then(function() {
                authUtil.sendLoginRequest(self.state.email, self.state.password)
                    .then(function() {
                        self.props.history.replace(urlPathConstants.HOME);
                    });
            });
    }

    render() {
        return (
            <div className="login-signup-form-container">
                <div className="login-signup-form-content rounded-grey-container box-shadow-container">
                    <div className="login-signup-form-content-logo-container">
                        <img
                            src={apiEndpointConstants.TEXT}
                            alt="Cosmos text logo."/>
                    </div>
                    <h1>Sign up</h1>
                    <form
                        className="login-signup-form"
                        onSubmit={this.handleRegistrationRequest}>
                        <div className="login-signup-input-container">
                            <TextField
                                className="login-signup-input-field"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                label="Email"
                                type="email"
                                variant="outlined"/>
                        </div>
                        <div className="login-signup-input-container">
                            <TextField
                                className="login-signup-input-field"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                label="Password"
                                type="password"
                                variant="outlined"/>
                        </div>
                        <div className="login-signup-input-container">
                            <TextField
                                className="login-signup-input-field"
                                name="firstName"
                                onChange={this.handleInputChange}
                                value={this.state.firstName}
                                label="First name"
                                type="text"
                                variant="outlined"/>
                        </div>
                        <div className="login-signup-input-container">
                            <TextField
                                className="login-signup-input-field"
                                name="lastName"
                                onChange={this.handleInputChange}
                                value={this.state.lastName}
                                label="Last name"
                                type="text"
                                variant="outlined"/>
                        </div>
                        <div className="login-signup-input-container">
                            <FormControl
                                variant="outlined"
                                className="login-signup-input-field">
                                <InputLabel id="sex-label">Sex</InputLabel>
                                <Select
                                    labelId="sex-label"
                                    id="sex"
                                    name="sex"
                                    value={this.state.sex}
                                    onChange={this.handleSelectChange}
                                    label="Sex">{this.createSexMenuItems()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="login-signup-form-button-container">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                type="submit">Next
                            </Button>
                        </div>
                        <div className="login-signup-redirect-link-container">
                            <ReactRouterDOM.Link to={urlPathConstants.LOGIN}>
                                Already an existing user? Log in here.
                            </ReactRouterDOM.Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(SignupForm);
