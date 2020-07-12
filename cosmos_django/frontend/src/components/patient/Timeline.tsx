/* Contains the timeline for patient encounters. */
import * as React from 'react';

import * as modelConstants from '../../constants/model_constants';
import * as modelTypes from '../../types/modelTypes';
import * as dateUtil from '../../util/date_util';

import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import ColorizeIcon from '@material-ui/icons/Colorize';
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
    user: modelTypes.User;
}

const ENCOUNTER_TYPE_ICON_MAPPING = {
    [modelTypes.EncounterType.PHYSICAL]: <AccessibilityIcon />,
    [modelTypes.EncounterType.ILLNESS]: <AirlineSeatIndividualSuiteIcon />,
    [modelTypes.EncounterType.VACCINATION]: <ColorizeIcon />,
};

class Timeline extends React.Component<TimelineProps, any> {
    constructor(props) {
        super(props);
        this.getTimelineItems = this.getTimelineItems.bind(this);
        this.getEncounterTypeIcon = this.getEncounterTypeIcon.bind(this);
    }

    getEncounterTypeIcon(type: string) {
        return ENCOUNTER_TYPE_ICON_MAPPING[type];
    }

    getTimelineItems() {
        const self = this;

        return this.props.user.patientProfile!.encounters.map(function (
            encounter
        ) {
            return (
                <TimelineItem key={encounter.id}>
                    <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                            {dateUtil.getFormattedDateAndTime(
                                encounter.createdAt
                            )}
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot>
                            {self.getEncounterTypeIcon(encounter.encounterType)}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <EncounterPanel
                            key={encounter.id}
                            encounter={encounter}
                            profilePicture={
                                self.props.user.patientProfile!.profilePicture
                            }
                            firstName={
                                self.props.user.patientProfile!.firstName
                            }
                            lastName={self.props.user.patientProfile!.lastName}
                            significanceGroup={encounter.significanceGroup}
                        />
                    </TimelineContent>
                </TimelineItem>
            );
        });
    }

    render() {
        return (
            <TimelineComp style={{ padding: '0' }} align="alternate">
                {this.getTimelineItems()}
            </TimelineComp>
        );
    }
}

export default Timeline;
