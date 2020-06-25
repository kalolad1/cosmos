import * as React from 'react';

import * as textUtil from '../../util/text_util';


interface EncounterProps {
    encounter_type: string,
    note: string,
}

class Encounter extends React.Component<EncounterProps, any> {
    render() {
        return (
            <div className="encounter rounded-grey-container">
                <h1>{textUtil.capitalizeFirstLetter(this.props.encounter_type)}</h1>
                <p>{this.props.note}</p>
            </div>
        )
    }
}

export default Encounter;