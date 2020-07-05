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

interface AllergyPopupPanelProps {
    allergy: types.Allergy;
    history: any;
    dispatch: any;
}

class AllergyPopupPanel extends React.Component<AllergyPopupPanelProps, any> {
    constructor(props) {
        super(props);

        this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleEditButtonClick() {
        const updateAllergyPath = urlUtil.getUrlPathWithId(
            urlPathConstants.UPDATE_ALLERGY,
            this.props.allergy.id.toString()
        );
        this.props.history.push(updateAllergyPath);
    }

    handleDeleteButtonClick() {
        const self = this;
        this.props
            .dispatch(
                actionCreators.deleteAllergy(
                    this.props.allergy.id,
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
                title={this.props.allergy.name}
                significanceGroup={this.props.allergy.significanceGroup}
            />
        );
        const body = (
            <div>
                <PanelBodyLineItem
                    icon={<EventIcon />}
                    content={dateUtil.getFormattedDate(
                        this.props.allergy.createdAt
                    )}
                />
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.allergy.description}
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
    ReactRouterDOM.withRouter(AllergyPopupPanel)
);
