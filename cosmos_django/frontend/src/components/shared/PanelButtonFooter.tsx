import * as React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

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
                <div>
                    {'viewFull' in this.props.buttons && (
                        <Button>View full</Button>
                    )}
                </div>

                <div>
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
            </div>
        );
    }
}

export default PanelButtonFooter;
