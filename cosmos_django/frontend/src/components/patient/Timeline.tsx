/* Contains the timeline for patient visits. */
import * as React from 'react';

import * as types from '../../types/types';

import Visit from './Visit'


interface TimelineProps {
    visits: Array<types.Visit>,
}


class Timeline extends React.Component<TimelineProps, any> {
    render() {
        const visits = this.props.visits.map(function (visit) {
            return <Visit
                visitType={visit.visit_type}
                note={visit.note}
                key={visit.id}/>
        });
        return (
            <div>
                {visits}
            </div>
        );
    }
}

export default Timeline;