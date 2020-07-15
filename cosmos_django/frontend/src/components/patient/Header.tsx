/* The header portion of the patient home page. */
import clsx from 'clsx';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';
import * as textUtil from '../../util/text_util';
import * as urlUtil from '../../util/url_util';

import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

import HeaderMetadata from './HeaderMetadata';

interface HeaderProps {
    profilePicture: string;
    firstName: string;
    lastName: string;
    sex: modelTypes.Sex;
    age: number;
    history: any;
    resultVariant?: boolean; // Specifies header is used in search results.
}

class Header extends React.Component<HeaderProps, any> {
    constructor(props) {
        super(props);
        this.handleNewEncounterClick = this.handleNewEncounterClick.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleNewEncounterClick(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.push(urlPathConstants.NEW_ENCOUNTER);
    }

    handleOnClick() {
        if (this.props.resultVariant) {
            console.log('Pushing to patient view!');

            this.props.history.push(
                urlUtil.getUrlPathWithId(urlPathConstants.VIEW_PATIENT, 0)
            );
        }
    }

    render() {
        return (
            <div
                className={clsx({
                    'patient-header': true,
                    'patient-header-result': this.props.resultVariant,
                })}
                onClick={this.handleOnClick}
            >
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
                {!this.props.resultVariant && (
                    <Fab
                        className="add-encounter-button"
                        color="secondary"
                        variant="extended"
                        aria-label="add encounter"
                        onClick={this.handleNewEncounterClick}
                    >
                        <AddIcon />
                        New Encounter
                    </Fab>
                )}
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(Header);
