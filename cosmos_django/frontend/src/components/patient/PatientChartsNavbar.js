import React from 'react';
import {Link} from "react-router-dom";
import Url_paths from "../url_paths";


class PatientChartsNavbar extends React.Component {
    render() {
        return (
            <div className="patient-chart-navbar">
                <Link className="patient-chart-navbar-links" to={Url_paths.TIMELINE_CHART}>Timeline</Link>
                <Link className="patient-chart-navbar-links" to={Url_paths.MEDICATIONS_CHART}>Medications</Link>
                <Link className="patient-chart-navbar-links" to={Url_paths.VACCINATIONS_CHART}>Vaccinations</Link>
            </div>
        )
    }
}

export default PatientChartsNavbar;