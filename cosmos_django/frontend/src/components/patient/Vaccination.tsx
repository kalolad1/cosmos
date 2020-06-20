import * as React from 'react';


interface VaccinationProps {
    name: string,
}


class Vaccination extends React.Component<VaccinationProps, any> {
    render() {
        return (
            <div className="vaccination rounded-grey-container">
                <h1>{this.props.name}</h1>
            </div>
        )
    }
}

export default Vaccination;