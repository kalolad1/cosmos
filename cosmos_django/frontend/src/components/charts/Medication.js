import React from 'react';

class Medication extends React.Component {
    render() {
        return (
            <div className="medication rounded-grey-container">
                <h1>{this.props.data.name}</h1>
            </div>
        )
    }
}

export default Medication;