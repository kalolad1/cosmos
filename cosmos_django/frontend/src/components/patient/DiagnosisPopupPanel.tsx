import * as React from 'react';

import * as types from '../../types/types';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';

interface DiagnosisPopupPanelProps {
    diagnosis: types.Diagnosis;
}

class DiagnosisPopupPanel extends React.Component<
    DiagnosisPopupPanelProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="diagnosis-popup-panel">
                <Panel
                    header={
                        <TitlePanelHeader title={this.props.diagnosis.name} />
                    }
                    body={<div>{this.props.diagnosis.description}</div>}
                    noHover
                />
            </div>
        );
    }
}

export default DiagnosisPopupPanel;
