import React from 'react'
import {withRouter} from 'react-router-dom';

import apiEndpoints from "../apiEndpoints";
import axiosClient from "../axiosClient";
import CONSTANTS from '../constants';
import UrlPaths from "../urlPaths";

import PatientCharts from "./PatientCharts";
import PatientHeader from "./PatientHeader";


class PatientHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'account': {},
            'isLoading': true
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getAccountInformationOrRedirect = this.getAccountInformationOrRedirect.bind(this);
        this.getAccountInformationWithAccessToken = this.getAccountInformationWithAccessToken.bind(this);
        this.getRequestHeader = this.getRequestHeader.bind(this);
        this.removeTokens = this.removeTokens.bind(this);
    }

    getRequestHeader() {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
            }
        }
    }

    getAccountInformationWithAccessToken() {
        return axiosClient.get(apiEndpoints.ACCOUNTS, this.getRequestHeader())
    }

    refreshAccessToken() {
        // Send refresh token for new access token.
        return axiosClient.post(apiEndpoints.REFRESH_TOKEN, {
            'refresh': localStorage.getItem(CONSTANTS.REFRESH_TOKEN)
        })
            .then(function (response) {
                return response;
            });
    }

    removeTokens() {
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    }

    async getAccountInformationOrRedirect() {
        try {
            return await this.getAccountInformationWithAccessToken();
        } catch (error) {
            try {
                const accessTokenResponse = await this.refreshAccessToken();
                localStorage.setItem(CONSTANTS.ACCESS_TOKEN,
                    accessTokenResponse.data.access);
                return await this.getAccountInformationWithAccessToken();
            } catch (error) {
                this.removeTokens();
                this.props.history.replace(UrlPaths.ROOT);
            }
        }
    }

    componentDidMount() {
        let self = this;
        this.getAccountInformationOrRedirect()
            .then(function (response) {
                self.setState({
                    'account': response.data,
                    'isLoading': false
                });
                console.log(response);
            });
    }

    handleLogout() {
        // Wipe token from local storage.
        // TODO: Setup a blacklist on server side.
        console.log('LOGGING OUT!');
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
        this.props.history.replace(UrlPaths.LOGIN);
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        } else {
            let profile_picture = '';
            if (this.state.account.patient_profile.hasOwnProperty('profile_picture')) {
                profile_picture = this.state.account.patient_profile.profile_picture;
            }
            return (
                <div className="patient-home">
                    <div className="main-vertical-navbar">
                        <button className="vertical-navbar-element" onClick={this.handleLogout}>Logout</button>
                        <button className="vertical-navbar-element">Icon #2</button>
                        <button className="vertical-navbar-element">Icon #3</button>
                        <button className="vertical-navbar-element">Icon #4</button>
                    </div>
                    <div className="patient-home-content">
                        <PatientHeader profile_picture={profile_picture}
                                       full_name={this.state.account.patient_profile.full_name}
                                       sex={this.state.account.patient_profile.sex}
                                       age={this.state.account.patient_profile.age}/>
                        <PatientCharts account={this.state.account}/>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(PatientHome);