/* The header portion of the patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';

import HeaderMetadata from "./HeaderMetadata";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewVisitButtonClick = this.handleNewVisitButtonClick.bind(this);
        this.getProfilePictureSource = this.getProfilePictureSource.bind(this);
    }

    handleNewVisitButtonClick(event) {
        event.preventDefault();
        this.props.history.push(urlPathConstants.CREATE_VISIT);
    }

    getProfilePictureSource() {
        let profilePictureSource;
        if (this.props.profilePicture !== null) {
            profilePictureSource = this.props.profilePicture;
        } else {
            profilePictureSource = 'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }
        return profilePictureSource;
    }

    render() {
        return (
            <div className="patient-header rounded-grey-container">
                <div className="patient-info">
                    <img className="profile-picture" src={this.getProfilePictureSource()} alt="Patient profile picture."/>
                    <HeaderMetadata
                        fullName={this.props.fullName}
                        sex={this.props.sex}
                        age={this.props.age}/>
                </div>
                <button onClick={this.handleNewVisitButtonClick} className="new-visit-button">New Visit</button>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(Header);