import React from 'react';
import ReactDOM from 'react-dom';

import PatientPage from './PatientPage'

class App extends React.Component {
    render() {
        return (
            <div>
                <PatientPage />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
