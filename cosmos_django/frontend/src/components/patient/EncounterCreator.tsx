import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as patientApi from '../../api/patient_api';


import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";


const ENCOUNTER_TYPE_OPTIONS = [
    {id: 1, value: 'physical', humanReadable: 'Physical'},
    {id: 2, value: 'illness', humanReadable: 'Illness'},
    {id: 3, value: 'vaccination', humanReadable: 'Vaccination'},
];

interface EncounterCreatorProps {
    history: any,
}

interface EncounterCreatorState {
    encounterType: string,
    note: string,
}


class EncounterCreator extends React.Component<EncounterCreatorProps, EncounterCreatorState> {
    constructor(props) {
        super(props);
        this.state = {
            encounterType: '',
            note: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createEncounterTypeMenuItems = this.createEncounterTypeMenuItems.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleEncounterCreate = this.handleEncounterCreate.bind(this);
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
        return ENCOUNTER_TYPE_OPTIONS.map(function (option) {
            return (
                <MenuItem
                    key={option.id}
                    value={option.value}>{option.humanReadable}</MenuItem>
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

    handleEncounterCreate(event: React.SyntheticEvent): void {
        event.preventDefault();
        let self = this;

        patientApi.createEncounter(
            this.state.encounterType,
            this.state.note,
            this.props.history)
            .then(function () {
                console.log('Encounter created successfully.');
                self.props.history.goBack();
            });
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
                    className="encounter-creator-close-button"/>
                <div>
                    <form onSubmit={this.handleEncounterCreate}>
                        <div className="form-input-container">
                            <FormControl
                                variant="outlined"
                                fullWidth>
                                <InputLabel
                                    id="encounterType-label">Type</InputLabel>
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
                                    }}>
                                    {this.createEncounterTypeMenuItems()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-input-container">
                            <TextField
                                name="note"
                                onChange={this.handleInputChange}
                                value={this.state.note}
                                label="Note"
                                multiline
                                rows={24}
                                variant="outlined"
                                inputProps={{
                                    required: true,
                                }}
                                fullWidth/>
                        </div>
                        <div className="form-button-container">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit">
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(EncounterCreator);
