/* Contains the timeline for patient visits. */
import * as React from "react";

import Visit from './Visit'

class Timeline extends React.Component {

    render() {
        const visits = this.props.visits.map(function (visitData) {
            return <Visit data={visitData} key={visitData.id}/>
        });
        return (
            <div className="timeline patient-chart-content-container">
                {visits}
            </div>
        );
    }
}

export default Timeline;