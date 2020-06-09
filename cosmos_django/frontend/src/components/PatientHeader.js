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
            profilePictureSource = 'https://lh3.googleusercontent.com/proxy/3l1RSQ3IjHIq0RJ4p3T47TFC2VNmZRAAy9yQ3D6p9Uf0hSNtOiXddf8uasZYdDGfmuhqWZGfOI7PVK-ShKb5svGvjxOndKgv9jm2W4g17ZGcw8YYq4FtxufJj_w0fdj5aM3-LcSzezh9DtCnsSE4Ouiz1U2Dwilb0gQ'
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