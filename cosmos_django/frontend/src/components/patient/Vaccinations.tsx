import * as React from 'react';

import * as types from '../../types/types';

import Vaccination from './Vaccination';


interface VaccinationsProps {
    vaccinations: Array<types.Vaccination>,
}


class Vaccinations extends React.Component<VaccinationsProps, any> {
    render() {
        const vaccinations = this.props.vaccinations.map(function (vaccination) {
            return <Vaccination
                name={vaccination.name}
                key={vaccination.id}/>
        });
        return (
            <div className="patient-chart-content-container">
                {vaccinations}
            </div>
        );
    }
}

export default Vaccinations;