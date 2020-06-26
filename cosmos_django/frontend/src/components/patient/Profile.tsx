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


interface ProfileProps {
    user: types.User,
    dispatch: any,
    history: any,
}

interface ProfileState {
    email: string,
    first_name: string,
    last_name: string,
}


class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email!,
            first_name: this.props.user.patient_profile!.first_name,
            last_name: this.props.user.patient_profile!.last_name,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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
                <div className="profile-button-row">
                    <IconButton aria-label="edit" size="medium">
                        <EditIcon/>
                    </IconButton>
                </div>
                <PanelGrid
                    mainColumnChildrenPanels={mainColumnChildrenPanels}
                    secondaryColumnChildrenPanels={secondaryColumnChildrenPanels}/>
            </div>
        );
    }
}

export default ReactRedux.connect()(ReactRouterDOM.withRouter(Profile));