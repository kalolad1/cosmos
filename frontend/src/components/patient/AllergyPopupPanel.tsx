import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';

import * as allergyActionCreators from '../../actions/action_creators/allergy_action_creators';
import * as userActionCreators from '../../actions/action_creators/user_action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';
import * as dateUtil from '../../util/date_util';
import * as urlUtil from '../../util/url_util';

import EventIcon from '@material-ui/icons/Event';
import NotesIcon from '@material-ui/icons/Notes';

import Panel from '../shared/Panel';
import PanelHeaderMetadata from '../shared/PanelHeaderMetadata';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import PanelButtonFooter from '../shared/PanelButtonFooter';

interface AllergyPopupPanelProps {
    allergy: modelTypes.Allergy;
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
                allergyActionCreators.deleteAllergy(this.props.allergy.id)
            )
            .then(function () {
                self.props.dispatch(userActionCreators.getUser());
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
