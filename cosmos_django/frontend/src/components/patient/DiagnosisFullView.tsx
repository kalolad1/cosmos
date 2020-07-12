import * as React from 'react';

import * as formConstants from '../../constants/form_constants';

import Button from '@material-ui/core/Button';
import LayersIcon from '@material-ui/icons/Layers';
import NotesIcon from '@material-ui/icons/Notes';
import TextField from '@material-ui/core/TextField';

import FullForm from '../shared/FullForm';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';

interface DiagnosisFullViewProps {
    mode: string;
    name: string;
    description: string;
    handleSubmit: any;
    handleInputChange: any;
    handleSelectChange: any;
    handleClose: any;
}

interface DiagnosisFullViewState {}

class DiagnosisFullView extends React.Component<
    DiagnosisFullViewProps,
    DiagnosisFullViewState
> {
    constructor(props) {
        super(props);
        this.isFormReadOnly = this.isFormReadOnly.bind(this);
    }

    isFormReadOnly() {
        return this.props.mode == formConstants.FormModes.VIEW;
    }

    render() {
        let buttonText;
        let headingText;
        if (this.props.mode == formConstants.FormModes.UPDATE) {
            buttonText = 'Update';
            headingText = 'Update Diagnosis';
        } else if (this.props.mode == formConstants.FormModes.CREATE) {
            buttonText = 'Create';
            headingText = 'New Diagnosis';
        }

        const content = (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <h1 className="main-heading">{headingText}</h1>
                    <div className="form-input-container">
                        <PanelBodyLineItem
                            icon={<LayersIcon />}
                            content={
                                <TextField
                                    name="name"
                                    onChange={this.props.handleInputChange}
                                    value={this.props.name}
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    inputProps={{
                                        required: true,
                                    }}
                                    fullWidth
                                    disabled={this.isFormReadOnly()}
                                />
                            }
                        />
                    </div>
                    <div className="form-input-container">
                        <PanelBodyLineItem
                            icon={<NotesIcon />}
                            content={
                                <TextField
                                    name="description"
                                    onChange={this.props.handleInputChange}
                                    value={this.props.description}
                                    label="Description"
                                    multiline
                                    rows={12}
                                    variant="outlined"
                                    inputProps={{
                                        required: true,
                                    }}
                                    fullWidth
                                    disabled={this.isFormReadOnly()}
                                />
                            }
                        />
                    </div>
                    {!this.isFormReadOnly() && (
                        <div className="form-button-container">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                {buttonText}
                            </Button>
                        </div>
                    )}
                </form>
            </div>
        );
        return (
            <div>
                <FullForm
                    content={content}
                    handleClose={this.props.handleClose}
                />
            </div>
        );
    }
}

export default DiagnosisFullView;
