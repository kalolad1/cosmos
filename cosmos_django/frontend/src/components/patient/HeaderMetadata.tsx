import * as React from 'react';

interface HeaderMetadataProps {
    fullName: string,
    sex: string,
    age: number,
}

class HeaderMetadata extends React.Component<HeaderMetadataProps, any> {
    render() {
        return (
            <div className="patient-header-metadata">
                <h1>{this.props.fullName}</h1>
                <p>{this.props.sex} &middot; {this.props.age} years old</p>
            </div>
        )
    }
}

export default HeaderMetadata;