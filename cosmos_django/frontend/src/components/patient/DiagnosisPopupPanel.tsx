import * as React from 'react';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';

class DiagnosisPopupPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel
                header={<TitlePanelHeader title={'Diagnosis popup'} />}
                body={<div>Some things here</div>}
                noHover
            />
        );
    }
}

export default DiagnosisPopupPanel;
