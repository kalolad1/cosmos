import * as React from 'react';

import Medication from './Medication';

import * as types from '../../types/types'


interface MedicationsProps {
    medications: Array<types.Medication>,
}


class Medications extends React.Component<MedicationsProps, any> {
    render() {
        const medications = this.props.medications.map(function (medication) {
            return <Medication
                name={medication.name}
                key={medication.id}/>
        });
        return (
            <div className="patient-chart-content-container">
                {medications}
            </div>
        );
    }
}

export default Medications;