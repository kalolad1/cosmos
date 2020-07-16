import * as React from 'react';

import * as modelTypes from '../../types/modelTypes';

import Header from '../patient/Header';
import SearchResultItem from './SearchResultItem';

interface SearchResultsViewProps {
    results: Array<modelTypes.LimitedUser>;
}

class SearchResultsView extends React.Component<SearchResultsViewProps, any> {
    constructor(props) {
        super(props);
        this.getResultItems = this.getResultItems.bind(this);
    }

    getResultItems() {
        return this.props.results.map(function (result) {
            return (
                <SearchResultItem
                    key={result.id}
                    profilePicture={result.patientProfile.profilePicture}
                    firstName={result.patientProfile.firstName}
                    lastName={result.patientProfile.lastName}
                    sex={result.patientProfile.sex}
                    age={result.patientProfile.age}
                    userId={result.id}
                />
            );
        });
    }

    render() {
        return <div>{this.getResultItems()}</div>;
    }
}

export default SearchResultsView;
