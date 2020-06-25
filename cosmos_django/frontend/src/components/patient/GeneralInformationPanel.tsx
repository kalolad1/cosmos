import * as React from 'react';
import * as ReactRedux from 'react-redux'

import {TextField} from '@material-ui/core';
import TextFieldPanel from "../shared/TextFieldPanel";


const PANEL_TITLE = 'General Information';


class GeneralInformationPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            inEditMode: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEditIconClick = this.handleEditIconClick.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleEditIconClick() {
        // TODO update user here.
        // if (this.state.inEditMode) {
        //     const newUser = Object.assign({}, this.props.user, {
        //         ...this.props.user,
        //         email: this.state.email,
        //     });
        //     actionCreators.updateUser(newUser)
        // }

        this.setState(function(prevState) {
            return {
                inEditMode: !prevState.inEditMode
            };
        })
    }

    render() {
        const textFields = (
            <div>
                <div className="form-input-container">
                    <TextField
                        disabled={!this.state.inEditMode}
                        className="form-input-field"
                        name="email"
                        onChange={this.handleInputChange}
                        value={this.state.email}
                        label="Email"
                        type="email"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth/>
                </div>
            </div>
        );
        return <TextFieldPanel
            title={PANEL_TITLE}
            textFields={textFields}
            handleEditIconClick={this.handleEditIconClick}
            inEditMode={this.state.inEditMode}/>
    }
}

function mapStateToProps(state) {
    return {
        email: state.user.email,
    }
}

export default ReactRedux.connect(mapStateToProps)(GeneralInformationPanel);