import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

class EncounterPanelBodyLineItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NotesIcon />
                <span>The patient is doing well.</span>
            </div>
        );
    }
}

export default EncounterPanelBodyLineItem;
