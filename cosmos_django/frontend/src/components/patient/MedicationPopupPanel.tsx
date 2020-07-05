import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as types from '../../types/types';
import * as dateUtil from '../../util/date_util';

import NotesIcon from '@material-ui/icons/Notes';
import EventIcon from '@material-ui/icons/Event';

import Panel from '../shared/Panel';
import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import * as urlUtil from '../../util/url_util';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as actionCreators from '../../actions/action_creators';

interface MedicationPopupPanelProps {
    medication: types.Diagnosis;
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
                actionCreators.deleteMedication(
                    this.props.medication.id,
                    this.props.history
                )
            )
            .then(function () {
                self.props.dispatch(
                    actionCreators.fetchUser(self.props.history)
                );
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
