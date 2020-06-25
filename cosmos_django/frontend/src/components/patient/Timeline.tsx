/* Contains the timeline for patient visits. */
import * as React from 'react';

import * as types from '../../types/types';

import Encounter from './Encounter'


interface TimelineProps {
    encounters: Array<types.Encounter>,
}


class Timeline extends React.Component<TimelineProps, any> {
    render() {
        const encounters = this.props.encounters.map(function (encounter) {
            return <Encounter
                encounterType={encounter.encounterType}
                note={encounter.note}
                key={encounter.id}/>
        });
        return (
            <div>
                {encounters}
            </div>
        );
    }
}

export default Timeline;