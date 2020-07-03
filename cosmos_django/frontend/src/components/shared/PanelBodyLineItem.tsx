import * as React from 'react';

interface PanelBodyLineItemProps {
    icon: any;
    content: any;
}

class PanelBodyLineItem extends React.Component<PanelBodyLineItemProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-body-line-item">
                <div className="panel-body-line-item-icon-container">
                    {this.props.icon}
                </div>
                <div className="panel-body-line-item-content">
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default PanelBodyLineItem;
