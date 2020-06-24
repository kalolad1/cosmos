import * as React from 'react';

import * as types from '../../types/types';

import PanelGrid from '../shared/PanelGrid';


interface ProfileProps {
    patientProfile: types.PatientProfile,
}


class Profile extends React.Component<ProfileProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PanelGrid patientProfile={this.props.patientProfile}/>
            </div>
        );
    }
}

export default Profile;