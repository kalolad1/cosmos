import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as patientApi from '../../api/patient_api';
import * as modelTypes from '../../types/modelTypes';
import Charts from '../patient/Charts';

interface PatientViewContainerState {
    isLoading: boolean;
    user: modelTypes.User | null;
}

class PatientViewContainer extends React.Component<
    any,
    PatientViewContainerState
> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user: null,
        };
    }

    componentDidMount() {
        const self = this;
        patientApi
            .getUserWithId(this.props.match.params.id)
            .then(function (response) {
                self.setState({
                    isLoading: false,
                    user: response.data,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
        return <Charts user={this.state.user} />;
    }
}

export default ReactRouterDOM.withRouter(PatientViewContainer);
