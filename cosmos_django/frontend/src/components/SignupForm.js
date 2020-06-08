import React from 'react'
import { Link, withRouter} from "react-router-dom";

import API_ENDPOINTS from "../api_endpoints";
import axiosClient from "../axiosClient";
import URL_PATHS from "../url_paths";


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleRegistrationRequest(event) {
        console.log('Handling registration request.');
        event.preventDefault();
        let self = this;

        axiosClient.post(API_ENDPOINTS.REGISTER, {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log('User registered successfully.');
                console.log(response.data);
                self.props.history.replace(URL_PATHS.ROOT);
            });
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
                <h1>Sign up</h1>
                <form onSubmit={this.handleRegistrationRequest}>
                    <div>
                        <p>Email</p>
                        <input type="text" name="email" value={this.state.email}
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

                <Link to={URL_PATHS.LOGIN}>
                    <p>Already an existing user? Login here.</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(SignupForm);
