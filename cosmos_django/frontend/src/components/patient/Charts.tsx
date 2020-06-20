/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';

import * as types from '../../types/types';

import {Divider} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Medications from "./Medications";
import Timeline from "./Timeline";
import Vaccinations from "./Vaccinations";


interface ChartsProps {
    patientProfile: types.PatientProfile,
}

interface ChartsState {
    selectedTab: number,
}


class Charts extends React.Component<ChartsProps, ChartsState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 0,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.getOpenChartComponent = this.getOpenChartComponent.bind(this);
    }

    handleTabChange(event: React.SyntheticEvent, newValue: number): void {
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
                    visits={this.props.patientProfile.visits}/>;
                break;
            case 1:
                openChart = <Medications
                    medications={this.props.patientProfile.medications}/>;
                break;
            case 2:
                openChart = <Vaccinations
                    vaccinations={this.props.patientProfile.vaccinations}/>;
                break;
            default:
                openChart = <Timeline
                    visits={this.props.patientProfile.visits}/>;
        }
        return openChart;
    }

    render() {
        return (
            <div className="charts">
                <div>
                    <Tabs
                        value={this.state.selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered>
                        <Tab label="Timeline"/>
                        <Tab label="Medications"/>
                        <Tab label="Vaccinations"/>
                    </Tabs>
                </div>
                <div className="chart-content-container rounded-grey-container">
                    {this.getOpenChartComponent()}
                </div>
            </div>
        )
    }
}

export default Charts;