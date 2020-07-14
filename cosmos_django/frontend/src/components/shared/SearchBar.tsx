import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import * as urlPathConstants from '../../constants/url_path_constants';
import * as urlUtil from '../../util/url_util';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

interface SearchBarProps {
    history: any;
}

interface SearchBarState {
    query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.query === '') {
            return;
        }
        const searchUrl = urlUtil.getUrlPathWithQueryParams(
            urlPathConstants.SEARCH_RESULTS,
            this.state.query
        );
        this.props.history.push(searchUrl);
    }

    render() {
        return (
            <Paper
                onSubmit={this.handleSubmit}
                component="form"
                className="search-bar"
            >
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className="search-bar-input-base"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    placeholder="Search for a patient"
                    inputProps={{
                        'aria-label': 'search',
                        className: 'search-bar-input',
                    }}
                />
            </Paper>
        );
    }
}

export default ReactRouterDOM.withRouter(SearchBar);
