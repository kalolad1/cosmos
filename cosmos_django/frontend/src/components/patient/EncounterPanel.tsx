import * as React from 'react';

import * as types from '../../types/types';

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
}

class EncounterPanel extends React.Component<EncounterPanelProps, any> {
    constructor(props) {
        super(props);
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
                    footer={<PanelButtonFooter buttons={{ viewFull: null }} />}
                />
            </div>
        );
    }
}

export default EncounterPanel;
