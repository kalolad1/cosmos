import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as userActionCreators from '../../actions/action_creators/user_action_creators';
import * as modelTypes from '../../types/modelTypes';

import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PanelGrid from '../shared/PanelGrid';

import GeneralInformationPanel from './GeneralInformationPanel';
import ContactInformationPanel from './ContactInformationPanel';
import DemographicInformationPanel from './DemographicInformationPanel';
import PaymentInformationPanel from './PaymentInformationPanel';
import PrescriptionInformationPanel from './PrescriptionInformationPanel';

// Update panel count according to how many populate the rendered PanelGrid.
const PANEL_COUNT = 5;

interface ProfileProps {
    user: modelTypes.User;
    dispatch: any;
    history: any;
    successUpdateUser: any;
    errorUpdateUser: any;
}

interface ProfileState {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    addressLine: string;
    city: string;
    state: string;
    zipCode: string;
    race: string;
    ethnicity: string;
    religion: string;
    insurance: string;
    pharmacy: string;
    editMode: Array<boolean>;
    snackbarOpen: boolean;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            firstName: this.props.user.patientProfile!.firstName,
            lastName: this.props.user.patientProfile!.lastName,
            dateOfBirth: new Date(this.props.user.patientProfile!.dateOfBirth),
            phoneNumber: this.props.user.patientProfile!.phoneNumber,
            addressLine: this.props.user.patientProfile!.address.addressLine,
            city: this.props.user.patientProfile!.address.city,
            state: this.props.user.patientProfile!.address.state,
            zipCode: this.props.user.patientProfile!.address.zipCode,
            race: this.props.user.patientProfile!.race,
            ethnicity: this.props.user.patientProfile!.ethnicity,
            religion: this.props.user.patientProfile!.religion,
            insurance: this.props.user.patientProfile!.insurance,
            pharmacy: this.props.user.patientProfile!.pharmacy,
            editMode: this.initEditModeArray(),
            snackbarOpen: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.initEditModeArray = this.initEditModeArray.bind(this);
        this.toggleAllEditMode = this.toggleAllEditMode.bind(this);
        this.toggleAllSave = this.toggleAllSave.bind(this);
        this.dispatchUpdateUser = this.dispatchUpdateUser.bind(this);
        this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    initEditModeArray(): Array<boolean> {
        let editMode: Array<boolean> = [];
        for (let i = 0; i < PANEL_COUNT; i++) {
            editMode.push(false);
        }
        return editMode;
    }

    toggleAllEditMode() {
        this.setState((prevState) => ({
            editMode: prevState.editMode.map((element) => !element),
        }));
    }

    toggleAllSave() {
        this.setState(
            (prevState) => ({
                editMode: prevState.editMode.map((element) => !element),
            }),
            this.dispatchUpdateUser
        );
    }

    dispatchUpdateUser() {
        // TODO make a check for equality to avoid useless put request.
        const self = this;
        const newUser = {
            id: this.props.user.id,
            email: this.state.email,
            patientProfile: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dateOfBirth: this.state.dateOfBirth,
                phoneNumber: this.state.phoneNumber,
                address: {
                    addressLine: this.state.addressLine,
                    city: this.state.city,
                    state: this.state.state,
                    zipCode: this.state.zipCode,
                },
                race: this.state.race,
                ethnicity: this.state.ethnicity,
                religion: this.state.religion,
                insurance: this.state.insurance,
                pharmacy: this.state.pharmacy,
            },
        };
        this.props
            .dispatch(userActionCreators.updateUser(newUser))
            .then(function () {
                self.handleSnackbarOpen();
            });
    }

    handleSnackbarOpen() {
        this.setState({
            snackbarOpen: true,
        });
    }

    handleSnackbarClose() {
        this.setState({
            snackbarOpen: false,
        });
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleDateChange(date: Date | null): void {
        this.setState({
            dateOfBirth: date!,
        });
    }

    handlePhoneNumberChange(value: string): void {
        this.setState({
            phoneNumber: value,
        });
    }

    render() {
        // Each child panel must be given a unique key. The key identifies which
        // panel is in edit mode.
        const mainColumnChildrenPanels = [
            <GeneralInformationPanel
                key={0}
                editMode={this.state.editMode[0]}
                handleInputChange={this.handleInputChange}
                handleDateChange={this.handleDateChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                dateOfBirth={this.state.dateOfBirth}
            />,
            <PaymentInformationPanel
                key={1}
                editMode={this.state.editMode[1]}
                handleInputChange={this.handleInputChange}
                insurance={this.state.insurance}
            />,
            <PrescriptionInformationPanel
                key={2}
                editMode={this.state.editMode[2]}
                handleInputChange={this.handleInputChange}
                pharmacy={this.state.pharmacy}
            />,
        ];

        const secondaryColumnChildrenPanels = [
            <ContactInformationPanel
                key={3}
                editMode={this.state.editMode[3]}
                handleInputChange={this.handleInputChange}
                handlePhoneNumberChange={this.handlePhoneNumberChange}
                email={this.state.email}
                phoneNumber={this.state.phoneNumber}
                addressLine={this.state.addressLine}
                city={this.state.city}
                state={this.state.state}
                zipCode={this.state.zipCode}
            />,
            <DemographicInformationPanel
                key={4}
                editMode={this.state.editMode[4]}
                handleInputChange={this.handleInputChange}
                race={this.state.race}
                ethnicity={this.state.ethnicity}
                religion={this.state.religion}
            />,
        ];

        let toggleAllIconButton;
        if (this.state.editMode.every(Boolean)) {
            toggleAllIconButton = (
                <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={this.toggleAllSave}
                >
                    <SaveIcon />
                </IconButton>
            );
        } else {
            toggleAllIconButton = (
                <IconButton
                    aria-label="edit"
                    size="medium"
                    onClick={this.toggleAllEditMode}
                >
                    <EditIcon />
                </IconButton>
            );
        }
        let alert;
        if (Object.keys(this.props.errorUpdateUser).length !== 0) {
            alert = (
                <Alert onClose={this.handleSnackbarClose} severity="error">
                    {this.props.errorUpdateUser.userFacingMessage}
                </Alert>
            );
        } else if (Object.keys(this.props.successUpdateUser !== 0)) {
            alert = (
                <Alert onClose={this.handleSnackbarClose} severity="success">
                    {this.props.successUpdateUser.userFacingMessage}
                </Alert>
            );
        }

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration={10000}
                >
                    {alert}
                </Snackbar>
                <div className="profile-button-row">{toggleAllIconButton}</div>
                <PanelGrid
                    mainColumnChildrenPanels={mainColumnChildrenPanels}
                    secondaryColumnChildrenPanels={
                        secondaryColumnChildrenPanels
                    }
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorUpdateUser: state.UIMessages.errorUpdateUser,
        successUpdateUser: state.UIMessages.successUpdateUser,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(Profile)
);
