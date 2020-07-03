import * as React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

interface PanelButtonFooterProps {
    buttons: object;
}

class PanelButtonFooter extends React.Component<PanelButtonFooterProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-button-footer">
                {'edit' in this.props.buttons && (
                    <IconButton aria-label="edit" size="medium">
                        <EditIcon />
                    </IconButton>
                )}
                {'delete' in this.props.buttons && (
                    <IconButton aria-label="delete" size="medium">
                        <DeleteIcon />
                    </IconButton>
                )}
                {'add' in this.props.buttons && (
                    <IconButton aria-label="add" size="medium">
                        <AddIcon />
                    </IconButton>
                )}
            </div>
        );
    }
}

export default PanelButtonFooter;
