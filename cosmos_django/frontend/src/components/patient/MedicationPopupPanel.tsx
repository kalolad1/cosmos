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
import * as medicationActionCreators from '../../actions/action_creators/medication_action_creators';
import * as userActionCreators from '../../actions/action_creators/user_action_creators';

interface MedicationPopupPanelProps {
    medication: modelTypes.Diagnosis;
    history: any;
    dispatch: any;
}

class MedicationPopupPanel extends React.Component<
    MedicationPopupPanelProps,
    any
> {
    constructor(props) {
        super(props);
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleEditButtonClick() {
        const updateMedicationPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_MEDICATION,
            this.props.medication.id.toString()
        );
        this.props.history.push(updateMedicationPath);
    }

    handleDeleteButtonClick() {
        const self = this;
        this.props
            .dispatch(
                medicationActionCreators.deleteMedication(
                    this.props.medication.id
                )
            )
            .then(function () {
                self.props.dispatch(userActionCreators.getUser());
            });
    }

    render() {
        const header = (
            <PanelHeaderMetadata
                title={this.props.medication.name}
                significanceGroup={this.props.medication.significanceGroup}
            />
        );
        const body = (
            <div>
                <PanelBodyLineItem
                    icon={<EventIcon />}
                    content={dateUtil.getFormattedDate(
                        this.props.medication.createdAt
                    )}
                />
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.medication.description}
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
    ReactRouterDOM.withRouter(MedicationPopupPanel)
);
