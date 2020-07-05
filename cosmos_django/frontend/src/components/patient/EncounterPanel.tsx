import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as types from '../../types/types';
import * as urlUtil from '../../util/url_util';

import Panel from '../shared/Panel';
import EncounterPanelBody from './EncounterPanelBody';
import EncounterPanelHeader from './EncounterPanelHeader';
import PanelButtonFooter from '../shared/PanelButtonFooter';

interface EncounterPanelProps {
    encounter: types.Encounter;
    profilePicture: string;
    firstName: string;
    lastName: string;
    significanceGroup: string;
    history: any;
}

class EncounterPanel extends React.Component<EncounterPanelProps, any> {
    constructor(props) {
        super(props);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleViewFullButtonClick = this.handleViewFullButtonClick.bind(
            this
        );
    }

    handleEditButtonClick() {
        const updateEncounterPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_ENCOUNTER,
            this.props.encounter.id.toString()
        );
        this.props.history.push(updateEncounterPath);
    }

    handleViewFullButtonClick() {
        const viewEncounterPath = urlUtil.getUrlPathWithId(
            urlPathConstants.VIEW_ENCOUNTER,
            this.props.encounter.id.toString()
        );
        this.props.history.push(viewEncounterPath);
    }

    render() {
        return (
            <div>
                <Panel
                    header={
                        <EncounterPanelHeader
                            title={this.props.encounter.encounterType}
                            profilePicture={this.props.profilePicture}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            significanceGroup={this.props.significanceGroup}
                        />
                    }
                    body={
                        <EncounterPanelBody note={this.props.encounter.note} />
                    }
                    footer={
                        <PanelButtonFooter
                            buttons={{
                                edit: this.handleEditButtonClick,
                                delete: null,
                                viewFull: this.handleViewFullButtonClick,
                            }}
                        />
                    }
                />
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(EncounterPanel);
