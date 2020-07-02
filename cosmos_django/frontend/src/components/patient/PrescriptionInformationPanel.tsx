import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import Panel from '../shared/Panel';
import TitlePanelHeader from '../shared/TitlePanelHeader';

const PANEL_TITLE = 'Prescription Information';

class PrescriptionInformationPanel extends React.Component<any, any> {
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
                        name="pharmacy"
                        onChange={this.props.handleInputChange}
                        value={this.props.pharmacy}
                        label="Pharmacy"
                        type="text"
                        variant="outlined"
                        inputProps={{
                            required: true,
                        }}
                        fullWidth
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

export default PrescriptionInformationPanel;
