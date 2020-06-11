import React from 'react';

class PatientHeaderMetadata extends React.Component {
    render() {
        return (
            <div className="patient-header-metadata">
                <h1>{this.props.fullName}</h1>
                <h6>{this.props.sex} &middot; {this.props.age} years old</h6>
            </div>
        )
    }
}

export default PatientHeaderMetadata;