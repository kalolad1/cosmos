import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';

import EncounterPanelHeaderMetadata from './EncounterPanelHeaderMetadata';

class EncounterPanelHeader extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel-header">
                <EncounterPanelHeaderMetadata />
                <Avatar>SP</Avatar>
            </div>
        );
    }
}

export default EncounterPanelHeader;
