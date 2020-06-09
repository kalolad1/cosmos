import React from 'react';
import {Switch, Route, Link, Redirect, withRouter} from 'react-router-dom';

import URL_PATHS from "../url_paths";

import Timeline from "./charts/Timeline";
import Medications from "./charts/Medications";
import Vaccinations from "./charts/Vaccinations";

class PatientCharts extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to={URL_PATHS.TIMELINE_CHART}>Timeline</Link></li>
                    <li><Link to={URL_PATHS.MEDICATIONS_CHART}>Medications</Link></li>
                    <li><Link to={URL_PATHS.VACCINATIONS_CHART}>Vaccinations</Link></li>
                </ul>

                <div>
                    <Switch>
                        <Route path={URL_PATHS.TIMELINE_CHART}>
                            <Timeline account={this.props.account}/>
                        </Route>
                        <Route path={URL_PATHS.MEDICATIONS_CHART}>
                            <Medications account={this.props.account}/>
                        </Route>
                        <Route path={URL_PATHS.VACCINATIONS_CHART}>
                            <Vaccinations account={this.props.account}/>
                        </Route>
                        <Redirect from={URL_PATHS.HOME} to={URL_PATHS.TIMELINE_CHART}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(PatientCharts);