import React from 'react'

import PatientHead from "./PatientHead";
import PatientNavbar from "./PatientNavbar";
import PatientTabContent from "./PatientTabContent";

class PatientPage extends React.Component {
    render() {
        return (
            <div className="patient-page">
                <PatientHead patientProfile={this.props.patientProfile}/>
                <br />
                <br />
                <PatientNavbar/>
                <PatientTabContent />
                <br />
                <br />
                <div>
                    <a href="http://localhost:8000/account/logout">Logout</a>
                </div>
            </div>
        )
    }
}

export default PatientPage;