import React from 'react'

import Visit from "./Visit";

class TimelineTab extends React.Component {
    render() {
        const visitComponents = this.props.patientProfile.visits.map(
            (visit) =>
                <Visit visit={visit} key={visit.visitId}/>
        );

        return (
            <div id="timeline" className="tab-pane fade in active">
                {visitComponents}
            </div>
        )
    }
}

export default TimelineTab;