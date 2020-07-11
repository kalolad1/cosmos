import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as userActionCreators from '../../actions/action_creators/user_action_creators';
import * as vaccinationActionCreators from '../../actions/action_creators/vaccination_action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';
import * as dateUtil from '../../util/date_util';
import * as urlUtil from '../../util/url_util';

import NotesIcon from '@material-ui/icons/Notes';
import EventIcon from '@material-ui/icons/Event';

import Panel from '../shared/Panel';
import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import PanelButtonFooter from '../shared/PanelButtonFooter';

interface VaccinationPopupPanelProps {
    vaccination: modelTypes.Vaccination;
    history: any;
    dispatch: any;
}

class VaccinationPopupPanel extends React.Component<
    VaccinationPopupPanelProps,
    any
> {
    constructor(props) {
        super(props);

        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleEditButtonClick() {
        const updateVaccinationPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_VACCINATION,
            this.props.vaccination.id.toString()
        );
        this.props.history.push(updateVaccinationPath);
    }

    handleDeleteButtonClick() {
        const self = this;
        this.props
            .dispatch(
                vaccinationActionCreators.deleteVaccination(
                    this.props.vaccination.id
                )
            )
            .then(function () {
                self.props.dispatch(userActionCreators.getUser());
            });
    }

    render() {
        const header = (
            <PanelHeaderMetadata
                title={this.props.vaccination.name}
                significanceGroup={this.props.vaccination.significanceGroup}
            />
        );
        const body = (
            <div>
                <PanelBodyLineItem
                    icon={<EventIcon />}
                    content={dateUtil.getFormattedDate(
                        this.props.vaccination.createdAt
                    )}
                />
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.vaccination.description}
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
    ReactRouterDOM.withRouter(VaccinationPopupPanel)
);
