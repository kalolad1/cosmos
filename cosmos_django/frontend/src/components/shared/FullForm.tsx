import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

interface FullFormProps {
    history: any;
    content: any;
}

class FullForm extends React.Component<FullFormProps, any> {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <IconButton aria-label="close" size="medium">
                    <CloseIcon />
                </IconButton>
                {this.props.content}
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(FullForm);
