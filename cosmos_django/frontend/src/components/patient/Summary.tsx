import * as React from 'react';

import * as types from '../../types/types';


interface SummaryProps {
    user: types.User,
}


class Summary extends React.Component<SummaryProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                TODO IMPLEMENT
            </div>
        );
    }
}

export default Summary;
