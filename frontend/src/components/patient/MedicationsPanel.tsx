import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import PopupListItem from '../shared/PopupListItem';
import MedicationPopupPanel from './MedicationPopupPanel';
import TitlePanelHeader from '../shared/TitlePanelHeader';

const PANEL_TITLE = 'Medications';

interface MedicationsPanelProps {
    medications: Array<modelTypes.Medication>;
    history: any;
}

class MedicationsPanel extends React.Component<MedicationsPanelProps, any> {
    constructor(props) {
        super(props);
        this.getMedicationListItems = this.getMedicationListItems.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
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

    handleAddButtonClick() {
        this.props.history.push(urlPathConstants.NEW_MEDICATION);
    }

    render() {
        const body = <List>{this.getMedicationListItems()}</List>;
        const footer = (
            <PanelButtonFooter buttons={{ add: this.handleAddButtonClick }} />
        );
        return (
            <Panel
                header={<TitlePanelHeader title={PANEL_TITLE} />}
                body={body}
                footer={footer}
            />
        );
    }
}

export default ReactRouterDOM.withRouter(MedicationsPanel);
