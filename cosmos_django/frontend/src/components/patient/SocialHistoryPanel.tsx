import * as React from 'react';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Social History (Coming soon)';

class SocialHistoryPanel extends React.Component<any, any> {
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

export default SocialHistoryPanel;
