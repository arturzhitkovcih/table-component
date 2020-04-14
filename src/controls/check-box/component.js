import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import './index.scss';

import iconCheckOn from 'icons/check-on.svg';

const baseClassName = 'check-box';

class CheckBox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        };
    }

    componentDidUpdate(prevProps) {
        const { checked } = this.props;

        const checkedChanged = (prevProps.checked !== checked);
        const shouldUpdateChecked = checkedChanged && this.state.checked !== checked;

        if (shouldUpdateChecked) {
            this.setState({
                checked
            });
        }
    }

    getClassNames = () => {
        const { className, disabled, theme } = this.props;
        const { checked } = this.state;

        const themeClassName = utils.getThemeClassName(baseClassName, theme);

        const componentClassName = utils.getClassName(
            baseClassName,
            themeClassName,
            className,
            [`${baseClassName}--checked`, checked],
            [`${baseClassName}--disabled`, disabled]
        );

        return {
            component: componentClassName,
            value: `${baseClassName}__value`,
            valueIcon: `${baseClassName}__value-icon`
        };
    };

    render() {
        const { disabled } = this.props;
        const { checked } = this.state;

        const classNames = this.getClassNames();

        const valueOutput = this.renderValue(classNames);

        return (
            <div
                className={classNames.component}
                tabIndex="0"
                role="checkbox"
                aria-checked={checked}
                aria-disabled={disabled}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                {valueOutput}
                {this.props.children}
            </div>
        );
    }

    renderValue = (classNames) => {
        const { checked } = this.state;

        let output;

        if (checked) {
            output = (
                <img className={classNames.valueIcon} src={iconCheckOn} alt="" />
            );
        }

        return (
            <div className={classNames.value}>
                {output}
            </div>
        );
    };

    handleClick = () => {
        this.toggleChecked();
    };

    handleKeyDown = (event) => {
        const keyCode = event.keyCode;

        if (keyCode === 32) {
            event.preventDefault();
            this.toggleChecked();
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

    toggleChecked = () => {
        const { checked } = this.state;
        const { disabled, onCheckedChanged } = this.props;

        if (disabled) {
            return;
        }

        const newChecked = !checked;

        this.setState({
            checked: newChecked
        });

        if (onCheckedChanged) {
            onCheckedChanged(newChecked);
        }
    };
}

CheckBox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    theme: utils.getThemePropType([
        'error',
        'success'
    ]),
    onCheckedChanged: PropTypes.func,
    onFocus: PropTypes.func,
    onLostFocus: PropTypes.func
};

CheckBox.defaultProps = {
    checked: false,
    disabled: false
};

export default CheckBox;
