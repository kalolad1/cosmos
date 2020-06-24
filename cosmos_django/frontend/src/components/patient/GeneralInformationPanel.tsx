import * as React from 'react';

import Panel from '../shared/Panel';
import {TextField} from "@material-ui/core";


class GeneralInformationPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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
        const children = [
            <TextField
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email}
                label="Email"
                type="email"
                variant="outlined"
                inputProps={{
                    required: true,
                }}
                fullWidth/>,
        ];
        return <Panel children={children}/>
    }
}

export default GeneralInformationPanel;