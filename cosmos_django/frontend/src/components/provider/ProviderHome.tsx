import * as React from 'react';

import * as types from '../../types/types';

interface ProviderHomeProps {
    user: types.User;
}

class ProviderHome extends React.Component<ProviderHomeProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Provider home.</div>;
    }
}

export default ProviderHome;
