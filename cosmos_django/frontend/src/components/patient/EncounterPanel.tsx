import * as React from 'react';

import Panel from '../shared/Panel';
import EncounterPanelBody from './EncounterPanelBody';
import EncounterPanelHeader from './EncounterPanelHeader';
import EncounterPanelFooter from './EncounterPanelFooter';

class EncounterPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel
                header={<EncounterPanelHeader />}
                body={<EncounterPanelBody />}
                footer={<EncounterPanelFooter />}
            />
        );
    }
}

export default EncounterPanel;