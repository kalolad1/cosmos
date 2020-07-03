import * as React from 'react';

import NotesIcon from '@material-ui/icons/Notes';

import PanelBodyLineItem from '../shared/PanelBodyLineItem';

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
                <PanelBodyLineItem
                    icon={<NotesIcon />}
                    content={this.props.note}
                />
            </div>
        );
    }
}

export default EncounterPanelBody;
