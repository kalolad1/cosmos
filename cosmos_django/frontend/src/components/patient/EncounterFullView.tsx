import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as modelConstants from '../../constants/model_constants';
import * as textUtil from '../../util/text_util';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';
import NotesIcon from '@material-ui/icons/Notes';

import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import FullForm from '../shared/FullForm';

interface EncounterFullViewProps {
    mode: string;
    encounterType: string;
    note: string;
    history: any;
    handleSubmit: any;
    handleInputChange: any;
    handleSelectChange: any;
    handleClose: any;
}

interface EncounterFullViewState {}

class EncounterFullView extends React.Component<
    EncounterFullViewProps,
    EncounterFullViewState
> {
    constructor(props) {
        super(props);

        this.createEncounterTypeMenuItems = this.createEncounterTypeMenuItems.bind(
            this
        );
    }

    createEncounterTypeMenuItems() {
        const encounterTypeOptions = Object.keys(
            modelConstants.EncounterTypes
        ).map(function (key, index) {
            const encounterType = modelConstants.EncounterTypes[key];
            return {
                id: index,
                value: encounterType,
                formatted: textUtil.capitalizeFirstLetter(encounterType),
            };
        });

        return encounterTypeOptions.map(function (option) {
            return (
                <MenuItem key={option.id} value={option.value}>
                    {option.formatted}
                </MenuItem>
            );
        });
    }

    render() {
        const content = (
            <div>
                <form onSubmit={this.props.handleSubmit}>
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
                                    >
                                        {this.createEncounterTypeMenuItems()}
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
                                />
                            }
                        />
                    </div>
                    <div className="form-button-container">
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Add
                        </Button>
                    </div>
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
