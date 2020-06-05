import React from 'react'

class Visit extends React.Component {
    render() {
        return (
            <div className="visit">
                <h3>Visit ID: {this.props.visit.id}</h3>
                <h3>Type: {this.props.visit.visit_type}</h3>
                <h3>Note: {this.props.visit.note}</h3>
            </div>
        )
    }
}

export default Visit;