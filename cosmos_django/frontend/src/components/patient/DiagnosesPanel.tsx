import * as React from 'react';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import DiagnosisPopupPanel from './DiagnosisPopupPanel';

const PANEL_TITLE = 'Diagnoses';

class DiagnosesPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const body = (
            <List>
                <PopupListItem
                    content={'List item content'}
                    popup={<DiagnosisPopupPanel />}
                />
                <PopupListItem
                    content={'List item content'}
                    popup={<DiagnosisPopupPanel />}
                />
            </List>
        );
        return (
            <Panel
                header={<TitlePanelHeader title={PANEL_TITLE} />}
                body={body}
            />
        );
    }
}

export default DiagnosesPanel;
