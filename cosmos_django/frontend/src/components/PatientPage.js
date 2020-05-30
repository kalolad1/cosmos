import React from 'react'

class PatientPage extends React.Component {
    render() {
        return (
            <div>
                <h1>React App</h1>
                {/*<PatientHead />*/}
                {/*<PatientNavbar />*/}
                {/*<Timeline />*/}
                <a href={'http://localhost:8000/account/logout'}>Logout</a>
            </div>
        )
    }
}

export default PatientPage;