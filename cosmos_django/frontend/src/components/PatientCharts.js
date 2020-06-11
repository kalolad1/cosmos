import React from 'react';

import Timeline from "./charts/Timeline";
import Medications from "./charts/Medications";
import Vaccinations from "./charts/Vaccinations";
import Tabs from 'react-bootstrap/Tabs'
import Tab from "react-bootstrap/Tab";

class PatientCharts extends React.Component {
    render() {
        return (
            <div className="patient-charts">
                <Tabs defaultActiveKey="timeline" id="patient-charts-tabs">
                    <Tab eventKey="timeline" title="Timeline">
                        <Timeline account={this.props.account}/>
                    </Tab>
                    <Tab eventKey="medications" title="Medications">
                        <Medications account={this.props.account}/>
                    </Tab>
                    <Tab eventKey="vaccinations" title="Vaccinations">
                        <Vaccinations account={this.props.account}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default PatientCharts;