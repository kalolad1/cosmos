import * as React from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

interface PanelButtonFooterProps {
    buttons: any;
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
                        <Button onClick={this.props.buttons['viewFull']}>
                            View full
                        </Button>
                    )}
                </div>

                <div>
                    {'edit' in this.props.buttons && (
                        <IconButton
                            aria-label="edit"
                            size="medium"
                            onClick={this.props.buttons['edit']}
                        >
                            <EditIcon />
                        </IconButton>
                    )}
                    {'delete' in this.props.buttons && (
                        <IconButton
                            aria-label="delete"
                            size="medium"
                            onClick={this.props.buttons['delete']}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    {'add' in this.props.buttons && (
                        <IconButton
                            aria-label="add"
                            size="medium"
                            onClick={this.props.buttons['add']}
                        >
                            <AddIcon />
                        </IconButton>
                    )}
                </div>
            </div>
        );
    }
}

export default PanelButtonFooter;
