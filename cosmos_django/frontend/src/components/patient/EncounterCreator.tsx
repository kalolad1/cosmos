import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import * as actionCreators from '../../actions/action_creators';
import * as modelConstants from '../../constants/model_constants';
import * as urlPathConstants from '../../constants/url_path_constants';
import * as textUtil from '../../util/text_util';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';

interface EncounterCreatorProps {
    history: any;
    dispatch: any;
}

interface EncounterCreatorState {
    encounterType: string;
    note: string;
}

class EncounterCreator extends React.Component<
    EncounterCreatorProps,
    EncounterCreatorState
> {
    constructor(props) {
        super(props);
        this.state = {
            encounterType: '',
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
        const self = this;
        this.props
            .dispatch(
                actionCreators.addEncounter(
                    this.state.encounterType,
                    this.state.note,
                    this.props.history
                )
            )
            .then(function () {
                self.props.history.replace(urlPathConstants.TIMELINE);
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

export default ReactRedux.connect()(
    ReactRouterDOM.withRouter(EncounterCreator)
);
