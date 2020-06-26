import * as React from 'react';

import {TextField} from '@material-ui/core';
import TextFieldPanel from "../shared/TextFieldPanel";


const PANEL_TITLE = 'General Information';


class GeneralInformationPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const textFields = (
            <div>
                <div className="form-input-container">
                    <TextField
                        className="form-input-field"
                        name="email"
                        onChange={this.props.handleInputChange}
                        value={this.props.email}
                        label="Email"
                        type="email"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth/>
                </div>
                <div className="form-input-container form-bi-input-container">
                    <TextField
                        className="form-bi-input-field"
                        name="first_name"
                        onChange={this.props.handleInputChange}
                        value={this.props.first_name}
                        label="First name"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}/>
                    <TextField
                        className="form-bi-input-field"
                        name="last_name"
                        onChange={this.props.handleInputChange}
                        value={this.props.last_name}
                        label="Last name"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}/>
                </div>
            </div>
        );
        return <TextFieldPanel
            title={PANEL_TITLE}
            textFields={textFields}/>
    }
}

export default GeneralInformationPanel;