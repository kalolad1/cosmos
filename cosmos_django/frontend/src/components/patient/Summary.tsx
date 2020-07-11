import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';

import DiagnosesPanel from './DiagnosesPanel';
import PanelGrid from '../shared/PanelGrid';
import MedicationsPanel from './MedicationsPanel';
import AllergiesPanel from './AllergiesPanel';
import VaccinationsPanel from './VaccinationsPanel';
import FamilyHistoryPanel from './FamilyHistoryPanel';
import VitalsPanel from './VitalsPanel';
import SocialHistoryPanel from './SocialHistoryPanel';

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
                diagnoses={this.props.user.patientProfile!.diagnoses}
            />,
            <MedicationsPanel
                key={1}
                medications={this.props.user.patientProfile!.medications}
            />,
            <FamilyHistoryPanel key={2} />,
        ];

        const secondaryColumnChildrenPanels = [
            <AllergiesPanel
                key={3}
                allergies={this.props.user.patientProfile!.allergies}
            />,
            <VaccinationsPanel
                key={4}
                vaccinations={this.props.user.patientProfile!.vaccinations}
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
