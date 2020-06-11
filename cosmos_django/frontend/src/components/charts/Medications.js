import React from "react";
import Medication from "./Medication";

class Medications extends React.Component {
    render() {
        const medications = this.props.account.patient_profile.medications.map(function (medicationData) {
            return <Medication data={medicationData} key={medicationData.id}/>
        });
        return (
            <div className="patient-chart-content-container">
                {medications}
            </div>
        );
    }
}

export default Medications;