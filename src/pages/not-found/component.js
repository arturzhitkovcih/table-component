import React from 'react';

import './index.scss';

const baseClassName = 'not-found-page';

class NotFoundPage extends React.PureComponent {
    getClassNames = () => {
        return {
            component: baseClassName,
            content: `${baseClassName}__content`
        };
    };

    render() {
        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
                <div className={classNames.content}>
                    Not found page
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
