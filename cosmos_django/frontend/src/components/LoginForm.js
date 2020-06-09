import React from 'react'
import {Link, withRouter} from 'react-router-dom';

import URL_PATHS from "../url_paths";
import { sendLoginRequest } from "../auth_util";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': ''
        };

        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleLoginRequest(event) {
        event.preventDefault();
        let self = this;
        sendLoginRequest(this.state.email, this.state.password)
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
