/* Contains the timeline for patient encounters. */
import * as React from 'react';

import * as types from '../../types/types';

import NotesIcon from '@material-ui/icons/Notes';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import { Timeline as TimelineComp } from '@material-ui/lab';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import Typography from '@material-ui/core/Typography';

import EncounterPanel from './EncounterPanel';

interface TimelineProps {
    user: types.User;
}

class Timeline extends React.Component<TimelineProps, any> {
    constructor(props) {
        super(props);
        this.getTimelineItems = this.getTimelineItems.bind(this);
    }

    getTimelineItems() {
        const self = this;
        return this.props.user.patientProfile.encounters.map(function (
            encounter
        ) {
            return (
                <TimelineItem key={encounter.id}>
                    <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                            9:30 am
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot>
                            <NotesIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <EncounterPanel
                            key={encounter.id}
                            encounter={encounter}
                            profilePicture={
                                self.props.user.patientProfile.profilePicture
                            }
                            firstName={self.props.user.patientProfile.firstName}
                            lastName={self.props.user.patientProfile.lastName}
                        />
                    </TimelineContent>
                </TimelineItem>
            );
        });
    }

    render() {
        return (
            <TimelineComp align="alternate">
                {this.getTimelineItems()}
            </TimelineComp>
        );
    }
}

export default Timeline;
