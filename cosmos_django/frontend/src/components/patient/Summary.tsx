import * as React from 'react';

import * as types from '../../types/types';

import DiagnosesPanel from './DiagnosesPanel';
import PanelGrid from '../shared/PanelGrid';

interface SummaryProps {
    user: types.User;
}

class Summary extends React.Component<SummaryProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const mainColumnChildrenPanels = [
            <DiagnosesPanel
                key={0}
                diagnoses={this.props.user.patientProfile.diagnoses}
            />,
        ];

        const secondaryColumnChildrenPanels = [
            <DiagnosesPanel
                key={1}
                diagnoses={this.props.user.patientProfile.diagnoses}
            />,
        ];

        return (
            <PanelGrid
                mainColumnChildrenPanels={mainColumnChildrenPanels}
                secondaryColumnChildrenPanels={secondaryColumnChildrenPanels}
            />
        );
    }
}

export default Summary;
