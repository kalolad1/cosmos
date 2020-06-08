import React from 'react';

class Visit extends React.Component {
    render() {
        return (
            <div className="visit">
                <h1>{this.props.data.visit_type}</h1>
                <p>{this.props.data.note}</p>
            </div>
        )
    }
}

export default Visit;