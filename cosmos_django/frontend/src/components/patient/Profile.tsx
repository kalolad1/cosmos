import * as React from 'react';

import * as types from '../../types/types';

import PanelGrid from '../shared/PanelGrid';
import GeneralInformationPanel from "./GeneralInformationPanel";


interface ProfileProps {
    user: types.User,
}

const mainColumnChildrenPanels = [
    <GeneralInformationPanel key={1}/>,
    <GeneralInformationPanel key={2}/>,
    <GeneralInformationPanel key={3}/>,
];

const secondaryColumnChildrenPanels = [
    <GeneralInformationPanel key={1}/>,
    <GeneralInformationPanel key={2}/>,
    <GeneralInformationPanel key={3}/>,
];


class Profile extends React.Component<ProfileProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
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