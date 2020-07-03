/* A popup list item is a row in a list that after pressed brings up a modal.*/
import * as React from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Popover from '@material-ui/core/Popover';
import { IconButton } from '@material-ui/core';

interface PopupListItemProps {
    content: any;
    popup: any;
}

interface PopupListItemState {
    popupAnchorElement: any;
}

class PopupListItem extends React.Component<
    PopupListItemProps,
    PopupListItemState
> {
    constructor(props) {
        super(props);
        this.state = {
            popupAnchorElement: null,
        };

        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handlePopupOpen = this.handlePopupOpen.bind(this);
    }

    handlePopupOpen(event) {
        this.setState({
            popupAnchorElement: event.currentTarget,
        });
    }

    handlePopupClose() {
        this.setState({
            popupAnchorElement: null,
        });
    }

    render() {
        return (
            <div>
                <ListItem onClick={this.handlePopupOpen} button>
                    <span>{this.props.content}</span>
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            aria-label="popup"
                            onClick={this.handlePopupOpen}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Popover
                    open={Boolean(this.state.popupAnchorElement)}
                    anchorEl={this.state.popupAnchorElement}
                    onClose={this.handlePopupClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    {this.props.popup}
                </Popover>
            </div>
        );
    }
}

export default PopupListItem;
