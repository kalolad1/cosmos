import * as React from 'react';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';

import Panel from '../shared/Panel';
import PanelButtonFooter from '../shared/PanelButtonFooter';
import TitlePanelHeader from '../shared/TitlePanelHeader';

const PANEL_TITLE = 'Vitals (Coming soon)';

class VitalsPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const body = (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    style={{ width: '50%', height: '50%' }}
                    src={apiEndpointConstants.PANEL_PLACEHOLDER}
                />
            </div>
        );
        const footer = <PanelButtonFooter buttons={{ add: null }} />;
        return (
            <Panel
                header={<TitlePanelHeader title={PANEL_TITLE} />}
                body={body}
                footer={footer}
            />
        );
    }
}

export default VitalsPanel;
