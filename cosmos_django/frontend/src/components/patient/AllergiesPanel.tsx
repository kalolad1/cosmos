import * as React from 'react';

import * as types from '../../types/types';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import AllergyPopupPanel from './AllergyPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Allergies';

interface AllergiesPanelProps {
    allergies: Array<types.Allergy>;
}

class AllergiesPanel extends React.Component<AllergiesPanelProps, any> {
    constructor(props) {
        super(props);
        this.getAllergyListItems = this.getAllergyListItems.bind(this);
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

    render() {
        const body = <List>{this.getAllergyListItems()}</List>;
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

export default AllergiesPanel;
