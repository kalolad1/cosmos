import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as encounterActionCreators from '../../actions/action_creators/encounter_action_creators';
import * as userActionCreators from '../../actions/action_creators/user_action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';
import * as urlUtil from '../../util/url_util';

import Panel from '../shared/Panel';
import EncounterPanelBody from './EncounterPanelBody';
import EncounterPanelHeader from './EncounterPanelHeader';
import PanelButtonFooter from '../shared/PanelButtonFooter';

interface EncounterPanelProps {
    encounter: modelTypes.Encounter;
    profilePicture: string;
    firstName: string;
    lastName: string;
    significanceGroup: modelTypes.SignificanceGroup;
    history: any;
    dispatch: any;
}

class EncounterPanel extends React.Component<EncounterPanelProps, any> {
    constructor(props) {
        super(props);
        this.handleViewFullClick = this.handleViewFullClick.bind(this);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleViewFullClick() {
        const viewEncounterPath = urlUtil.getUrlPathWithId(
            urlPathConstants.VIEW_ENCOUNTER,
            this.props.encounter.id.toString()
        );
        this.props.history.push(viewEncounterPath);
    }

    handleEditButtonClick() {
        const updateEncounterPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_ENCOUNTER,
            this.props.encounter.id.toString()
        );
        this.props.history.push(updateEncounterPath);
    }

    handleDeleteButtonClick() {
        const self = this;
        this.props
            .dispatch(
                encounterActionCreators.deleteEncounter(this.props.encounter.id)
            )
            .then(function () {
                self.props.dispatch(userActionCreators.getUser());
            });
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
                                delete: this.handleDeleteButtonClick,
                                viewFull: this.handleViewFullClick,
                            }}
                        />
                    }
                />
            </div>
        );
    }
}

export default ReactRedux.connect()(ReactRouterDOM.withRouter(EncounterPanel));
