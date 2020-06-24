import * as React from 'react';

import Panel from './Panel';
import GeneralInformationPanel from "../patient/GeneralInformationPanel";
import {PatientProfile} from '../../types/types';


interface PanelGridProps {
    patientProfile: PatientProfile,
}


class PanelGrid extends React.Component<PanelGridProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-grid">
                <div className="panel-grid-main-column">
                    <GeneralInformationPanel/>
                    <Panel/>
                    <Panel/>
                </div>
                <div className="panel-grid-secondary-column">
                    <Panel/>
                    <Panel/>
                    <Panel/>
                </div>
            </div>
        );
    }
}

export default PanelGrid;