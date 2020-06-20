import * as React from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import * as ReactRouterDOM from 'react-router-dom';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as axiosConfig from '../../configs/axios_config';
import * as authUtil from '../../util/auth_util';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';


const SEX_OPTIONS = [
    {id: 1, name: 'male'},
    {id: 2, name: 'female'}
];


class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'firstName': '',
            'lastName': '',
            'dateOfBirth': new Date(),
            'sex': SEX_OPTIONS[0].name,
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.createSexOptions = this.createSexOptions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    createSexOptions() {
        return SEX_OPTIONS.map(function (option) {
            return (
                <option key={option.id} value={option.name}>
                    {option.name}
                </option>
            );
        });
    }

    handleRegistrationRequest(event) {
        event.preventDefault();
        let self = this;
        axiosConfig.axiosClient.post(apiEndpointConstants.ACCOUNTS, {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: {
                'year': this.state.dateOfBirth.getFullYear(),
                'month': this.state.dateOfBirth.getMonth() + 1,  // Zero index to 1 index
                'day': this.state.dateOfBirth.getDate()
            },
            sex: this.state.sex
        })
            .then(function (response) {
                authUtil.sendLoginRequest(self.state.email, self.state.password)
                    .then(function () {
                        self.props.history.replace(urlPathConstants.HOME);
                    })
            });
    }

    handleDateChange(date) {
        this.setState({
            'dateOfBirth': date
        });
    }

    render() {
        return (
            <div className="login-signup-form-container">
                <div className="login-signup-form-content rounded-grey-container">
                    <h1>Sign up</h1>
                    <Form className="login-signup-form" onSubmit={this.handleRegistrationRequest}>
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

                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstName" value={this.state.firstName}
                                          onChange={this.handleInputChange} type="text" placeholder="First name"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleInputChange}
                                          type="text" placeholder="Last name"/>
                        </Form.Group>
                        <Form.Group controlId="formDateOfBirth">
                            <p>Date of birth</p>
                            <DatePicker selected={this.state.dateOfBirth} onChange={this.handleDateChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Sex</Form.Label>
                            <Form.Control name="sex" onChange={this.handleInputChange} as="select">
                                {this.createSexOptions()}
                            </Form.Control>
                        </Form.Group>

                        <div className="login-signup-form-button-container">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                        <ReactRouterDOM.Link to={urlPathConstants.LOGIN}>
                            <p>Existing user? Log in here.</p>
                        </ReactRouterDOM.Link>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(SignupForm);