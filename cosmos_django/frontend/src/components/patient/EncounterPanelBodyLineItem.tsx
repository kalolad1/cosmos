import * as React from 'react';

interface EncounterPanelBodyLineItemProps {
    icon: any;
    content: any;
}

class EncounterPanelBodyLineItem extends React.Component<
    EncounterPanelBodyLineItemProps,
    any
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="encounter-panel-body-line-item">
                <span className="encounter-panel-body-line-item-icon">
                    {this.props.icon}
                </span>
                <span>{this.props.content}</span>
            </div>
        );
    }
}

export default EncounterPanelBodyLineItem;
