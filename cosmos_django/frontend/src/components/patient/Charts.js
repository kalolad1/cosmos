/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';

import Medications from "./Medications";
import Tab from "react-bootstrap/Tab";
import Tabs from 'react-bootstrap/Tabs'
import Timeline from "./Timeline";
import Vaccinations from "./Vaccinations";

class Charts extends React.Component {
    render() {
        return (
            <div className="patient-charts">
                <Tabs defaultActiveKey="timeline" id="patient-charts-tabs">
                    <Tab eventKey="timeline" title="Timeline">
                        <Timeline visits={this.props.patient_profile.visits}/>
                    </Tab>
                    <Tab eventKey="medications" title="Medications">
                        <Medications medications={this.props.patient_profile.medications}/>
                    </Tab>
                    <Tab eventKey="vaccinations" title="Vaccinations">
                        <Vaccinations vaccinations={this.props.patient_profile.vaccinations}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Charts;