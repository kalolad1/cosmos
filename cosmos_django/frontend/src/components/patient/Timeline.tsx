/* Contains the timeline for patient visits. */
import * as React from 'react';

import * as types from '../../types/types';

import EncounterPanel from './EncounterPanel';

interface TimelineProps {
    encounters: Array<types.Encounter>;
}

class Timeline extends React.Component<TimelineProps, any> {
    render() {
        return (
            <div>
                <EncounterPanel />
            </div>
        );
    }
}

export default Timeline;
