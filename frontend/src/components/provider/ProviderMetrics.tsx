import * as React from 'react';
import * as apiEndpointConstants from '../../constants/api_endpoint_constants';

class ProviderMetrics extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="main-heading">Metrics (Coming Soon)</h1>
                <div className="placeholder">
                    <img
                        style={{ width: '25%', height: '25%' }}
                        src={apiEndpointConstants.PANEL_PLACEHOLDER}
                    />
                </div>
            </div>
        );
    }
}

export default ProviderMetrics;
