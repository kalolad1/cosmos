import * as React from 'react';

interface ProfilePanelHeaderProps {
    title: string;
}

class TitlePanelHeader extends React.Component<ProfilePanelHeaderProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className="title-panel-header-title">{this.props.title}</p>;
    }
}

export default TitlePanelHeader;
