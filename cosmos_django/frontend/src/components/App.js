import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>React App</h1>
                <a href={'http://localhost:8000/account/logout'}>Logout</a>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));