import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

class FullPageSpinner extends React.Component<any, any> {
    render() {
        return (
            <div className="full-page-spinner-container">
                <CircularProgress
                    className="full-page-spinner"
                    color="secondary"
                />
            </div>
        );
    }
}

export default FullPageSpinner;
