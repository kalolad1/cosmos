import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as textUtil from '../../util/text_util';
import * as urlUtil from '../../util/url_util';

import Avatar from '@material-ui/core/Avatar';

import HeaderMetadata from '../patient/HeaderMetadata';
import * as modelTypes from '../../types/modelTypes';

interface SearchResultItemProps {
    userId: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    sex: modelTypes.Sex;
    age: number;
    history: any;
}

class SearchResultItem extends React.Component<SearchResultItemProps, any> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push(
            urlUtil.getUrlPathWithId(
                urlPathConstants.HOME + urlPathConstants.VIEW_PATIENT,
                this.props.userId
            )
        );
    }

    render() {
        return (
            <div className="search-result-item" onClick={this.handleClick}>
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
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(SearchResultItem);
