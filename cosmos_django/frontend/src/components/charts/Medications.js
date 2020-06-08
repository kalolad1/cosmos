import React from "react";
import Medication from "./Medication";

class Medications extends React.Component {
    render() {
        try {
            const medications = this.props.account.patient_profile.medications.map(function (medicationData) {
                return <Medication data={medicationData} key={medicationData.id}/>
            });
            return (
                <div className="tab-pane fade show active" id="nav-medications" role="tabpanel"
                     aria-labelledby="nav-medications-tab">
                    {medications}
                </div>
            );
        } catch (error) {
            return <div>Loading...</div>
        }
    }
}

export default Medications;