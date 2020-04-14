import React from 'react';
import PropTypes from 'prop-types';

import utils from 'common/utils';

import './index.scss';

const baseClassName = 'input';

class Input extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text || ''
        };
    }

    componentDidUpdate(prevProps) {
        const textChanged = (prevProps.text !== this.props.text);
        const text = this.props.text || '';
        const shouldUpdateText = textChanged && this.state.text !== text;

        if (shouldUpdateText) {
            this.setState({
                text
            });
        }
    }

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
        const {
            type, disabled, placeholder, multiline, maxLength, autocomplete
        } = this.props;
        const {
            text
        } = this.state;

        const classNames = this.getClassNames();

        const extraProps = {};
        let output;

        if (autocomplete) {
            extraProps.autoComplete = autocomplete;
        }

        if (multiline) {
            output = (
                <textarea
                    aria-disabled={disabled}
                    className={classNames.component}
                    value={text}
                    disabled={disabled}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    {...extraProps}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleKeyPress}
                />
            );
        } else {
            output = (
                <input
                    aria-disabled={disabled}
                    type={type}
                    className={classNames.component}
                    value={text}
                    disabled={disabled}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    {...extraProps}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleKeyPress}
                />
            );
        }

        return output;
    }

    handleChange = (event) => {
        const { onChanged } = this.props;
        const text = event.target.value;

        this.setState({
            text
        });

        if (onChanged) {
            onChanged(text);
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

    handleKeyPress = (event) => {
        const { onKeyPress } = this.props;

        if (onKeyPress) {
            onKeyPress(event);
        }
    };
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    maxLength: PropTypes.number,
    autocomplete: PropTypes.string,
    theme: utils.getThemePropType([
        'error',
        'success'
    ]),
    onChanged: PropTypes.func,
    onFocus: PropTypes.func,
    onLostFocus: PropTypes.func,
    onKeyPress: PropTypes.func
};

Input.defaultProps = {
    type: 'text',
    disabled: false
};

export default Input;
