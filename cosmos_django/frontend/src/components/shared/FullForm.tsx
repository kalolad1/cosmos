import * as React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

interface FullFormProps {
    content: any;
    handleClose: any;
}

class FullForm extends React.Component<FullFormProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="full-form">
                <IconButton
                    aria-label="close"
                    size="medium"
                    onClick={this.props.handleClose}
                >
                    <CloseIcon />
                </IconButton>
                {this.props.content}
            </div>
        );
    }
}

export default FullForm;
