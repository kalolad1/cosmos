import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';
import * as textUtil from '../../util/text_util';

import Rating from '@material-ui/lab/Rating';

const SIGNIFICANCE_GROUP_STARS_MAPPING = {
    [modelTypes.SignificanceGroup.LOW]: 1,
    [modelTypes.SignificanceGroup.MEDIUM]: 2,
    [modelTypes.SignificanceGroup.HIGH]: 3,
};

interface SignificanceLabelProps {
    significanceGroup: modelTypes.SignificanceGroup;
}

class SignificanceLabel extends React.Component<SignificanceLabelProps, any> {
    constructor(props) {
        super(props);
        this.getNumSignificanceStars = this.getNumSignificanceStars.bind(this);
    }

    getNumSignificanceStars() {
        return SIGNIFICANCE_GROUP_STARS_MAPPING[this.props.significanceGroup];
    }

    render() {
        return (
            <div className="encounter-significance-container">
                <Rating
                    defaultValue={this.getNumSignificanceStars()}
                    max={this.getNumSignificanceStars()}
                    readOnly
                    size="small"
                />
                <label className="significance-label">
                    {textUtil.capitalizeFirstLetter(
                        this.props.significanceGroup
                    )}
                </label>
            </div>
        );
    }
}

export default SignificanceLabel;
