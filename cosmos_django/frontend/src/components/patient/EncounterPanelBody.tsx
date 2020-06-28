import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

import EncounterPanelBodyLineItem from './EncounterPanelBodyLineItem';

interface EncounterPanelBodyProps {
    note: string;
}

class EncounterPanelBody extends React.Component<EncounterPanelBodyProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <EncounterPanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.note}
                />
            </div>
        );
    }
}

export default EncounterPanelBody;
