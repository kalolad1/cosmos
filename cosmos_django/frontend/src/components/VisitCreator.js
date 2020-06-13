import React from "react";
import Form from "react-bootstrap/Form";

import {withRouter} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axiosClient from "../axiosClient";
import apiEndpoints from "../apiEndpoints";
import {sendLoginRequest} from "../authUtil";
import UrlPaths from "../urlPaths";
import CONSTANTS from "../constants";

const VISIT_OPTIONS = [
    {id: 1, name: 'physical'},
    {id: 2, name: 'illness'},
    {id: 3, name: 'vaccination'},
];

class VisitCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'visitType': VISIT_OPTIONS[0].name,
            'note': ''
        };

        this.handleExitClick = this.handleExitClick.bind(this);
        this.createVisitOptions = this.createVisitOptions.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleVisitCreate = this.handleVisitCreate.bind(this);
        this.getRequestHeader = this.getRequestHeader.bind(this);
    }

    handleExitClick(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    createVisitOptions() {
        return VISIT_OPTIONS.map(function (option) {
            return (
                <option key={option.id} value={option.name}>
                    {option.name}
                </option>
            );
        });
    }

    getRequestHeader() {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
            }
        }
    }

    handleVisitCreate(event) {
        event.preventDefault();
        let self = this;
        let requestData = {
            visitType: this.state.visitType,
            note: this.state.note,
        };
        axiosClient.post(apiEndpoints.VISITS, requestData, this.getRequestHeader())
            .then(function (response) {
                console.log('Visit created successfully.');
                self.props.history.goBack();
            });
    }

    render() {
        return (
            <div className="visit-creator">
                <a href="#" onClick={this.handleExitClick} className="visit-creator-close-button"/>
                <div>
                    <Form onSubmit={this.handleVisitCreate}>
                        <Form.Group>
                            <Form.Label>Visit type</Form.Label>
                            <Form.Control name="visitType" value={this.state.visitType} onChange={this.handleInputChange} as="select">
                                {this.createVisitOptions()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Note</Form.Label>
                            <Form.Control name="note" value={this.state.note} onChange={this.handleInputChange} placeholder="Enter note" as="textarea" rows="4"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withRouter(VisitCreator);
