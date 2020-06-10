import React from 'react';

import {Spinner} from 'react-bootstrap';


class PatientHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let profilePictureSource;
        if (this.props.profile_picture !== null) {
            profilePictureSource = this.props.profile_picture;
        } else {
            profilePictureSource = 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }

        return (
            <div className="patient-header">
                <img className="profile-picture"
                     src={profilePictureSource}/>
                <h1>{this.props.full_name}</h1>
            </div>
        )
    }
}

export default PatientHeader;