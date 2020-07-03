import * as React from 'react';

import * as types from '../../types/types';

import DiagnosesPanel from './DiagnosesPanel';
import PanelGrid from '../shared/PanelGrid';
import MedicationsPanel from './MedicationsPanel';
import AllergiesPanel from './AllergiesPanel';

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
            <MedicationsPanel
                key={1}
                medications={this.props.user.patientProfile.medications}
            />,
        ];

        const secondaryColumnChildrenPanels = [
            <AllergiesPanel
                key={2}
                allergies={this.props.user.patientProfile.allergies}
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
