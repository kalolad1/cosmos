import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Panel from '../shared/Panel';

const PANEL_TITLE = 'General Information';

class GeneralInformationPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const content = (
            <div>
                <div className="form-input-container form-bi-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-bi-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="firstName"
                        onChange={this.props.handleInputChange}
                        value={this.props.firstName}
                        label="First name"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                    />
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-bi-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="lastName"
                        onChange={this.props.handleInputChange}
                        value={this.props.lastName}
                        label="Last name"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                    />
                </div>
                <div className="form-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-bi-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="email"
                        onChange={this.props.handleInputChange}
                        value={this.props.email}
                        label="Email"
                        type="email"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth
                    />
                </div>
            </div>
        );
        return <Panel title={PANEL_TITLE} content={content} />;
    }
}

export default GeneralInformationPanel;
