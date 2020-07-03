import * as React from 'react';

import * as types from '../../types/types';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import MedicationPopupPanel from './MedicationPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Medications';

interface MedicationsPanelProps {
    medications: Array<types.Medication>;
}

class MedicationsPanel extends React.Component<MedicationsPanelProps, any> {
    constructor(props) {
        super(props);
        this.getMedicationListItems = this.getMedicationListItems.bind(this);
    }

    getMedicationListItems() {
        return this.props.medications.map(function (medication) {
            return (
                <PopupListItem
                    key={medication.id}
                    content={medication.name}
                    popup={<MedicationPopupPanel medication={medication} />}
                />
            );
        });
    }

    render() {
        const body = <List>{this.getMedicationListItems()}</List>;
        const footer = <PanelButtonFooter buttons={{ add: null }} />;
        return (
            <Panel
                header={<TitlePanelHeader title={PANEL_TITLE} />}
                body={body}
                footer={footer}
            />
        );
    }
}

export default MedicationsPanel;