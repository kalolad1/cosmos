import * as React from 'react';


class PanelGrid extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-grid">
                <div className="panel-grid-main-column">
                    {this.props.mainColumnChildrenPanels}
                </div>
                <div className="panel-grid-secondary-column">
                    {this.props.secondaryColumnChildrenPanels}
                </div>
            </div>
        );
    }
}

export default PanelGrid;