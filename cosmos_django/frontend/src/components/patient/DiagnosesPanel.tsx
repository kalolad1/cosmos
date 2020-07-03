import * as React from 'react';

import * as types from '../../types/types';
import * as dateUtil from '../../util/date_util';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import DiagnosisPopupPanel from './DiagnosisPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Diagnoses';

interface DiagnosesPanelProps {
    diagnoses: Array<types.Diagnosis>;
}

class DiagnosesPanel extends React.Component<DiagnosesPanelProps, any> {
    constructor(props) {
        super(props);
        this.getDiagnosisListItems = this.getDiagnosisListItems.bind(this);
    }

    getDiagnosisListItems() {
        return this.props.diagnoses.map(function (diagnosis) {
            return (
                <PopupListItem
                    key={diagnosis.id}
                    content={diagnosis.name}
                    popup={<DiagnosisPopupPanel diagnosis={diagnosis} />}
                />
            );
        });
    }

    render() {
        const body = <List>{this.getDiagnosisListItems()}</List>;
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

export default DiagnosesPanel;
