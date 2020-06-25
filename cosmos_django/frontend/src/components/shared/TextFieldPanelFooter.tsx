import * as React from 'react';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';


class TextFieldPanelFooter extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const iconButton = this.props.inEditMode ? <SaveIcon/> : <EditIcon/>;
        return (
            <div className="text-field-panel-footer">
                <IconButton
                    className={this.props.isHoveredOver ? "text-field-panel-edit-button" : "text-field-panel-edit-button-hidden"}
                    aria-label="edit"
                    size="medium"
                    onClick={this.props.handleEditIconClick}>
                    {iconButton}
                </IconButton>
            </div>
        );
    }
}

export default TextFieldPanelFooter;
