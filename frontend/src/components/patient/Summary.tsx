import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';

import AllergiesPanel from './AllergiesPanel';
import DiagnosesPanel from './DiagnosesPanel';
import FamilyHistoryPanel from './FamilyHistoryPanel';
import MedicationsPanel from './MedicationsPanel';
import PanelGrid from '../shared/PanelGrid';
import SocialHistoryPanel from './SocialHistoryPanel';
import VaccinationsPanel from './VaccinationsPanel';
import VitalsPanel from './VitalsPanel';

interface SummaryProps {
    user: modelTypes.User;
}

class Summary extends React.Component<SummaryProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const mainColumnChildrenPanels = [
            <DiagnosesPanel
                key={0}
                diagnoses={this.props.user.patientProfile?.diagnoses}
            />,
            <MedicationsPanel
                key={1}
                medications={this.props.user.patientProfile?.medications}
            />,
            <FamilyHistoryPanel key={2} />,
        ];

        const secondaryColumnChildrenPanels = [
            <AllergiesPanel
                key={3}
                allergies={this.props.user.patientProfile?.allergies}
            />,
            <VaccinationsPanel
                key={4}
                vaccinations={this.props.user.patientProfile?.vaccinations}
            />,
            <VitalsPanel key={5} />,
            <SocialHistoryPanel key={6} />,
        ];

        return (
            <div className="summary">
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

export default Summary;
