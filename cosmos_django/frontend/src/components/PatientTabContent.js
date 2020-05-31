import React from 'react'

import DemographicsTab from "./DemographicsTab";
import MedicationsTab from "./MedicationsTab";
import TimelineTab from "./TimelineTab";


class PatientTabContent extends React.Component {
    render() {
        return (
            <div className="tab-content">
                <TimelineTab patientProfile={this.props.patientProfile}/>
                <MedicationsTab />
                <DemographicsTab />
            </div>
        )
    }
}

export default PatientTabContent;