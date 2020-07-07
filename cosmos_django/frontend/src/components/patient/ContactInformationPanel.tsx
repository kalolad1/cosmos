import * as React from 'react';
import 'react-phone-input-2/lib/material.css';

import TextField from '@material-ui/core/TextField';
// import PhoneInput from 'react-phone-input-2';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';

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
                {/* TODO make custom phone input. */}
                {/*<div className="form-input-container">*/}
                {/*    <PhoneInput*/}
                {/*        disabled={!this.props.editMode}*/}
                {/*        containerClass={*/}
                {/*            'form-input-field ' +*/}
                {/*            (!this.props.editMode*/}
                {/*                ? 'read-only-input-field'*/}
                {/*                : '')*/}
                {/*        }*/}
                {/*        disableDropdown*/}
                {/*        value={this.props.phoneNumber}*/}
                {/*        onChange={this.props.handlePhoneNumberChange}*/}
                {/*        inputProps={{*/}
                {/*            name: 'phoneNumber',*/}
                {/*            autoFocus: true,*/}
                {/*        }}*/}
                {/*        // Need to override style here because styles get*/}
                {/*        // overwritten by the default included css.*/}
                {/*        inputStyle={{*/}
                {/*            width: '100%',*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="form-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="addressLine"
                        onChange={this.props.handleInputChange}
                        value={this.props.addressLine}
                        label="Address Line"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth
                    />
                </div>
                <div className="form-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="city"
                        onChange={this.props.handleInputChange}
                        value={this.props.city}
                        label="City"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth
                    />
                </div>
                <div className="form-input-container form-bi-input-container">
                    <TextField
                        disabled={!this.props.editMode}
                        className={
                            'form-bi-input-field ' +
                            (!this.props.editMode
                                ? 'read-only-input-field'
                                : '')
                        }
                        name="state"
                        onChange={this.props.handleInputChange}
                        value={this.props.state}
                        label="State"
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
                        name="zipCode"
                        onChange={this.props.handleInputChange}
                        value={this.props.zipCode}
                        label="Zip Code"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                    />
                </div>
            </div>
        );
        return (
            <Panel
                header={<TitlePanelHeader title={PANEL_TITLE} />}
                body={content}
            />
        );
    }
}

export default ContactInformationPanel;
