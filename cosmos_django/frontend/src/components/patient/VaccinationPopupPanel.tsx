import * as React from 'react';

import * as types from '../../types/types';
import * as dateUtil from '../../util/date_util';

import NotesIcon from '@material-ui/icons/Notes';
import EventIcon from '@material-ui/icons/Event';

import Panel from '../shared/Panel';
import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import PanelButtonFooter from '../shared/PanelButtonFooter';

interface VaccinationPopupPanelProps {
    vaccination: types.Vaccination;
}

class VaccinationPopupPanel extends React.Component<
    VaccinationPopupPanelProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        const header = (
            <PanelHeaderMetadata
                title={this.props.vaccination.name}
                significanceGroup={this.props.vaccination.significanceGroup}
            />
        );
        const body = (
            <div>
                <PanelBodyLineItem
                    icon={<EventIcon />}
                    content={dateUtil.getFormattedDate(
                        this.props.vaccination.createdAt
                    )}
                />
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.vaccination.description}
                />
            </div>
        );
        const footer = (
            <PanelButtonFooter buttons={{ edit: null, delete: null }} />
        );

        return (
            <div className="popup-panel">
                <Panel header={header} body={body} footer={footer} noHover />
            </div>
        );
    }
}

export default VaccinationPopupPanel;
