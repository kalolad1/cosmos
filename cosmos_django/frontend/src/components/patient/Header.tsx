/* The header portion of the patient home page. */
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as textUtil from '../../util/text_util';

import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

import HeaderMetadata from './HeaderMetadata';

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
            <div className="patient-header">
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
                <Fab
                    className="add-encounter-button"
                    color="secondary"
                    variant="extended"
                    aria-label="add encounter"
                    onClick={this.handleNewEncounterButtonClick}
                >
                    <AddIcon />
                    New Encounter
                </Fab>
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(Header);
