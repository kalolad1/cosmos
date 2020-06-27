import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as urlPathConstants from '../../constants/url_path_constants';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import FullPageSpinner from '../shared/FullPageSpinner';

const ENCOUNTER_TYPE_OPTIONS = [
    { id: 1, value: 'physical', humanReadable: 'Physical' },
    { id: 2, value: 'illness', humanReadable: 'Illness' },
    { id: 3, value: 'vaccination', humanReadable: 'Vaccination' },
];

interface EncounterCreatorProps {
    history: any;
    dispatch: any;
    isCreatingEncounter: boolean;
}

interface EncounterCreatorState {
    encounter_type: string;
    note: string;
}

class EncounterCreator extends React.Component<
    EncounterCreatorProps,
    EncounterCreatorState
> {
    constructor(props) {
        super(props);
        this.state = {
            encounter_type: '',
            note: '',
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
        return ENCOUNTER_TYPE_OPTIONS.map(function (option) {
            return (
                <MenuItem key={option.id} value={option.value}>
                    {option.humanReadable}
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
        const self = this;
        this.props
            .dispatch(
                actionCreators.addEncounter(
                    this.state.encounter_type,
                    this.state.note,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.HOME);
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
                    className="encounter-creator-close-button"
                />
                <div>
                    <form onSubmit={this.handleEncounterAdd}>
                        <div className="form-input-container">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel id="encounterType-label">
                                    Type
                                </InputLabel>
                                <Select
                                    displayEmpty
                                    labelId="encounterType-label"
                                    id="encounter_type"
                                    name="encounter_type"
                                    value={this.state.encounter_type}
                                    onChange={this.handleSelectChange}
                                    label="Type"
                                    inputProps={{
                                        required: true,
                                    }}
                                >
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
                                fullWidth
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

function mapStateToProps(state) {
    return {
        isCreatingEncounter: state.isCreatingEncounter,
    };
}

export default ReactRedux.connect(mapStateToProps)(
    ReactRouterDOM.withRouter(EncounterCreator)
);
