import React from 'react'
import { withRouter } from 'react-router-dom';

import CONSTANTS from '../constants';

class PatientHome extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        // Wipe token from local storage.
        // TODO: Setup a blacklist on server side.
        console.log('LOGGING OUT!');
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <h1>Patient home</h1>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(PatientHome);
