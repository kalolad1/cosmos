import * as React from 'react';

import * as textUtil from '../../util/text_util';


interface VisitProps {
    visitType: string,
    note: string,
}

class Visit extends React.Component<VisitProps, any> {
    render() {
        return (
            <div className="visit rounded-grey-container">
                <h1>{textUtil.capitalizeFirstLetter(this.props.visitType)}</h1>
                <p>{this.props.note}</p>
            </div>
        )
    }
}

export default Visit;