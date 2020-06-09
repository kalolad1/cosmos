import React from 'react'
import {Link, withRouter} from "react-router-dom";

import API_ENDPOINTS from "../api_endpoints";
import { sendLoginRequest } from "../auth_util";
import axiosClient from "../axiosClient";
import URL_PATHS from "../url_paths";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'firstName': '',
            'lastName': '',
            'dateOfBirth': new Date()
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleRegistrationRequest(event) {
        console.log('Handling registration request.');
        event.preventDefault();
        let self = this;
        console.log(this.state.dateOfBirth);
        axiosClient.post(API_ENDPOINTS.REGISTER, {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: {
                'year': this.state.dateOfBirth.getFullYear(),
                'month': this.state.dateOfBirth.getMonth() + 1,  // Zero index to 1 index
                'day': this.state.dateOfBirth.getDate()
            }
        })
            .then(function (response) {
                console.log('User registered successfully.');
                console.log(response.data);
                sendLoginRequest(self.state.email, self.state.password)
                    .then(function (response) {
                        self.props.history.replace(URL_PATHS.HOME);
                    })
            });
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            'dateOfBirth': date
        });
    }

    render() {
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleRegistrationRequest}>
                    <div>
                        <p>Email</p>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" name="password" value={this.state.password}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>First name</p>
                        <input type="text" name="firstName" value={this.state.firstName}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>Last name</p>
                        <input type="text" name="lastName" value={this.state.lastName}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>Date of birth</p>
                        <DatePicker selected={this.state.dateOfBirth} onChange={this.handleDateChange}/>
                    </div>

                    <br/>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>

                <Link to={URL_PATHS.LOGIN}>
                    <p>Already an existing user? Login here.</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(SignupForm);
