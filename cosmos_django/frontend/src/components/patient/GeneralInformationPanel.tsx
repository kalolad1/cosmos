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
            </div>
        );
        return <TextFieldPanel
            title={PANEL_TITLE}
            textFields={textFields}/>
    }
}

export default GeneralInformationPanel;