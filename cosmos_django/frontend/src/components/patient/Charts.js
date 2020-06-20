/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Medications from "./Medications";
import Timeline from "./Timeline";
import Vaccinations from "./Vaccinations";


class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.getOpenChartComponent = this.getOpenChartComponent.bind(this);
    }

    handleTabChange(event, newValue) {
        this.setState({
            ...this.state,
            selectedTab: newValue,
        });
    }

    getOpenChartComponent() {
        let openChart;
        switch(this.state.selectedTab) {
            case 0:
                openChart = <Timeline
                    visits={this.props.patient_profile.visits}/>;
                break;
            case 1:
                openChart = <Medications
                    medications={this.props.patient_profile.medications}/>;
                break;
            case 2:
                openChart = <Vaccinations
                    vaccinations={this.props.patient_profile.vaccinations}/>;
                break;
            default:
                openChart = <Timeline
                    visits={this.props.patient_profile.visits}/>;
        }
        return openChart;
    }

    render() {
        return (
            <div className="patient-charts">
                <div className="rounded-grey-container">
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Timeline"/>
                        <Tab label="Medications"/>
                        <Tab label="Vaccinations"/>
                    </Tabs>
                </div>
                <div>
                    {this.getOpenChartComponent()}
                </div>
            </div>
        )
    }
}

export default Charts;