/* The patient home page. */
import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as tokenConstants from '../../constants/token_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as authUtil from '../../util/auth_util';

import Charts from "./Charts";
import Header from "./Header";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'account': {},
            'isLoading': true
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getAccountInformationOrRedirectToLogin = this.getAccountInformationOrRedirectToLogin.bind(this);
    }


    async getAccountInformationOrRedirectToLogin() {
        try {
            return await authUtil.getAccountInformationWithAccessToken();
        } catch (error) {
            try {
                const accessTokenResponse = await authUtil.refreshAccessToken();
                authUtil.setToken(
                    tokenConstants.ACCESS_TOKEN,
                    accessTokenResponse.data.access);
                return await authUtil.getAccountInformationWithAccessToken();
            } catch (error) {
                authUtil.clearTokens();
                this.props.history.replace(urlPathConstants.ROOT);
            }
        }
    }

    componentDidMount() {
        let self = this;
        this.getAccountInformationOrRedirectToLogin()
            .then(function (response) {
                self.setState({
                    'account': response.data,
                    'isLoading': false
                });
            })
    }

    handleLogout() {
        // TODO: Setup a blacklist on server side.
        authUtil.clearTokens();
        this.props.history.replace(urlPathConstants.LOGIN);
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="patient-home">
                    <div className="main-vertical-navbar">
                        <button className="vertical-navbar-element" onClick={this.handleLogout}>Logout</button>
                        <button className="vertical-navbar-element">Icon #2</button>
                        <button className="vertical-navbar-element">Icon #3</button>
                        <button className="vertical-navbar-element">Icon #4</button>
                    </div>
                    <div className="patient-home-content">
                        <Header
                            profilePicture={this.state.account.patient_profile.profile_picture}
                            fullName={this.state.account.patient_profile.full_name}
                            sex={this.state.account.patient_profile.sex}
                            age={this.state.account.patient_profile.age}/>
                        <Charts patient_profile={this.state.account.patient_profile}/>
                    </div>
                </div>
            )
        }
    }
}

export default ReactRouterDOM.withRouter(Home);