/* Contains the timeline for patient visits. */
import * as React from 'react';

import * as types from '../../types/types';

import EncounterPanel from './EncounterPanel';

interface TimelineProps {
    user: types.User;
}

class Timeline extends React.Component<TimelineProps, any> {
    render() {
        const self = this;
        const encounterPanels = this.props.user.patientProfile.encounters.map(
            function (encounter) {
                return (
                    <EncounterPanel
                        key={encounter.id}
                        encounter={encounter}
                        profilePicture={
                            self.props.user.patientProfile.profilePicture
                        }
                        firstName={self.props.user.patientProfile.firstName}
                        lastName={self.props.user.patientProfile.lastName}
                    />
                );
            }
        );

        return <div>{encounterPanels}</div>;
    }
}

export default Timeline;
