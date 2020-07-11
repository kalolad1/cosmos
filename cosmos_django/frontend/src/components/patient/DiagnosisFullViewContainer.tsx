import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as modelTypes from '../../types/modelTypes';
import * as diagnosisActionCreators from '../../actions/action_creators/diagnosis_action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as formConstants from '../../constants/form_constants';
import DiagnosisFullView from './DiagnosisFullView';

interface DiagnosisFullViewContainerProps {
    mode: string;
    match: any;
    diagnoses: Array<modelTypes.Diagnosis>;
    history: any;
    dispatch: any;
}

class DiagnosisFullViewContainer extends React.Component<
    DiagnosisFullViewContainerProps,
    any
> {
    constructor(props) {
        super(props);
        let diagnosis;
        if (this.props.match.params.hasOwnProperty('id')) {
            diagnosis = this.getDiagnosis(this.props.match.params.id);
        }

        this.state = {
            name: diagnosis?.name || '',
            description: diagnosis?.description || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDiagnosis = this.getDiagnosis.bind(this);
        this.handleAddDiagnosisSubmit = this.handleAddDiagnosisSubmit.bind(
            this
        );
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateDiagnosisSubmit = this.handleUpdateDiagnosisSubmit.bind(
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

    handleAddDiagnosisSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                diagnosisActionCreators.addDiagnosis(
                    this.state.name,
                    this.state.description
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    handleUpdateDiagnosisSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                diagnosisActionCreators.updateDiagnosis(
                    this.props.match.params.id,
                    this.state.name,
                    this.state.description
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    getDiagnosis(id: number) {
        // Need to refactor encounter representation into dict to allow for hash
        // search.
        for (let i = 0; i < this.props.diagnoses.length; i++) {
            if (this.props.diagnoses[i].id == id) {
                return this.props.diagnoses[i];
            }
        }
        return null;
    }

    render() {
        let handleSubmit;
        if (this.props.mode == formConstants.FormModes.CREATE) {
            handleSubmit = this.handleAddDiagnosisSubmit;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateDiagnosisSubmit;
        }

        let fullDiagnosisView = (
            <DiagnosisFullView
                mode={this.props.mode}
                name={this.state.name}
                description={this.state.description}
                handleSubmit={handleSubmit}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleClose={this.handleClose}
            />
        );

        return <div>{fullDiagnosisView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        diagnoses: state.user.patientProfile.diagnoses,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(DiagnosisFullViewContainer)
);
