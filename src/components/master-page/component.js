import React from 'react';

import './index.scss';

class MasterPage extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default MasterPage;
