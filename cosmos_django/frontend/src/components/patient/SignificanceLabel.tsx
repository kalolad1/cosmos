import * as React from 'react';
import Rating from '@material-ui/lab/Rating';
import * as textUtil from '../../util/text_util';
import * as modelConstants from '../../constants/model_constants';

const SIGNIFICANCE_BAND_STARS_MAPPING = {
    [modelConstants.EncounterSignificanceBands.LOW]: 1,
    [modelConstants.EncounterSignificanceBands.MEDIUM]: 2,
    [modelConstants.EncounterSignificanceBands.HIGH]: 3,
};

interface SignificanceLabelProps {
    significanceBand: string;
}

class SignificanceLabel extends React.Component<SignificanceLabelProps, any> {
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
        );
    }
}

export default SignificanceLabel;
