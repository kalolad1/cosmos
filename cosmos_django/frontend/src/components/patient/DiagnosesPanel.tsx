import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as modelTypes from '../../types/modelTypes';

import List from '@material-ui/core/List';

import Panel from '../shared/Panel';
import PopupListItem from '../shared/PopupListItem';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import DiagnosisPopupPanel from './DiagnosisPopupPanel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import * as urlPathConstants from '../../constants/url_path_constants';

const PANEL_TITLE = 'Diagnoses';

interface DiagnosesPanelProps {
    diagnoses: Array<modelTypes.Diagnosis>;
    history: any;
}

class DiagnosesPanel extends React.Component<DiagnosesPanelProps, any> {
    constructor(props) {
        super(props);
        this.getDiagnosisListItems = this.getDiagnosisListItems.bind(this);
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
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

    handleAddButtonClick() {
        this.props.history.push(urlPathConstants.NEW_DIAGNOSIS);
    }

    render() {
        const body = <List>{this.getDiagnosisListItems()}</List>;
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

export default ReactRouterDOM.withRouter(DiagnosesPanel);
