import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';

import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import * as textUtil from '../../util/text_util';

interface EncounterPanelHeaderProps {
    title: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    significanceGroup: string;
}

class EncounterPanelHeader extends React.Component<
    EncounterPanelHeaderProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel-header">
                <PanelHeaderMetadata
                    title={this.props.title}
                    significanceGroup={this.props.significanceGroup}
                />
                <Avatar
                    alt={textUtil.createFullName(
                        this.props.firstName,
                        this.props.lastName
                    )}
                    src={this.props.profilePicture}
                    className="encounter-panel-avatar"
                >
                    {textUtil.getInitials(
                        this.props.firstName,
                        this.props.lastName
                    )}
                </Avatar>
            </div>
        );
    }
}

export default EncounterPanelHeader;
