import * as React from 'react';

import * as modelConstants from '../../constants/model_constants';
import * as textUtil from '../../util/text_util';

import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import Rating from '@material-ui/lab/Rating';

interface EncounterPanelHeaderMetadataProps {
    title: string;
    significanceBand: string;
}

const SIGNIFICANCE_BAND_STARS_MAPPING = {
    [modelConstants.EncounterSignificanceBands.LOW]: 1,
    [modelConstants.EncounterSignificanceBands.MEDIUM]: 2,
    [modelConstants.EncounterSignificanceBands.HIGH]: 3,
};

class EncounterPanelHeaderMetadata extends React.Component<
    EncounterPanelHeaderMetadataProps,
    any
> {
    constructor(props) {
        super(props);
        this.getNumOfSignificanceStars = this.getNumOfSignificanceStars.bind(
            this
        );
    }

    getNumOfSignificanceStars() {
        return SIGNIFICANCE_BAND_STARS_MAPPING[this.props.significanceBand];
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
                    <Rating
                        defaultValue={this.getNumOfSignificanceStars()}
                        max={this.getNumOfSignificanceStars()}
                        readOnly
                        size="small"
                    />
                    <label className="significance-label">
                        {textUtil.capitalizeFirstLetter(
                            this.props.significanceBand
                        )}
                    </label>
                </div>
            </div>
        );
    }
}

export default EncounterPanelHeaderMetadata;
