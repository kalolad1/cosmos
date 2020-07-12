import * as React from 'react';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as modelTypes from '../../types/modelTypes';

import ProviderMetrics from './ProviderMetrics';
import Schedule from './Schedule';
import Inbox from '../shared/Inbox';
import { Redirect, Route, Switch } from 'react-router-dom';

interface ProviderHomeProps {
    user: modelTypes.User;
}

class ProviderHome extends React.Component<ProviderHomeProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path={urlPathConstants.SCHEDULE}>
                        <Schedule />
                    </Route>
                    <Route path={urlPathConstants.INBOX}>
                        <Inbox />
                    </Route>
                    <Route path={urlPathConstants.METRICS}>
                        <ProviderMetrics />
                    </Route>
                    <Redirect to={urlPathConstants.SCHEDULE} />
                </Switch>
            </div>
        );
    }
}

export default ProviderHome;
