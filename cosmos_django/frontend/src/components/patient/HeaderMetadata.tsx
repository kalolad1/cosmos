/* Metadata included in the left portion of the Header. */
import * as React from 'react';

import * as textUtil from '../../util/text_util';

interface HeaderMetadataProps {
    first_name: string;
    last_name: string;
    sex: string;
    age: number;
}

class HeaderMetadata extends React.Component<HeaderMetadataProps, any> {
    render() {
        return (
            <div className="patient-header-metadata">
                <h1>
                    {textUtil.createFullName(
                        this.props.first_name,
                        this.props.last_name
                    )}
                </h1>
                <p>
                    {this.props.sex} &middot; {this.props.age} years old
                </p>
            </div>
        );
    }
}

export default HeaderMetadata;
