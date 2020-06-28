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
                <div>
                    <span>Physical</span>
                    <VerifiedUserOutlinedIcon />
                </div>
                <Rating name="significance" defaultValue={2} max={3} readOnly />
            </div>
        );
    }
}

export default EncounterPanelHeaderMetadata;
