import * as React from 'react';
import * as ReactRedux from 'react-redux';

import * as actionCreators from '../actions/action_creators';
import { withStyles } from '@material-ui/core/styles';
import * as ReactRouterDOM from 'react-router-dom';
import { User } from '../types/types';
import AppShell from '../AppShell';
import Home from './patient/PatientHome';
import PatientHome from './patient/PatientHome';
import FullPageSpinner from './shared/FullPageSpinner';
import ProviderHome from './provider/ProviderHome';

interface AppHomeProps {
    user: User;
    isFetchingUser: boolean;
    dispatch: any;
    history: any;
}

class AppHome extends React.Component<AppHomeProps, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(actionCreators.fetchUser(this.props.history));
    }

    render() {
        let content;
        if (this.props.isFetchingUser) {
            content = <FullPageSpinner />;
        } else {
            console.log(this.props.user);
            if (this.props.user.patientProfile !== null) {
                content = (
                    <AppShell
                        content={<PatientHome user={this.props.user} />}
                        isProvider={false}
                    />
                );
            } else if (this.props.user.providerProfile !== null) {
                content = (
                    <AppShell
                        content={<ProviderHome user={this.props.user} />}
                        isProvider={true}
                    />
                );
            } else {
                content = <div>Error.</div>;
            }
        }
        return content;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        isFetchingUser: state.isFetchingUser,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(AppHome)
);
