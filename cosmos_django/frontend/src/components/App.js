import React from 'react';
import ReactDOM from 'react-dom';

import PatientPage from './PatientPage'

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Cosmos</h1>
                <PatientPage patientProfile={this.props.patientProfile} />
            </div>
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

ReactDOM.render(
    <App patientProfile={PATIENT_PROFILE}/>,
    document.getElementById('app'));
