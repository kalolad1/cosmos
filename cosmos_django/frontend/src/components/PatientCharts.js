import React from 'react';
import {Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';

import UrlPaths from "../urlPaths";

import Timeline from "./charts/Timeline";
import Medications from "./charts/Medications";
import Vaccinations from "./charts/Vaccinations";

class PatientCharts extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to={UrlPaths.TIMELINE_CHART}>Timeline</Link></li>
                    <li><Link to={UrlPaths.MEDICATIONS_CHART}>Medications</Link></li>
                    <li><Link to={UrlPaths.VACCINATIONS_CHART}>Vaccinations</Link></li>
                </ul>

                <div>
                    <Switch>
                        <Route path={UrlPaths.TIMELINE_CHART}>
                            <Timeline account={this.props.account}/>
                        </Route>
                        <Route path={UrlPaths.MEDICATIONS_CHART}>
                            <Medications account={this.props.account}/>
                        </Route>
                        <Route path={UrlPaths.VACCINATIONS_CHART}>
                            <Vaccinations account={this.props.account}/>
                        </Route>
                        <Redirect from={UrlPaths.HOME} to={UrlPaths.TIMELINE_CHART}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(PatientCharts);