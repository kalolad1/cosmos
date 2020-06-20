/* The header portion of the patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';

import HeaderMetadata from "./HeaderMetadata";
import {Avatar, Button} from "@material-ui/core";

interface HeaderProps {
    profilePicture: string,
    fullName: string,
    firstName: string,
    lastName: string,
    sex: string,
    age: number,
    history: any,
}

class Header extends React.Component<HeaderProps, any> {
    constructor(props) {
        super(props);
        this.handleNewVisitButtonClick = this.handleNewVisitButtonClick.bind(this);
        this.getPatientInitials = this.getPatientInitials.bind(this);
    }

    handleNewVisitButtonClick(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.push(urlPathConstants.CREATE_VISIT);
    }

    getPatientInitials(): string {
        return this.props.firstName[0] + this.props.lastName[0];
    }

    render() {
        return (
            <div className="patient-header rounded-grey-container">
                <div className="patient-info">
                    <Avatar
                        alt={this.props.fullName}
                        src={this.props.profilePicture}
                        className="profile-picture">
                        {this.getPatientInitials()}
                    </Avatar>
                    <HeaderMetadata
                        fullName={this.props.fullName}
                        sex={this.props.sex}
                        age={this.props.age}/>
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={this.handleNewVisitButtonClick}>
                    New Visit
                </Button>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(Header);