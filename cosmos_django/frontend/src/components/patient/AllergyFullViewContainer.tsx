import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as allergyActionCreators from '../../actions/action_creators/allergy_action_creators';
import * as formConstants from '../../constants/form_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import AllergyFullView from './AllergyFullView';

interface AllergyFullViewContainerProps {
    mode: string;
    match: any;
    allergies: Array<modelTypes.Allergy>;
    history: any;
    dispatch: any;
}

class AllergyFullViewContainer extends React.Component<
    AllergyFullViewContainerProps,
    any
> {
    constructor(props) {
        super(props);
        let allergy;
        const params = this.props.match.params;
        if (Object.prototype.hasOwnProperty.call(params, 'id')) {
            allergy = this.getAllergy(this.props.match.params.id);
        }

        this.state = {
            name: allergy?.name || '',
            description: allergy?.description || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getAllergy = this.getAllergy.bind(this);
        this.handleAddAllergySubmit = this.handleAddAllergySubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdateAllergySubmit = this.handleUpdateAllergySubmit.bind(
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

    handleAddAllergySubmit(event) {
        event.preventDefault();
        const self = this;
        const newAllergy: modelTypes.AllergyConstructor = {
            name: this.state.name,
            description: this.state.description,
        };
        this.props
            .dispatch(allergyActionCreators.addAllergy(newAllergy))
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    handleUpdateAllergySubmit(event) {
        event.preventDefault();
        const self = this;
        const updatedAllergy: modelTypes.AllergyUpdate = {
            id: this.props.match.params.id,
            name: this.state.name,
            description: this.state.description,
        };
        this.props
            .dispatch(allergyActionCreators.updateAllergy(updatedAllergy))
            .then(function () {
                self.props.history.replace(urlPathConstants.SUMMARY);
            });
    }

    getAllergy(id: number) {
        // Need to refactor encounter representation into dict to allow for hash
        // search.
        for (let i = 0; i < this.props.allergies.length; i++) {
            if (this.props.allergies[i].id == id) {
                return this.props.allergies[i];
            }
        }
        return null;
    }

    render() {
        let handleSubmit;
        if (this.props.mode == formConstants.FormModes.CREATE) {
            handleSubmit = this.handleAddAllergySubmit;
        } else if (this.props.mode == formConstants.FormModes.UPDATE) {
            handleSubmit = this.handleUpdateAllergySubmit;
        }

        const fullAllergyView = (
            <AllergyFullView
                mode={this.props.mode}
                name={this.state.name}
                description={this.state.description}
                handleSubmit={handleSubmit}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleClose={this.handleClose}
            />
        );

        return <div>{fullAllergyView}</div>;
    }
}

function mapStateToProps(state) {
    return {
        allergies: state.user.patientProfile.allergies,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(AllergyFullViewContainer)
);
