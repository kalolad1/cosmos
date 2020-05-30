import React from 'react'

class PatientNavbar extends React.Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs nav-justified">
                    <li className="active"><a data-toggle="tab" href="#timeline">Timeline</a></li>
                    <li><a data-toggle="tab" href="#medications">Medications</a></li>
                    <li><a data-toggle="tab" href="#demographics">Demographics</a></li>
                </ul>
            </div>
        )
    }
}

export default PatientNavbar;