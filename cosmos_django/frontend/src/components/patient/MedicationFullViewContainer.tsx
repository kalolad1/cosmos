import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as types from '../../types/types';
import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as formConstants from '../../constants/form_constants';

import MedicationFullView from './MedicationFullView';

interface MedicationFullViewContainerProps {
    mode: string;
    match: any;
    medications: Array<types.Medication>;
    history: any;
    dispatch: any;
}

class MedicationFullViewContainer extends React.Component<
    MedicationFullViewContainerProps,
    any
> {
    constructor(props) {
        super(props);
        let medication;
        if (this.props.match.params.hasOwnProperty('id')) {
            medication = this.getMedication(this.props.match.params.id);
        }

        this.state = {
            name: medication?.name || '',
            description: medication?.description || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getMedication = this.getMedication.bind(this);
        this.handleAddMedicationSubmit = this.handleAddMedicationSubmit.bind(
            this
        );
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateMedicationSubmit = this.handleUpdateMedicationSubmit.bind(
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

    handleAddMedicationSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.addMedication(
                    this.state.name,
                    this.state.description,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    handleUpdateMedicationSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.updateMedication(
                    this.props.match.params.id,
                    this.state.name,
                    this.state.description,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    getMedication(id: number) {
        // Need to refactor medications representation into dict to allow for hash
        // search.
        for (let i = 0; i < this.props.medications.length; i++) {
            if (this.props.medications[i].id == id) {
                return this.props.medications[i];
            }
        }
        return null;
    }

    render() {
        let handleSubmit;
        if (this.props.mode == formConstants.FormModes.CREATE) {
            handleSubmit = this.handleAddMedicationSubmit;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateMedicationSubmit;
        }

        let fullMedicationView = (
            <MedicationFullView
                mode={this.props.mode}
                name={this.state.name}
                description={this.state.description}
                handleSubmit={handleSubmit}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleClose={this.handleClose}
            />
        );

        return <div>{fullMedicationView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        medications: state.user.patientProfile.medications,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(MedicationFullViewContainer)
);
