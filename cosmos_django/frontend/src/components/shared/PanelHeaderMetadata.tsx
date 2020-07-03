import * as React from 'react';

import * as textUtil from '../../util/text_util';

import SignificanceLabel from '../patient/SignificanceLabel';

interface PanelHeaderMetadataProps {
    title: string;
    significanceBand: string;
}

class PanelHeaderMetadata extends React.Component<
    PanelHeaderMetadataProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel-title-container">
                    <span className="panel-title">
                        {textUtil.capitalizeFirstLetter(this.props.title)}
                    </span>
                </div>
                <SignificanceLabel
                    significanceBand={this.props.significanceBand}
                />
            </div>
        );
    }
}

export default PanelHeaderMetadata;
