import * as React from 'react';

import * as textUtil from '../../util/text_util';

import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Rating from '@material-ui/lab/Rating';

interface EncounterPanelHeaderMetadataProps {
    title: string;
}

class EncounterPanelHeaderMetadata extends React.Component<
    EncounterPanelHeaderMetadataProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel-header-title encounter-panel-title-container">
                    <span className="encounter-panel-title">
                        {textUtil.capitalizeFirstLetter(this.props.title)}
                    </span>
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
