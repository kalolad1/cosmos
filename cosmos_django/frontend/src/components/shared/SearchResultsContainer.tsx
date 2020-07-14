import * as queryString from 'query-string';
import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as searchApi from '../../api/search_api';

interface SearchResultsContainerProps {
    location: any;
    history: any;
}

interface SearchResultsContainerState {
    isLoading: boolean;
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
        };
        this.sendSearchRequest = this.sendSearchRequest.bind(this);
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
            });
        });
        // Pass the items to the search results view. Let it handle the display.
    }

    componentWillUnmount(): void {
        stopListening();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }
        return <div>Search results.</div>;
    }
}

export default ReactRouterDOM.withRouter(SearchResultsContainer);
