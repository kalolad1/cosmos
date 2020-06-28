import * as React from 'react';

import Button from '@material-ui/core/Button';

class EncounterPanelFooter extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel-footer">
                <Button>View full</Button>
            </div>
        );
    }
}

export default EncounterPanelFooter;
