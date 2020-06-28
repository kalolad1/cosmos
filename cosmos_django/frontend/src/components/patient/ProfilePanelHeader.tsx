import * as React from 'react';

interface ProfilePanelHeaderProps {
    title: string;
}

class ProfilePanelHeader extends React.Component<ProfilePanelHeaderProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className="profile-panel-header-title">{this.props.title}</p>;
    }
}

export default ProfilePanelHeader;
