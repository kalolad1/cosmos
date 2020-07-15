import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';

import Header from '../patient/Header';

interface SearchResultsViewProps {
    results: Array<modelTypes.PatientProfile>;
}

class SearchResultsView extends React.Component<SearchResultsViewProps, any> {
    constructor(props) {
        super(props);
        this.getResultItems = this.getResultItems.bind(this);
    }

    getResultItems() {
        return this.props.results.map(function (result) {
            return (
                <Header
                    key={result.id}
                    profilePicture={result.profilePicture}
                    firstName={result.firstName}
                    lastName={result.lastName}
                    sex={result.sex}
                    age={result.age}
                    resultVariant={true}
                />
            );
        });
    }

    render() {
        return <div>{this.getResultItems()}</div>;
    }
}

export default SearchResultsView;
