import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import List from '@material-ui/core/List';

import AllergyPopupPanel from './AllergyPopupPanel';
import Panel from '../shared/Panel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';

const PANEL_TITLE = 'Allergies';

interface AllergiesPanelProps {
    allergies: Array<modelTypes.Allergy>;
    history: any;
}

class AllergiesPanel extends React.Component<AllergiesPanelProps, any> {
    constructor(props) {
        super(props);
        this.getAllergyListItems = this.getAllergyListItems.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }

    getAllergyListItems() {
        return this.props.allergies.map(function (allergy) {
            return (
                <PopupListItem
                    key={allergy.id}
                    content={allergy.name}
                    popup={<AllergyPopupPanel allergy={allergy} />}
                />
            );
        });
    }

    handleAddButtonClick() {
        this.props.history.push(urlPathConstants.NEW_ALLERGY);
    }

    render() {
        const body = <List>{this.getAllergyListItems()}</List>;
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

export default ReactRouterDOM.withRouter(AllergiesPanel);
