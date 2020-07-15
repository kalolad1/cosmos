import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

interface SearchBarProps {
    query: string;
    handleInputChange: any;
    handleSubmit: any;
    history: any;
}

class SearchBar extends React.Component<SearchBarProps, any> {
    constructor(props) {
        super(props);
    }

    handleInputChange(event: React.SyntheticEvent): void {
        const element = event.target as HTMLInputElement;
        const name: string = element.name;
        this.setState({
            ...this.state,
            [name]: element.value,
        });
    }

    render() {
        return (
            <Paper
                onSubmit={this.props.handleSubmit}
                component="form"
                className="search-bar"
            >
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className="search-bar-input-base"
                    name="query"
                    value={this.props.query}
                    onChange={this.props.handleInputChange}
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
