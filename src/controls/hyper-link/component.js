import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import './index.scss';

const baseClassName = 'hyper-link';

class HyperLink extends React.PureComponent {
    getClassNames = () => {
        const { className, disabled } = this.props;

        const componentClassName = utils.getClassName(
            baseClassName,
            className,
            [`${baseClassName}--disabled`, disabled]
        );

        return {
            component: componentClassName
        };
    };

    render() {
        const { external } = this.props;

        const classNames = this.getClassNames();
        let output;

        if (external) {
            output = this.renderExternalLink(classNames);
        } else {
            output = this.renderInternalLink(classNames);
        }

        return output;
    }

    renderExternalLink = (classNames) => {
        const { to, disabled, target } = this.props;

        return (
            <a
                aria-disabled={disabled}
                className={classNames.component}
                href={to}
                target={target}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {this.props.children}
            </a>
        );
    };

    renderInternalLink = (classNames) => {
        const {
            to, disabled, target, navigation
        } = this.props;

        let output;

        if (navigation) {
            output = (
                <NavLink
                    aria-disabled={disabled}
                    disabled={disabled}
                    className={classNames.component}
                    to={to}
                    target={target}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {this.props.children}
                </NavLink>
            );
        } else {
            output = (
                <Link
                    aria-disabled={disabled}
                    disabled={disabled}
                    className={classNames.component}
                    to={to}
                    target={target}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    {this.props.children}
                </Link>
            );
        }

        return output;
    };

    handleFocus = () => {
        const { onFocus } = this.props;

        if (onFocus) {
            onFocus();
        }
    };

    handleBlur = () => {
        const { onLostFocus } = this.props;

        if (onLostFocus) {
            onLostFocus();
        }
    };
}

HyperLink.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            pathname: PropTypes.string,
            search: PropTypes.string,
            state: PropTypes.object
        })
    ]).isRequired,
    target: PropTypes.string,
    external: PropTypes.bool,
    navigation: PropTypes.bool,
    onFocus: PropTypes.func,
    onLostFocus: PropTypes.func
};

HyperLink.defaultProps = {
    disabled: false
};

export default HyperLink;
