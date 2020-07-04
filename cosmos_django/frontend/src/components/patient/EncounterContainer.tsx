import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as types from '../../types/types';

import EncounterFullView from './EncounterFullView';

interface EncounterContainerProps {
    mode: string;
    match: any;
    encounters: Array<types.Encounter>;
}

class EncounterContainer extends React.Component<EncounterContainerProps, any> {
    constructor(props) {
        super(props);
        this.getEncounter = this.getEncounter.bind(this);
    }

    getEncounter(id: number) {
        // Need to refactor encounter representation into dict to allow for hash
        // search.
        for (let i = 0; i < this.props.encounters.length; i++) {
            if (this.props.encounters[i].id == id) {
                return this.props.encounters[i];
            }
        }
        return null;
    }

    render() {
        let fullEncounterView;
        if (this.props.match.params.hasOwnProperty('id')) {
            fullEncounterView = (
                <EncounterFullView
                    mode={this.props.mode}
                    encounter={this.getEncounter(this.props.match.params.id)!}
                />
            );
        } else {
            fullEncounterView = <EncounterFullView mode={this.props.mode} />;
        }
        return <div>{fullEncounterView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        encounters: state.user.patientProfile.encounters,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(EncounterContainer)
);
