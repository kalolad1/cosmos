import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as formConstants from '../../constants/form_constants';
import * as modelTypes from '../../types/modelTypes';
import * as textUtil from '../../util/text_util';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import LayersIcon from '@material-ui/icons/Layers';
import MenuItem from '@material-ui/core/MenuItem';
import NotesIcon from '@material-ui/icons/Notes';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import FullForm from '../shared/FullForm';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';

interface EncounterFullViewProps {
    mode: string;
    encounterType: modelTypes.EncounterType;
    note: string;
    history: any;
    handleSubmit: any;
    handleInputChange: any;
    handleSelectChange: any;
    handleClose: any;
}

class EncounterFullView extends React.Component<EncounterFullViewProps, any> {
    constructor(props) {
        super(props);

        this.encounterTypeMenuItems = this.encounterTypeMenuItems.bind(this);
        this.isFormReadOnly = this.isFormReadOnly.bind(this);
    }

    isFormReadOnly() {
        return this.props.mode == formConstants.FormModes.VIEW;
    }

    encounterTypeMenuItems() {
        const encounterTypeOptions = Object.keys(modelTypes.EncounterType).map(
            function (key, index) {
                const encounterType = modelTypes.EncounterType[key];
                return {
                    id: index,
                    value: encounterType,
                    formatted: textUtil.capitalizeFirstLetter(encounterType),
                };
            }
        );

        return encounterTypeOptions.map(function (option) {
            return (
                <MenuItem key={option.id} value={option.value}>
                    {option.formatted}
                </MenuItem>
            );
        });
    }

    render() {
        let buttonText;
        let headingText;
        if (this.props.mode == formConstants.FormModes.UPDATE) {
            buttonText = 'Update';
            headingText = 'Update Encounter';
        } else if (this.props.mode == formConstants.FormModes.CREATE) {
            buttonText = 'Create';
            headingText = 'New Encounter';
        }

        const content = (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <h1 className="main-heading">{headingText}</h1>
                    <div className="form-input-container">
                        <PanelBodyLineItem
                            icon={<LayersIcon />}
                            content={
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="encounterType-label">
                                        Type
                                    </InputLabel>
                                    <Select
                                        displayEmpty
                                        labelId="encounterType-label"
                                        id="encounterType"
                                        name="encounterType"
                                        value={this.props.encounterType}
                                        onChange={this.props.handleSelectChange}
                                        label="Type"
                                        inputProps={{
                                            required: true,
                                        }}
                                        disabled={this.isFormReadOnly()}
                                    >
                                        {this.encounterTypeMenuItems()}
                                    </Select>
                                </FormControl>
                            }
                        />
                    </div>
                    <div className="form-input-container">
                        <PanelBodyLineItem
                            icon={<NotesIcon />}
                            content={
                                <TextField
                                    name="note"
                                    onChange={this.props.handleInputChange}
                                    value={this.props.note}
                                    label="Note"
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

export default ReactRouterDOM.withRouter(EncounterFullView);
