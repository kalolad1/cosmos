import React from 'react';
import {Link} from "react-router-dom";
import UrlPaths from "../urlPaths";


class PatientChartsNavbar extends React.Component {
    render() {
        return (
            <div className="patient-chart-navbar">
                <Link className="patient-chart-navbar-links" to={UrlPaths.TIMELINE_CHART}>Timeline</Link>
                <Link className="patient-chart-navbar-links" to={UrlPaths.MEDICATIONS_CHART}>Medications</Link>
                <Link className="patient-chart-navbar-links" to={UrlPaths.VACCINATIONS_CHART}>Vaccinations</Link>
            </div>
        )
    }
}

export default PatientChartsNavbar;