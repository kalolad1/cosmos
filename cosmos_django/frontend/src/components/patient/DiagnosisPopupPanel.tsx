import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as modelTypes from '../../types/modelTypes';
import * as dateUtil from '../../util/date_util';

import NotesIcon from '@material-ui/icons/Notes';
import EventIcon from '@material-ui/icons/Event';

import Panel from '../shared/Panel';
import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import * as urlUtil from '../../util/url_util';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as diagnosisActionCreators from '../../actions/action_creators/diagnosis_action_creators';
import * as userActionCreators from '../../actions/action_creators/user_action_creators';

interface DiagnosisPopupPanelProps {
    diagnosis: modelTypes.Diagnosis;
    history: any;
    dispatch: any;
}

class DiagnosisPopupPanel extends React.Component<
    DiagnosisPopupPanelProps,
    any
> {
    constructor(props) {
        super(props);

        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleEditButtonClick() {
        const updateDiagnosisPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_DIAGNOSIS,
            this.props.diagnosis.id.toString()
        );
        this.props.history.push(updateDiagnosisPath);
    }

    handleDeleteButtonClick() {
        const self = this;
        this.props
            .dispatch(
                diagnosisActionCreators.deleteDiagnosis(this.props.diagnosis.id)
            )
            .then(function () {
                self.props.dispatch(userActionCreators.getUser());
            });
    }

    render() {
        const header = (
            <PanelHeaderMetadata
                title={this.props.diagnosis.name}
                significanceGroup={this.props.diagnosis.significanceGroup}
            />
        );
        const body = (
            <div>
                <PanelBodyLineItem
                    icon={<EventIcon />}
                    content={dateUtil.getFormattedDate(
                        this.props.diagnosis.createdAt
                    )}
                />
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.diagnosis.description}
                />
            </div>
        );
        const footer = (
            <PanelButtonFooter
                buttons={{
                    edit: this.handleEditButtonClick,
                    delete: this.handleDeleteButtonClick,
                }}
            />
        );

        return (
            <div className="popup-panel">
                <Panel header={header} body={body} footer={footer} noHover />
            </div>
        );
    }
}

export default ReactRedux.connect()(
    ReactRouterDOM.withRouter(DiagnosisPopupPanel)
);
