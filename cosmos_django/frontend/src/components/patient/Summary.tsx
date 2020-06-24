import * as React from 'react';

import * as types from '../../types/types';

import PanelGrid from '../shared/PanelGrid';


interface SummaryProps {
    patientProfile: types.PatientProfile,
}


class Summary extends React.Component<SummaryProps, any> {
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

export default Summary;