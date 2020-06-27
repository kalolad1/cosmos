import * as React from 'react';

import { Divider } from '@material-ui/core';

class Panel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="panel"
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
            >
                <div className="panel-title-and-content">
                    <div className="panel-title">{this.props.title}</div>
                    <Divider />
                    <div className="panel-content">{this.props.content}</div>
                </div>
                <div className="panel-footer">{this.props.footer}</div>
            </div>
        );
    }
}

export default Panel;
