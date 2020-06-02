import React from 'react';
import ReactDOM from 'react-dom';

import PatientPage from './PatientPage'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            patientProfile: {},
            error: null
        }
    }


    render() {
        console.log(this.state.patientProfile)
        if (!this.state.isLoaded) {
            return <div>Is Loading...</div>
        } else {
            return (
                <div>
                    <h1>Cosmos</h1>
                    <PatientPage patientProfile={this.state.patientProfile} />
                </div>
            )
        }
    }

    componentDidMount() {
        let patientProfileAPI = BASE_URL + 'clinical/api/patient_profiles/' + window.user_id

        fetch(patientProfileAPI)
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        patientProfile: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }
}

const PATIENT_PROFILE = {
    "patientProfileId": 1,
    "profileImageUrl": "https://i.ibb.co/phmFcD5/Sudeep-Profile-Pic.jpg",
    "firstName": "Sudeep",
    "lastName": "Peddireddy",
    "visits": [
        {
            "visitId": 1,
            "visitType": "physical",
            "note": "Sudeep had a normal physical."
        },
        {
            "visitId": 2,
            "visitType": "vaccination",
            "note": "Sudeep got the COVID-19 vaccine."
        }
    ]
};

const BASE_URL = 'http://localhost:8000/';


ReactDOM.render(
    <App patientProfile={PATIENT_PROFILE}/>,
    document.getElementById('app'));