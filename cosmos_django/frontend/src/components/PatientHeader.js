import React from 'react';

import {Spinner} from 'react-bootstrap';


class PatientHeader extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        if (Object.keys(this.props.account).length === 0) {
            return <div>Loading</div>
        } else {
            return (
                <div className="patient-header">
                    <img className="profile-picture"
                         src={this.props.account.patient_profile.profile_picture}/>
                    <h1>{this.props.account.patient_profile.full_name}</h1>
                </div>
            )
        }
    }
}

export default PatientHeader;