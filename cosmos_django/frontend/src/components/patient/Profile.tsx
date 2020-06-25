import * as React from 'react';

import * as types from '../../types/types';

import PanelGrid from '../shared/PanelGrid';
import GeneralInformationPanel from "./GeneralInformationPanel";
import {IconButton} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';



interface ProfileProps {
    user: types.User,
}


class Profile extends React.Component<ProfileProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            isChanged: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setIsChanged = this.setIsChanged.bind(this);
    }

    setIsChanged() {
        this.setState({
            isChanged: this.props.user.email !== this.state.email,
        })
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

    render() {
        const mainColumnChildrenPanels = [
            <GeneralInformationPanel
                key={1}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
            <GeneralInformationPanel
                key={2}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
            <GeneralInformationPanel
                key={3}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
        ];

        const secondaryColumnChildrenPanels = [
            <GeneralInformationPanel
                key={1}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
            <GeneralInformationPanel
                key={2}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
            <GeneralInformationPanel
                key={3}
                handleInputChange={this.handleInputChange}
                email={this.state.email}/>,
        ];
        return (
            <div>
                <PanelGrid
                    mainColumnChildrenPanels={mainColumnChildrenPanels}
                    secondaryColumnChildrenPanels={secondaryColumnChildrenPanels}/>
            </div>
        );
    }
}

export default Profile;