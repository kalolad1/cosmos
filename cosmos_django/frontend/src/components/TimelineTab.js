import React from 'react'

import Visit from "./Visit";
import BASE_URL from "./App"

class TimelineTab extends React.Component {
    constructor() {
        super();
        this.state = {
            visits: []
        }
    }
    render() {
        const visitComponents = this.state.visits.map((visit) => {
            return <Visit visit={visit} key={visit.id}/>;
        });
        return (
            <div id="timeline" className="tab-pane fade in active">
                {visitComponents}
                visit
            </div>
        )
    }

    componentDidMount() {
        let visitIds = this.props.patientProfile.visits;
        let visitAPI = BASE_URL + 'clinical/api/visits/';
        for (let i = 0; i < visitIds.length; i++) {
            let visitLink = visitAPI + visitIds[i];
            console.log(visitLink)
            fetch(visitLink)
                .then(result => result.json())
                .then(result => {
                    this.setState((prevState) => {
                        visits: prevState.visits.push(result)
                    })
                })
        }
    }
}

export default TimelineTab;