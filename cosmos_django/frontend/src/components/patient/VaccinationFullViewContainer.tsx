import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as types from '../../types/types';
import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as formConstants from '../../constants/form_constants';
import VaccinationFullView from './VaccinationFullView';

interface VaccinationFullViewContainerProps {
    mode: string;
    match: any;
    vaccinations: Array<types.Vaccination>;
    history: any;
    dispatch: any;
}

class VaccinationFullViewContainer extends React.Component<
    VaccinationFullViewContainerProps,
    any
> {
    constructor(props) {
        super(props);
        let vaccination;
        if (this.props.match.params.hasOwnProperty('id')) {
            vaccination = this.getVaccination(this.props.match.params.id);
        }

        this.state = {
            name: vaccination?.name || '',
            description: vaccination?.description || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getVaccination = this.getVaccination.bind(this);
        this.handleAddVaccinationSubmit = this.handleAddVaccinationSubmit.bind(
            this
        );
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateVaccinationSubmit = this.handleUpdateVaccinationSubmit.bind(
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

    handleAddVaccinationSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.addVaccination(
                    this.state.name,
                    this.state.description,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    handleUpdateVaccinationSubmit(event) {
        event.preventDefault();
        const self = this;
        this.props
            .dispatch(
                actionCreators.updateVaccination(
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

    getVaccination(id: number) {
        // Need to refactor encounter representation into dict to allow for hash
        // search.
        for (let i = 0; i < this.props.vaccinations.length; i++) {
            if (this.props.vaccinations[i].id == id) {
                return this.props.vaccinations[i];
            }
        }
        return null;
    }

    render() {
        let handleSubmit;
        if (this.props.mode == formConstants.FormModes.CREATE) {
            handleSubmit = this.handleAddVaccinationSubmit;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateVaccinationSubmit;
        }

        let fullVaccinationView = (
            <VaccinationFullView
                mode={this.props.mode}
                name={this.state.name}
                description={this.state.description}
                handleSubmit={handleSubmit}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleClose={this.handleClose}
            />
        );

        return <div>{fullVaccinationView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        vaccinations: state.user.patientProfile.vaccinations,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(VaccinationFullViewContainer)
);
