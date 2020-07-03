import * as React from 'react';

import * as types from '../../types/types';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import VaccinationPopupPanel from './VaccinationPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Vaccinations';

interface VaccinationsPanelProps {
    vaccinations: Array<types.Vaccination>;
}

class VaccinationsPanel extends React.Component<VaccinationsPanelProps, any> {
    constructor(props) {
        super(props);
        this.getVaccinationListItems = this.getVaccinationListItems.bind(this);
    }

    getVaccinationListItems() {
        return this.props.vaccinations.map(function (vaccination) {
            return (
                <PopupListItem
                    key={vaccination.id}
                    content={vaccination.name}
                    popup={<VaccinationPopupPanel vaccination={vaccination} />}
                />
            );
        });
    }

    render() {
        const body = <List>{this.getVaccinationListItems()}</List>;
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

export default VaccinationsPanel;
