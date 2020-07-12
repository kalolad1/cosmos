import * as React from 'react';

import TextField from '@material-ui/core/TextField';

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
