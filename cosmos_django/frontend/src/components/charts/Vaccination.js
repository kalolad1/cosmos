import React from 'react';

class Vaccination extends React.Component {
    render() {
        return (
            <div className="vaccination">
                <h1>{this.props.data.name}</h1>
            </div>
        )
    }
}

export default Vaccination;