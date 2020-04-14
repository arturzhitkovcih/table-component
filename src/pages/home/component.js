import React from 'react';

import api from 'common/api';

import Button from 'controls/button';

import './index.scss';

const baseClassName = 'home-page';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        this.loadData();
    }

    getClassNames = () => {
        return {
            component: baseClassName,
            header: `${baseClassName}__header`
        };
    };

    render() {
        const classNames = this.getClassNames();

        return (
            <div className={classNames.component}>
                Hi
            </div>
        );
    }

    loadData = () => {
        const { filter } = this.state;

        api.loadEmployees(filter)
            .then((employees) => {
                this.setState({
                    employees
                });
            });
    };
}

export default HomePage;
