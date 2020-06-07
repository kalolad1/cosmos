import React from 'react'
import { Link, withRouter} from "react-router-dom";
import axiosClient from "../axiosClient";


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };

        this.handleRegistrationRequest = this.handleRegistrationRequest.bind(this);
    }

    handleRegistrationRequest(event) {
        console.log('Handling registration request.');
        event.preventDefault();

        axiosClient.post('register/', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                self.props.history.push('/');
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

                <Link to="/login">
                    <p>Already an existing user? Login here.</p>
                </Link>
            </div>
        )
    }
}

export default withRouter(SignupForm);
