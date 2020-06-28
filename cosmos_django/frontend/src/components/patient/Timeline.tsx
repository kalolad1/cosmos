/* Contains the timeline for patient visits. */
import * as React from 'react';

import * as types from '../../types/types';


interface TimelineProps {
    encounters: Array<types.Encounter>;
}

class Timeline extends React.Component<TimelineProps, any> {
    render() {
        return <div>Timeline</div>;
    }
}

export default Timeline;
