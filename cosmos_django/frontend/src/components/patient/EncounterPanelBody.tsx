import * as React from 'react';

import EncounterPanelBodyLineItem from './EncounterPanelBodyLineItem';

class EncounterPanelBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <EncounterPanelBodyLineItem />
                <EncounterPanelBodyLineItem />
                <EncounterPanelBodyLineItem />
            </div>
        );
    }
}

export default EncounterPanelBody;
