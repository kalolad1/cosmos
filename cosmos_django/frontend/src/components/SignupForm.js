import React from 'react'
import {Link, withRouter} from "react-router-dom";

import apiEndpoints from "../apiEndpoints";
import { sendLoginRequest } from "../authUtil";
import axiosClient from "../axiosClient";
import UrlPaths from "../urlPaths";

import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

const SEX_OPTIONS = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'}
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
            'sex': '',
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSexSelectChange = this.handleSexSelectChange.bind(this);
    }

    handleRegistrationRequest(event) {
        console.log('Handling registration request.');
        event.preventDefault();
        let self = this;
        console.log(this.state.dateOfBirth);
        axiosClient.post(apiEndpoints.REGISTER, {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: {
                'year': this.state.dateOfBirth.getFullYear(),
                'month': this.state.dateOfBirth.getMonth() + 1,  // Zero index to 1 index
                'day': this.state.dateOfBirth.getDate()
            },
            sex: this.state.sex.value
        })
            .then(function (response) {
                console.log('User registered successfully.');
                console.log(response.data);
                sendLoginRequest(self.state.email, self.state.password)
                    .then(function (response) {
                        self.props.history.replace(UrlPaths.HOME);
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

    handleSexSelectChange(selectedOption) {
        this.setState({
            'sex': selectedOption
        })
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
                    <div>
                        <p>Sex</p>
                        <Select options={SEX_OPTIONS} onChange={this.handleSexSelectChange}/>
                    </div>

                    <br/>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>

                <Link to={UrlPaths.LOGIN}>
                    <p>Already an existing user? Login here.</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(SignupForm);
