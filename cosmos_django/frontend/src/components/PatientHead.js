import React from 'react'

class PatientHead extends React.Component {
    render() {
        return (
            <div className="patient-head">
                <img id="profile-picture" src={this.props.patientProfile.profile_picture} alt="Profile picture."/>
                <h2>{this.props.patientProfile.first_name} {this.props.patientProfile.last_name}</h2>
            </div>
        )
    }
}

export default PatientHead;