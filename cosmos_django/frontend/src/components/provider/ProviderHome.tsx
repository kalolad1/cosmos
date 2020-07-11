import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as urlPathConstants from '../../constants/url_path_constants';

import Schedule from './Schedule';
import Inbox from '../shared/Inbox';
import ProviderMetrics from './ProviderMetrics';

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
