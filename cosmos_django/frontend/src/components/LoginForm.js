import React from 'react'
import { Link, withRouter } from 'react-router-dom';

import API_ENDPOINTS from "../api_endpoints";
import axiosClient from "../axiosClient";
import CONSTANTS from "../constants";
import URL_PATHS from "../url_paths";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };

        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    sendLoginRequest() {
        console.log('Handling login request.');
        return axiosClient.post(API_ENDPOINTS.GET_TOKEN, {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                localStorage.setItem(CONSTANTS.ACCESS_TOKEN,
                    response.data.access);
                localStorage.setItem(CONSTANTS.REFRESH_TOKEN,
                    response.data.refresh);
                return response;
            })
    }

    handleLoginRequest(event) {
        event.preventDefault();
        let self = this;
        this.sendLoginRequest()
            .then(function (response) {
                self.props.history.replace(URL_PATHS.HOME);
            })
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleLoginRequest}>
                    <div>
                        <p>Email</p>
                        <input type="text" name="email"
                               value={this.state.email}
                               onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type="password" name="password"
                               value={this.state.password}
                               onChange={this.handleInputChange}/>
                    </div>
                    <br/>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>

                <Link to={URL_PATHS.SIGNUP}>
                    <p>Not an existing user? Register here.</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(LoginForm);
