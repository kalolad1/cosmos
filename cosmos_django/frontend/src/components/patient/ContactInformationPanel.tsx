import * as React from 'react';
import 'react-phone-input-2/lib/material.css';

import Panel from '../shared/Panel';
import TextField from '@material-ui/core/TextField';
import PhoneInput from 'react-phone-input-2';

const PANEL_TITLE = 'Contact Information';

class ContactInformationPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const content = (
            <div>
                <div className="form-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-input-field ' +
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
                <div className="form-input-container">
                    <PhoneInput
                        disabled={!this.props.editMode}
                        containerClass={
                            'form-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        disableDropdown
                        value={this.props.phoneNumber}
                        onChange={this.props.handlePhoneNumberChange}
                        inputProps={{
                            name: 'phoneNumber',
                            autoFocus: true,
                        }}
                        // Need to override style here because styles get
                        // overwritten by the default included css.
                        inputStyle={{
                            width: '100%',
                        }}
                    />
                </div>
            </div>
        );
        return <Panel title={PANEL_TITLE} content={content} />;
    }
}

export default ContactInformationPanel;
