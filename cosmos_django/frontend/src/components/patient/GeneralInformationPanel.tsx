import * as React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disabled={!this.props.editMode}
                            className={
                                'form-input-field ' +
                                (!this.props.editMode
                                    ? 'read-only-input-field'
                                    : '')
                            }
                            fullWidth
                            disableToolbar
                            disableFuture
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Date of birth"
                            value={this.props.dateOfBirth}
                            onChange={this.props.handleDateChange}
                            openTo="year"
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        );
        return <Panel title={PANEL_TITLE} content={content} />;
    }
}

export default GeneralInformationPanel;
