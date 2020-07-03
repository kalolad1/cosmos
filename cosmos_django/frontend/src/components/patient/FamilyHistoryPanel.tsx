import * as React from 'react';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';
import PanelButtonFooter from '../shared/PanelButtonFooter';

const PANEL_TITLE = 'Family History';

interface FamilyHistoryPanelProps {}

class FamilyHistoryPanel extends React.Component<FamilyHistoryPanelProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const body = (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    style={{ width: '50%', height: '50%' }}
                    src={apiEndpointConstants.FAMILY_HISTORY_PLACEHOLDER}
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

export default FamilyHistoryPanel;
