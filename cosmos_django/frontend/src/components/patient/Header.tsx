/* The header portion of the patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as textUtil from '../../util/text_util';

import HeaderMetadata from './HeaderMetadata';
import { Avatar, Button } from '@material-ui/core';

interface HeaderProps {
    profilePicture: string;
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
    history: any;
}

class Header extends React.Component<HeaderProps, any> {
    constructor(props) {
        super(props);
        this.handleNewEncounterButtonClick = this.handleNewEncounterButtonClick.bind(
            this
        );
    }

    handleNewEncounterButtonClick(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.push(urlPathConstants.ADD_ENCOUNTER);
    }

    render() {
        return (
            <div className="patient-header rounded-grey-container">
                <div className="patient-info">
                    <Avatar
                        alt={textUtil.createFullName(
                            this.props.firstName,
                            this.props.lastName
                        )}
                        src={this.props.profilePicture}
                        className="profile-picture"
                    >
                        {textUtil.getInitials(
                            this.props.firstName,
                            this.props.lastName
                        )}
                    </Avatar>
                    <HeaderMetadata
                        firstName={this.props.firstName}
                        lastName={this.props.lastName}
                        sex={this.props.sex}
                        age={this.props.age}
                    />
                </div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={this.handleNewEncounterButtonClick}
                >
                    New Encounter
                </Button>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(Header);
