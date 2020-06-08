import React from "react";

import Visit from './Visit'

class Timeline extends React.Component {

    render() {
        try {
            const visits = this.props.account.patient_profile.visits.map(function (visitData) {
                return <Visit data={visitData} key={visitData.id}/>
            });
            return (
                <div className="tab-pane fade show active" id="nav-timeline" role="tabpanel"
                     aria-labelledby="nav-timeline-tab">
                    {visits}
                </div>
            );
        } catch (error) {
            return <div>Loading...</div>
        }
    }
}

export default Timeline;