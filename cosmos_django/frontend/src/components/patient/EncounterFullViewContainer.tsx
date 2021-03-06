import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as encounterActionCreators from '../../actions/action_creators/encounter_action_creators';
import * as formConstants from '../../constants/form_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import EncounterFullView from './EncounterFullView';

interface EncounterContainerProps {
    mode: string;
    match: any;
    encounters: Array<modelTypes.Encounter>;
    history: any;
    dispatch: any;
}

class EncounterFullViewContainer extends React.Component<
    EncounterContainerProps,
    any
> {
    constructor(props) {
        super(props);
        let encounter;
        const params = this.props.match.params;
        if (Object.prototype.hasOwnProperty.call(params, 'id')) {
            encounter = this.getEncounter(this.props.match.params.id);
        }

        this.state = {
            encounterType: encounter?.encounterType || '',
            note: encounter?.note || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddEncounter = this.handleAddEncounter.bind(this);
        this.handleUpdateEncounter = this.handleUpdateEncounter.bind(this);
        this.getEncounter = this.getEncounter.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const element = event.target;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleClose(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleAddEncounter(event) {
        event.preventDefault();
        const self = this;

        const newEncounter: modelTypes.EncounterConstructor = {
            encounterType: this.state.encounterType,
            note: this.state.note,
        };
        this.props
            .dispatch(encounterActionCreators.addEncounter(newEncounter))
            .then(function () {
                self.props.history.replace(urlPathConstants.TIMELINE);
            });
    }

    handleUpdateEncounter(event) {
        event.preventDefault();
        const self = this;
        const updatedEncounter: modelTypes.EncounterUpdate = {
            id: this.props.match.params.id,
            encounterType: this.state.encounterType,
            note: this.state.note,
        };
        this.props
            .dispatch(encounterActionCreators.updateEncounter(updatedEncounter))
            .then(function () {
                self.props.history.replace(urlPathConstants.TIMELINE);
            });
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
        let handleSubmit;
        if (this.props.mode == formConstants.FormModes.CREATE) {
            handleSubmit = this.handleAddEncounter;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateEncounter;
        }

        const fullEncounterView = (
            <EncounterFullView
                mode={this.props.mode}
                encounterType={this.state.encounterType}
                note={this.state.note}
                handleSubmit={handleSubmit}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleClose={this.handleClose}
            />
        );

        return <div>{fullEncounterView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        encounters: state.user.patientProfile.encounters,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(EncounterFullViewContainer)
);
