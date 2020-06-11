import React from "react";
import Vaccination from "./Vaccination";

class Vaccinations extends React.Component {
    render() {
        const vaccinations = this.props.account.patient_profile.vaccinations.map(function (vaccinationData) {
            return <Vaccination data={vaccinationData} key={vaccinationData.id}/>
        });
        return (
            <div className="patient-chart-content-container">
                {vaccinations}
            </div>
        );
    }
}

export default Vaccinations;