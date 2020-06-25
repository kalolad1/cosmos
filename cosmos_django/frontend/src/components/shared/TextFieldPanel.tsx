import * as React from 'react';

import Panel from './Panel';


class TextFieldPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isHoveredOver: false,
        };
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    onMouseEnterHandler() {
        this.setState({
            isHoveredOver: true,
        })
    }

    onMouseLeaveHandler() {
        this.setState({
            isHoveredOver: false,
        })
    }

    render() {
        const content = (
            <div className="text-field-panel">
                {this.props.textFields}
            </div>
        );
        return <Panel
            title={this.props.title}
            content={content}
            onMouseEnter={this.onMouseEnterHandler}
            onMouseLeave={this.onMouseLeaveHandler}/>
    }
}

export default TextFieldPanel;