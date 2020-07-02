import clsx from 'clsx';
import * as React from 'react';

import { Divider } from '@material-ui/core';

interface PanelProps {
    header: any;
    body: any;
    footer?: any;
    noHover?: boolean;
}

class Panel extends React.Component<PanelProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={clsx({
                    panel: !this.props.noHover,
                    'no-hover-panel': this.props.noHover,
                })}
            >
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
