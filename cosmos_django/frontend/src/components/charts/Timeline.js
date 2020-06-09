import React from "react";

import Visit from './Visit'

class Timeline extends React.Component {

    render() {
        const visits = this.props.account.patient_profile.visits.map(function (visitData) {
            return <Visit data={visitData} key={visitData.id}/>
        });
        return (
            <div>
                {visits}
            </div>
        );
    }
}

export default Timeline;