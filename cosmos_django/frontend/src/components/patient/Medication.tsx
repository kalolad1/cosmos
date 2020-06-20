/* A component that represents a single medication. */
import * as React from 'react';

interface MedicationProps {
    name: string,
}

class Medication extends React.Component<MedicationProps, any> {
    render() {
        return (
            <div className="medication rounded-grey-container">
                <h1>{this.props.name}</h1>
            </div>
        )
    }
}

export default Medication;