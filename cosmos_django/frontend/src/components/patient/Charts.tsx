/* Contains all the charts of the patient, organized in tabs. */
import * as React from 'react';

import * as types from '../../types/types';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Profile from './Profile';
import Summary from './Summary';
import Timeline from './Timeline';


interface ChartsProps {
    user: types.User,
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
        switch (this.state.selectedTab) {
            case 0:
                openChart = <Summary user={this.props.user}/>;
                break;
            case 1:
                openChart = <Timeline
                    encounters={this.props.user!.patientProfile!.encounters}/>;
                break;
            case 2:
                openChart = <Profile user={this.props.user}/>;
                break;
            default:
                openChart = <Summary user={this.props.user}/>;
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
                        <Tab label="Summary"/>
                        <Tab label="Timeline"/>
                        <Tab label="Profile"/>
                    </Tabs>
                </div>
                <div className="chart-content-container">
                    {this.getOpenChartComponent()}
                </div>
            </div>
        )
    }
}

export default Charts;