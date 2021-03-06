import DateFnsUtils from '@date-io/date-fns';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import * as authApi from '../../api/auth_api';
import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';
import * as authUtil from '../../util/auth_util';
import * as textUtil from '../../util/text_util';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const SEX_OPTIONS = [
    {
        id: 1,
        value: modelTypes.Sex.MALE,
        formatted: textUtil.capitalizeFirstLetter(modelTypes.Sex.MALE),
    },
    {
        id: 2,
        value: modelTypes.Sex.FEMALE,
        formatted: textUtil.capitalizeFirstLetter(modelTypes.Sex.FEMALE),
    },
];

interface SignupFormState {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    sex: modelTypes.Sex;
    isProvider: string;
    isErrorSnackbarOpen: boolean;
    snackBarErrorMessage: string;
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
            sex: modelTypes.Sex.EMPTY,
            isErrorSnackbarOpen: false,
            snackBarErrorMessage: 'An error has occurred!',
            isProvider: 'no',
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(
            this
        );
        this.createSexMenuItems = this.createSexMenuItems.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleErrSnackbarClose = this.handleErrSnackbarClose.bind(this);
    }

    handleDateChange(date: Date | null): void {
        this.setState({
            ...this.state,
            dateOfBirth: date!,
        });
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
        return SEX_OPTIONS.map(function (option) {
            return (
                <MenuItem key={option.id} value={option.value}>
                    {option.formatted}
                </MenuItem>
            );
        });
    }

    handleRegistrationRequest(event: React.SyntheticEvent): void {
        event.preventDefault();
        const self = this;
        const newUser: modelTypes.UserConstructor = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth!.toLocaleDateString()!,
            sex: this.state.sex,
            isProvider: this.state.isProvider === 'yes',
        };
        authApi
            .signupRequest(newUser)
            .then(function () {
                authApi
                    .loginRequest(self.state.email, self.state.password)
                    .then(function (response) {
                        authUtil.setAuthTokens(response.data);
                        self.props.history.replace(urlPathConstants.HOME);
                    });
            })
            .catch(function (error) {
                if (error.response) {
                    self.setState({
                        ...self.state,
                        snackBarErrorMessage:
                            error.response.data.userFacingMessage,
                    });
                }
                self.setState({
                    ...self.state,
                    isErrorSnackbarOpen: true,
                });
            });
    }

    handleErrSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
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
                    onClose={this.handleErrSnackbarClose}
                >
                    <Alert
                        onClose={this.handleErrSnackbarClose}
                        severity="error"
                    >
                        {this.state.snackBarErrorMessage}
                    </Alert>
                </Snackbar>
                <div className="login-signup-form-content rounded-grey-container box-shadow-container">
                    <div className="login-signup-form-content-logo-container">
                        <img
                            src={apiEndpointConstants.TEXT}
                            alt="Cosmos text logo."
                        />
                    </div>
                    <h1>Sign up</h1>
                    <form
                        className="login-signup-form"
                        onSubmit={this.handleRegistrationRequest}
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
                        <div className="form-input-container form-bi-input-container">
                            <TextField
                                className="form-bi-input-field"
                                name="firstName"
                                onChange={this.handleInputChange}
                                value={this.state.firstName}
                                label="First name"
                                type="text"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}
                            />
                            <TextField
                                className="form-bi-input-field"
                                name="lastName"
                                onChange={this.handleInputChange}
                                value={this.state.lastName}
                                label="Last name"
                                type="text"
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="form-input-container">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="sex-label">Sex</InputLabel>
                                <Select
                                    displayEmpty
                                    labelId="sex-label"
                                    id="sex"
                                    name="sex"
                                    value={this.state.sex}
                                    onChange={this.handleSelectChange}
                                    label="Sex"
                                    inputProps={{
                                        required: true,
                                    }}
                                >
                                    {this.createSexMenuItems()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-input-container">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    disableFuture
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="MM/dd/yyyy"
                                    id="dateOfBirth"
                                    label="Date of birth"
                                    value={this.state.dateOfBirth}
                                    onChange={this.handleDateChange}
                                    openTo="year"
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="form-input-container">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Are you a healthcare provider?
                                </FormLabel>
                                <RadioGroup
                                    aria-label="isProvider"
                                    name="isProvider"
                                    value={this.state.isProvider}
                                    onChange={this.handleInputChange}
                                >
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio />}
                                        label="No"
                                    />
                                    <FormControlLabel
                                        value="yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="form-button-container">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                type="submit"
                            >
                                Next
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
