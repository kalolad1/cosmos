import * as React from 'react';

import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Rating from '@material-ui/lab/Rating';

class EncounterPanelHeaderMetadata extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel-header-title encounter-panel-title-container">
                    <span className="encounter-panel-title">Physical</span>
                    <VerifiedUserOutlinedIcon className="verified-encounter-icon" />
                </div>
                <div className="encounter-significance-container">
                    <Rating defaultValue={2} max={2} readOnly size="small" />
                    <label className="significance-label">(Significant)</label>
                </div>
            </div>
        );
    }
}

export default EncounterPanelHeaderMetadata;
