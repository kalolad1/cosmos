import * as queryString from 'query-string';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as searchApi from '../../api/search_api';
import * as modelTypes from '../../types/modelTypes';
import SearchResultsView from './SearchResultsView';

interface SearchResultsContainerProps {
    location: any;
    history: any;
}

interface SearchResultsContainerState {
    isLoading: boolean;
    results: Array<modelTypes.PatientProfile>;
}

let stopListening;

class SearchResultsContainer extends React.Component<
    SearchResultsContainerProps,
    SearchResultsContainerState
> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            results: [],
        };
        this.sendSearchRequest = this.sendSearchRequest.bind(this);

        this.sendSearchRequest(this.props.history.location);
        stopListening = this.props.history.listen((location, action) => {
            this.sendSearchRequest(location);
        });
    }

    sendSearchRequest(location) {
        const query = String(queryString.parse(location.search)['q']);
        const self = this;
        // Call an API from search_api.ts here.
        searchApi.search(query).then(function (response) {
            self.setState({
                isLoading: false,
                results: response.data,
            });
        });
    }

    componentWillUnmount(): void {
        stopListening();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
        return <SearchResultsView results={this.state.results} />;
    }
}

export default ReactRouterDOM.withRouter(SearchResultsContainer);
