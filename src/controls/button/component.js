import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import './index.scss';

const baseClassName = 'button';

class Button extends React.PureComponent {
    getClassNames = () => {
        const { className, disabled, theme } = this.props;

        const themeClassName = utils.getThemeClassName(baseClassName, theme);

        const componentClassName = utils.getClassName(
            baseClassName,
            themeClassName,
            className,
            [`${baseClassName}--disabled`, disabled]
        );

        return {
            component: componentClassName
        };
    };

    render() {
        const { disabled } = this.props;

        const classNames = this.getClassNames();

        const attributes = {};

        if (disabled) {
            attributes['aria-disabled'] = true;
            attributes.disabled = true;
        }

        return (
            <button
                {...attributes}
                className={classNames.component}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {this.props.children}
            </button>
        );
    }

    handleClick = (event) => {
        const { onClick } = this.props;

        if (onClick) {
            onClick(event);
        }
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

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    theme: utils.getThemePropType([
        'link'
    ]),
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onLostFocus: PropTypes.func
};

Button.defaultProps = {
    disabled: false
};

export default Button;
