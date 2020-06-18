import React from 'react';

import { withRouter } from 'react-router-dom';

import PatientHeaderMetadata from "./PatientHeaderMetadata";
import Url_paths from "../url_paths";


class PatientHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewVisitButtonClick = this.handleNewVisitButtonClick.bind(this);
    }

    handleNewVisitButtonClick(event) {
        event.preventDefault();
        this.props.history.push(Url_paths.CREATE_VISIT);
    }

    render() {
        let profilePictureSource;
        if (this.props.profile_picture !== null) {
            profilePictureSource = this.props.profile_picture;
        } else {
            profilePictureSource = 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }

        return (
            <div className="patient-header rounded-grey-container">
                <div className="patient-info">
                    <img className="profile-picture" src={profilePictureSource} alt="Patient profile picture."/>
                    <PatientHeaderMetadata fullName={this.props.full_name} sex={this.props.sex} age={this.props.age}/>
                </div>
                <button onClick={this.handleNewVisitButtonClick} className="new-visit-button">New Visit</button>
            </div>
        )
    }
}

export default withRouter(PatientHeader);