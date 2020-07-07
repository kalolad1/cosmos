/* Metadata included in the left portion of the Header. */
import * as React from 'react';

import * as textUtil from '../../util/text_util';

interface HeaderMetadataProps {
    firstName: string;
    lastName: string;
    sex: string;
    age: number;
}

class HeaderMetadata extends React.Component<HeaderMetadataProps, any> {
    render() {
        return (
            <div className="patient-header-metadata">
                <h1>
                    {textUtil.createFullName(
                        this.props.firstName,
                        this.props.lastName
                    )}
                </h1>
                <p>
                    {textUtil.capitalizeFirstLetter(this.props.sex)} &middot; {this.props.age} years old
                </p>
            </div>
        );
    }
}

export default HeaderMetadata;
