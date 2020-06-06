import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from "./LoginForm";

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Cosmos Home</h1>
                <LoginForm />
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('app'));