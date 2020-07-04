import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as types from '../../types/types';

import FullForm from '../shared/FullForm';
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
import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';
import PanelBodyLineItem from '../shared/PanelBodyLineItem';
import LayersIcon from '@material-ui/icons/Layers';
import NotesIcon from '@material-ui/icons/Notes';

interface EncounterFullViewProps {
    mode: string;
    encounter?: types.Encounter;
    history: any;
}

interface EncounterFullViewState {
    encounterType: string;
    note: string;
}

class EncounterFullView extends React.Component<
    EncounterFullViewProps,
    EncounterFullViewState
> {
    constructor(props) {
        super(props);
        this.state = {
            encounterType: this.props.encounter?.encounterType || '',
            note: this.props.encounter?.note || '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createEncounterTypeMenuItems = this.createEncounterTypeMenuItems.bind(
            this
        );
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleEncounterAdd = this.handleEncounterAdd.bind(this);
        this.handleExitClick = this.handleExitClick.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
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

    handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        const element = event.target;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleEncounterAdd(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log('Adding encounter!');
    }

    handleExitClick(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="encounter-creator">
                <a
                    href="#"
                    onClick={this.handleExitClick}
                    className="encounter-creator-close-button"
                />
                <div>
                    <form onSubmit={this.handleEncounterAdd}>
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
                                            value={this.state.encounterType}
                                            onChange={this.handleSelectChange}
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
                                        onChange={this.handleInputChange}
                                        value={this.state.note}
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
            </div>
        );
    }
}

export default ReactRouterDOM.withRouter(EncounterFullView);
