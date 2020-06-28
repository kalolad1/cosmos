import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

class EncounterPanelBodyLineItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel-body-line-item">
                <NotesIcon className="encounter-panel-body-line-item-icon" />
                <span>The patient is doing well.</span>
            </div>
        );
    }
}

export default EncounterPanelBodyLineItem;
