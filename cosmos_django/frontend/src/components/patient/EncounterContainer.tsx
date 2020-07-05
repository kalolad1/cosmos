import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as types from '../../types/types';
import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as formConstants from '../../constants/form_constants';

import EncounterFullView from './EncounterFullView';

interface EncounterContainerProps {
    mode: string;
    match: any;
    encounters: Array<types.Encounter>;
    history: any;
    dispatch: any;
}

class EncounterContainer extends React.Component<EncounterContainerProps, any> {
    constructor(props) {
        super(props);
        let encounter;
        if (this.props.match.params.hasOwnProperty('id')) {
            encounter = this.getEncounter(this.props.match.params.id);
        }
        this.state = {
            encounterType: encounter?.encounterType || '',
            note: encounter?.note || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getEncounter = this.getEncounter.bind(this);
        this.handleAddEncounterSubmit = this.handleAddEncounterSubmit.bind(
            this
        );
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateEncounterSubmit = this.handleUpdateEncounterSubmit.bind(
            this
        );
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

    handleAddEncounterSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.addEncounter(
                    this.state.encounterType,
                    this.state.note,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.TIMELINE);
            });
    }

    handleUpdateEncounterSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.updateEncounter(
                    this.props.match.params.id,
                    this.state.encounterType,
                    this.state.note,
                    this.props.history
                )
            )
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
            handleSubmit = this.handleAddEncounterSubmit;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateEncounterSubmit;
        }

        let fullEncounterView = (
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
    ReactRouterDOM.withRouter(EncounterContainer)
);
