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
                <div className="encounter-panel-body-line-item-icon-container">
                    {this.props.icon}
                </div>
                <div>{this.props.content}</div>
            </div>
        );
    }
}

export default EncounterPanelBodyLineItem;
