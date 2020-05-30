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
    "encounters": [
        {
            "encounterId": 1,
            "encounterType": "physical",
            "note": "Sudeep had a normal physical."
        },
        {
            "encounterId": 2,
            "encounterType": "vaccination",
            "note": "Sudeep got the COVID-19 vaccine."
        }
    ]
};

ReactDOM.render(
    <App patientProfile={PATIENT_PROFILE}/>,
    document.getElementById('app'));
