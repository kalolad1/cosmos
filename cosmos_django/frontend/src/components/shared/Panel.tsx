import * as React from 'react';

import { Divider } from '@material-ui/core';

interface PanelProps {
    header: any;
    body: any;
    footer?: any;
}

class Panel extends React.Component<PanelProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel">
                <div className="panel-header-and-body">
                    <div className="panel-header">{this.props.header}</div>
                    <Divider />
                    <div className="panel-body">{this.props.body}</div>
                </div>
                <div className="panel-footer">{this.props.footer}</div>
            </div>
        );
    }
}

export default Panel;
