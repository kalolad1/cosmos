import * as React from 'react'
import * as ReactRouterDOM from 'react-router-dom';

import * as patientApi from '../../api/patient_api';
import * as axiosConfig from '../../configs/axios_config';
import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as authUtil from '../../util/auth_util';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";


const VISIT_OPTIONS = [
    {id: 1, value: 'physical', humanReadable: 'Physical'},
    {id: 2, value: 'illness', humanReadable: 'Illness'},
    {id: 3, value: 'vaccination', humanReadable: 'Vaccination'},
];

interface VisitCreatorProps {
    history: any,
}

interface VisitCreatorState {
    visitType: string,
    note: string,
}


class VisitCreator extends React.Component<VisitCreatorProps, VisitCreatorState> {
    constructor(props) {
        super(props);
        this.state = {
            'visitType': '',
            'note': ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createVisitTypeMenuItems = this.createVisitTypeMenuItems.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleVisitCreate = this.handleVisitCreate.bind(this);
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

    createVisitTypeMenuItems() {
        return VISIT_OPTIONS.map(function (option) {
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

    handleVisitCreate(event: React.SyntheticEvent): void {
        event.preventDefault();
        let self = this;

        patientApi.createVisit(
            this.state.visitType,
            this.state.note,
            this.props.history)
            .then(function () {
                console.log('Visit created successfully.');
                self.props.history.goBack();
            });
    }

    handleExitClick(event: React.SyntheticEvent): void {
        event.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="visit-creator">
                <a
                    href="#"
                    onClick={this.handleExitClick}
                    className="visit-creator-close-button"/>
                <div>
                    <form onSubmit={this.handleVisitCreate}>
                        <div className="form-input-container">
                            <FormControl
                                variant="outlined"
                                className="form-input-field">
                                <InputLabel
                                    id="visitType-label">Type</InputLabel>
                                <Select
                                    displayEmpty
                                    labelId="visitType-label"
                                    id="visitType"
                                    name="visitType"
                                    value={this.state.visitType}
                                    onChange={this.handleSelectChange}
                                    label="Type">
                                    {this.createVisitTypeMenuItems()}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-input-container">
                            <TextField
                                className="form-input-field"
                                name="note"
                                onChange={this.handleInputChange}
                                value={this.state.note}
                                label="Note"
                                multiline
                                rows={24}
                                variant="outlined"/>
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

export default ReactRouterDOM.withRouter(VisitCreator);
