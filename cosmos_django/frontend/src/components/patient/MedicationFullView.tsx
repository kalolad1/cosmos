import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as formConstants from '../../constants/form_constants';

import { Button, TextField } from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';
import NotesIcon from '@material-ui/icons/Notes';

import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import FullForm from '../shared/FullForm';

interface MedicationFullViewProps {
    mode: string;
    name: string;
    description: string;
    history: any;
    handleSubmit: any;
    handleInputChange: any;
    handleSelectChange: any;
    handleClose: any;
}

interface MedicationFullViewState {}

class MedicationFullView extends React.Component<
    MedicationFullViewProps,
    MedicationFullViewState
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
            headingText = 'Update Medication';
        } else if (this.props.mode == formConstants.FormModes.CREATE) {
            buttonText = 'Create';
            headingText = 'New Medication';
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

export default ReactRouterDOM.withRouter(MedicationFullView);
