import * as React from 'react';

import * as types from '../../types/types';

import Panel from '../shared/Panel';
import EncounterPanelBody from './EncounterPanelBody';
import EncounterPanelHeader from './EncounterPanelHeader';
import EncounterPanelFooter from './EncounterPanelFooter';

interface EncounterPanelProps {
    encounter: types.Encounter;
    profilePicture: string;
    firstName: string;
    lastName: string;
    significanceBand: string;
}

class EncounterPanel extends React.Component<EncounterPanelProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel">
                <Panel
                    header={
                        <EncounterPanelHeader
                            title={this.props.encounter.encounterType}
                            profilePicture={this.props.profilePicture}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            significanceBand={this.props.significanceBand}
                        />
                    }
                    body={
                        <EncounterPanelBody note={this.props.encounter.note} />
                    }
                    footer={<EncounterPanelFooter />}
                />
            </div>
        );
    }
}

export default EncounterPanel;
