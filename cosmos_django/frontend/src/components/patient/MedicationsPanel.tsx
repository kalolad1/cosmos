import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as types from '../../types/types';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import MedicationPopupPanel from './MedicationPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import * as urlPathConstants from '../../constants/url_path_constants';

const PANEL_TITLE = 'Medications';

interface MedicationsPanelProps {
    medications: Array<types.Medication>;
    history: any;
}

class MedicationsPanel extends React.Component<MedicationsPanelProps, any> {
    constructor(props) {
        super(props);
        this.getMedicationListItems = this.getMedicationListItems.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }

    handleAddButtonClick() {
        this.props.history.push(urlPathConstants.NEW_MEDICATION);
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

export default ReactRedux.connect()(
    ReactRouterDOM.withRouter(MedicationsPanel)
);
