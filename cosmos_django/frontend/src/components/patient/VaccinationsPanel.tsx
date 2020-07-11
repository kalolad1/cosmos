import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import VaccinationPopupPanel from './VaccinationPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import * as ReactRouterDOM from 'react-router-dom';
import * as urlPathConstants from '../../constants/url_path_constants';

const PANEL_TITLE = 'Vaccinations';

interface VaccinationsPanelProps {
    vaccinations: Array<modelTypes.Vaccination>;
    history: any;
}

class VaccinationsPanel extends React.Component<VaccinationsPanelProps, any> {
    constructor(props) {
        super(props);
        this.getVaccinationListItems = this.getVaccinationListItems.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
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

    handleAddButtonClick() {
        this.props.history.push(urlPathConstants.NEW_VACCINATION);
    }

    render() {
        const body = <List>{this.getVaccinationListItems()}</List>;
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

export default ReactRouterDOM.withRouter(VaccinationsPanel);
