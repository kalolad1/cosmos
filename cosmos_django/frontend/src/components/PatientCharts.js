import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import URL_PATHS from "../url_paths";

import Timeline from "./charts/Timeline";
import Medications from "./charts/Medications";
import Vaccinations from "./charts/Vaccinations";

class PatientCharts extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <Link to={URL_PATHS.TIMELINE_CHART} className="nav-item nav-link active" id="nav-timeline-tab"
                              data-toggle="tab"
                              role="tab" aria-controls="nav-timeline" aria-selected="true">Timeline</Link>
                        <Link to={URL_PATHS.MEDICATIONS_CHART} className="nav-item nav-link" id="nav-medications-tab"
                              data-toggle="tab"
                              role="tab" aria-controls="nav-medications" aria-selected="false">Medications</Link>
                        <Link to={URL_PATHS.VACCINATIONS_CHART} className="nav-item nav-link" id="nav-vaccinations-tab"
                              data-toggle="tab"
                              role="tab" aria-controls="nav-vaccinations" aria-selected="false">Vaccinations</Link>
                    </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                    <Switch>
                        <Route path={URL_PATHS.TIMELINE_CHART}>
                            <Timeline/>
                        </Route>
                        <Route path={URL_PATHS.MEDICATIONS_CHART}>
                            <Medications/>
                        </Route>
                        <Route path={URL_PATHS.VACCINATIONS_CHART}>
                            <Vaccinations/>
                        </Route>
                        <Route>
                            <Timeline/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default PatientCharts;