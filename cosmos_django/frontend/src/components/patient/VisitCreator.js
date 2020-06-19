import * as React from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import * as ReactRouterDOM from 'react-router-dom';

import * as apiEndpointConstants from '../../constants/api_endpoint_constants';
import * as axiosConfig from '../../configs/axios_config';
import * as authUtil from '../../util/auth_util';

import ReactBootstrapButton from 'react-bootstrap/Button';
import ReactBootstrapForm from 'react-bootstrap/Form';


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

    handleVisitCreate(event) {
        event.preventDefault();
        let self = this;
        let requestData = {
            visitType: this.state.visitType,
            note: this.state.note,
        };
        axiosConfig.axiosClient.post(apiEndpointConstants.VISITS, requestData, authUtil.getRequestHeaderWithAuthorization())
            .then(function () {
                console.log('Visit created successfully.');
                self.props.history.goBack();
            });
    }

    render() {
        return (
            <div className="visit-creator">
                <a href="#" onClick={this.handleExitClick} className="visit-creator-close-button"/>
                <div>
                    <ReactBootstrapForm onSubmit={this.handleVisitCreate}>
                        <ReactBootstrapForm.Group>
                            <ReactBootstrapForm.Label>Visit type</ReactBootstrapForm.Label>
                            <ReactBootstrapForm.Control name="visitType" value={this.state.visitType} onChange={this.handleInputChange} as="select">
                                {this.createVisitOptions()}
                            </ReactBootstrapForm.Control>
                        </ReactBootstrapForm.Group>
                        <ReactBootstrapForm.Group>
                            <ReactBootstrapForm.Label>Note</ReactBootstrapForm.Label>
                            <ReactBootstrapForm.Control name="note" value={this.state.note} onChange={this.handleInputChange} placeholder="Enter note" as="textarea" rows="4"/>
                        </ReactBootstrapForm.Group>
                        <ReactBootstrapButton variant="primary" type="submit">
                            Create
                        </ReactBootstrapButton>
                    </ReactBootstrapForm>
                </div>
            </div>
        )
    }
}

export default ReactRouterDOM.withRouter(VisitCreator);
