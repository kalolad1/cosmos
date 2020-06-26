import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as types from '../../types/types';

import PanelGrid from '../shared/PanelGrid';
import GeneralInformationPanel from './GeneralInformationPanel';
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";


interface ProfileProps {
    user: types.User,
    dispatch: any,
    history: any,
}

interface ProfileState {
    email: string,
    first_name: string,
    last_name: string,
    isChanged: boolean,
    isSavingSnackBarOpen: boolean,
}


class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email!,
            first_name: this.props.user.patient_profile!.first_name,
            last_name: this.props.user.patient_profile!.last_name,
            isChanged: false,
            isSavingSnackBarOpen: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setIsChanged = this.setIsChanged.bind(this);
        this.handleSavingSnackBarClose = this.handleSavingSnackBarClose.bind(this);
    }

    setIsChanged() {
        const didInputChanged = (
            this.props.user.email !== this.state.email ||
            this.props.user.patient_profile!.first_name !== this.state.first_name ||
            this.props.user.patient_profile!.last_name !== this.state.last_name
        );
        this.setState({
            isChanged: didInputChanged,
            isSavingSnackBarOpen: true,
        }, () => {
            const newUser = {
                email: this.state.email,
                patient_profile: {
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                },
            };
            this.props.dispatch(
                actionCreators.updateUser(newUser, this.props.history))
        });
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        }, () => {
            this.setIsChanged();
        });
    }

    handleSavingSnackBarClose(event?: React.SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            isSavingSnackBarOpen: false,
        });
    }

    render() {
        const mainColumnChildrenPanels = [
            <GeneralInformationPanel
                key={1}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={2}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={3}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
        ];

        const secondaryColumnChildrenPanels = [
            <GeneralInformationPanel
                key={1}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={2}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
            <GeneralInformationPanel
                key={3}
                handleInputChange={this.handleInputChange}
                email={this.state.email}
                first_name={this.state.first_name}
                last_name={this.state.last_name}/>,
        ];
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.isSavingSnackBarOpen}
                    onClose={this.handleSavingSnackBarClose}
                    autoHideDuration={3000}>
                    <Alert severity="success">
                        Saving...
                    </Alert>
                </Snackbar>
                <PanelGrid
                    mainColumnChildrenPanels={mainColumnChildrenPanels}
                    secondaryColumnChildrenPanels={secondaryColumnChildrenPanels}/>
            </div>
        );
    }
}

export default ReactRedux.connect()(ReactRouterDOM.withRouter(Profile));