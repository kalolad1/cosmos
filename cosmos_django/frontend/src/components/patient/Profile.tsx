import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as types from '../../types/types';

import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PanelGrid from '../shared/PanelGrid';
import GeneralInformationPanel from './GeneralInformationPanel';

// Update panel count according to how many populate the rendered PanelGrid.
const PANEL_COUNT = 6;

interface ProfileProps {
    user: types.User,
    dispatch: any,
    history: any,
}

interface ProfileState {
    email: string,
    first_name: string,
    last_name: string,
    editMode: Array<boolean>,
    snackbarOpen: boolean,
}

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            first_name: this.props.user.patient_profile.first_name,
            last_name: this.props.user.patient_profile.last_name,
            editMode: this.initEditModeArray(),
            snackbarOpen: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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
            editMode.push(false)
        }
        return editMode;
    }

    toggleAllEditMode() {
        this.setState(prevState => ({
                editMode: prevState.editMode.map(element => !element),
            }),
            () => console.log(this.state.editMode));
    }

    toggleAllSave() {
        this.setState(prevState => ({
            editMode: prevState.editMode.map(element => !element),
        }), this.dispatchUpdateUser);
    }

    dispatchUpdateUser() {
        // TODO make a check for equality to avoid useless put request.
        const newUser = {
            email: this.state.email,
            patient_profile: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            },
        };
        this.props.dispatch(
            actionCreators.updateUser(newUser, this.props.history))
            .then(() => this.handleSnackbarOpen());
    }

    handleSnackbarOpen() {
        console.log('Opening snackbar.');
        this.setState({
            snackbarOpen: true,
        });
    }

    handleSnackbarClose() {
        console.log('Closing snackbar.');
        this.setState({
            snackbarOpen: false,
        })
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
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
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={1}
                editMode={this.state.editMode[1]}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={2}
                editMode={this.state.editMode[2]}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
        ];

        const secondaryColumnChildrenPanels = [
            <GeneralInformationPanel
                key={3}
                editMode={this.state.editMode[3]}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={4}
                editMode={this.state.editMode[5]}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={5}
                editMode={this.state.editMode[6]}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
        ];

        let toggleAllIconButton;
        if (this.state.editMode.every(Boolean)) {
            toggleAllIconButton = (
                <IconButton
                        aria-label="edit"
                        size="medium"
                        onClick={this.toggleAllSave}>
                       <SaveIcon/>
                </IconButton>
            );
        } else {
            toggleAllIconButton = (
                <IconButton
                        aria-label="edit"
                        size="medium"
                        onClick={this.toggleAllEditMode}>
                       <EditIcon/>
                </IconButton>
            );
        }

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration={4000}>
                    <Alert
                        onClose={this.handleSnackbarClose}
                        severity="success">
                        Saved!
                    </Alert>
                </Snackbar>
                <div className="profile-button-row">
                    {toggleAllIconButton}
                </div>
                <PanelGrid
                    mainColumnChildrenPanels={mainColumnChildrenPanels}
                    secondaryColumnChildrenPanels={secondaryColumnChildrenPanels}/>
            </div>
        );
    }
}

export default ReactRedux.connect()(ReactRouterDOM.withRouter(Profile));