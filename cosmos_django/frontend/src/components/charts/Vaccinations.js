import React from "react";
import Vaccination from "./Vaccination";

class Vaccinations extends React.Component {
    render() {
        try {
            const vaccinations = this.props.account.patient_profile.vaccinations.map(function (vaccinationData) {
                return <Vaccination data={vaccinationData} key={vaccinationData.id}/>
            });
            return (
                <div className="tab-pane fade show active" id="nav-vaccinations" role="tabpanel"
                     aria-labelledby="nav-vaccinations-tab">
                    {vaccinations}
                </div>
            );
        } catch (error) {
            return <div>Loading...</div>
        }
    }
}

export default Vaccinations;