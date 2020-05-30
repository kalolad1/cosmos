import React from 'react'

class PatientHead extends React.Component {
    render() {
        return (
            <div className="patient-head">
                <img id="profile-picture" src={this.props.patientProfile.profileImageUrl} alt="Profile picture."/>
                <h2>{this.props.patientProfile.firstName} {this.props.patientProfile.lastName}</h2>
            </div>
        )
    }
}

export default PatientHead;