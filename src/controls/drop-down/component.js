import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

import utils from 'common/utils';

import './index.scss';

import iconDropUp from 'icons/drop-up.svg';
import iconDropDown from 'icons/drop-down.svg';

const baseClassName = 'drop-down';

class DropDown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.componentRef = React.createRef();
        this.inputRef = React.createRef();
        this.listRef = React.createRef();

        const state = this.createState(props.selectedValue, props.selectedText, props.items);

        this.state = {
            ...state,
            filterText: '',
            expanded: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('touchstart', this.handleMouseDown);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('touchstart', this.handleMouseDown);
    }

    componentDidUpdate(prevProps) {
        const { selectedText, selectedValue, items } = this.props;

        const selectedTextChanged = (prevProps.selectedText !== selectedText);
        const selectedValueChanged = (prevProps.selectedValue !== selectedValue);
        const itemsChanged = (prevProps.items !== items);

        const shouldUpdateSelectedText = selectedTextChanged && this.state.selectedText !== selectedText;
        const shouldUpdateSelectedValue = selectedValueChanged && this.state.selectedValue !== selectedValue;
        const shouldUpdateItems = itemsChanged && this.state.items !== items;

        if (shouldUpdateSelectedText || shouldUpdateSelectedValue || shouldUpdateItems) {
            let newSelectedValue;
            let newSelectedText;
            let newItems;

            if (isNil(selectedValue)) {
                newSelectedValue = this.state.selectedValue;
            } else {
                newSelectedValue = selectedValue;
            }

            if (isNil(selectedText)) {
                newSelectedText = this.state.selectedText;
            } else {
                newSelectedText = selectedText;
            }

            if (isNil(items)) {
                newItems = this.state.items;
            } else {
                newItems = items;
            }

            const state = this.createState(newSelectedValue, newSelectedText, newItems);

            this.setState(state);
        }
    }

    getClassNames = () => {
        const { className, disabled, theme } = this.props;
        const { expanded } = this.state;

        const themeClassName = utils.getThemeClassName(baseClassName, theme);

        const componentClassName = utils.getClassName(
            baseClassName,
            themeClassName,
            className,
            [`${baseClassName}--disabled`, disabled],
            [`${baseClassName}--expanded`, expanded]
        );

        return {
            component: componentClassName,
            content: `${baseClassName}__content`,
            input: `${baseClassName}__input`,
            inputBackground: `${baseClassName}__input-background`,
            inputIcon: `${baseClassName}__input-icon`,
            items: `${baseClassName}__items`,
            item: `${baseClassName}__item`
        };
    };

    render() {
        const classNames = this.getClassNames();

        const inputOutput = this.renderInput(classNames);
        const listOutput = this.renderList(classNames);

        return (
            <div ref={this.componentRef} className={classNames.component}>
                {inputOutput}
                {listOutput}
            </div>
        );
    }

    renderInput = (classNames) => {
        const { placeholder, editable, renderInput } = this.props;
        const { selectedText, expanded } = this.state;

        let inputOutput;
        let icon;
        let backgroundOutput;
        let inputAttributes;

        if (expanded) {
            icon = iconDropUp;
        } else {
            icon = iconDropDown;
        }

        if (!editable) {
            inputAttributes = {
                readOnly: true
            };

            backgroundOutput = (
                <div className={classNames.inputBackground} />
            );
        }

        if (renderInput) {
            inputOutput = renderInput();
        }

        return (
            <label role="listbox" className={classNames.content}>
                {inputOutput}
                <input
                    {...inputAttributes}
                    ref={this.inputRef}
                    type="text"
                    className={classNames.input}
                    value={selectedText}
                    placeholder={placeholder}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyDown}
                    onFocus={this.handleInputFocus}
                    onBlur={this.handleComponentBlur}
                />
                <img className={classNames.inputIcon} src={icon} alt="" />
                {backgroundOutput}
            </label>
        );
    };

    renderList = (classNames) => {
        const { items, selectedIndex, filterText } = this.state;
        const renderItem = this.props.renderItem || this.renderItem;
        let output;
        let displayedItems;

        if (filterText) {
            displayedItems = items.filter((item) => {
                const itemText = this.getItemText(item);

                return itemText.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
            });
        } else {
            displayedItems = items;
        }

        if (displayedItems.length) {
            const itemsOutput = displayedItems.map((item, index) => {
                const selected = (index === selectedIndex);

                const itemClassName = utils.getClassName(
                    classNames.item,
                    [`${classNames.item}--selected`, selected]
                );

                const itemValue = this.getItemValue(item);
                const onMouseDown = this.handleListItemMouseDown(classNames, itemValue);

                return (
                    <li
                        role="option"
                        aria-selected={selected}
                        className={itemClassName}
                        key={index}
                        onMouseDown={onMouseDown}
                        onTouchStart={onMouseDown}
                    >
                        {renderItem(item)}
                    </li>
                );
            });

            output = (
                <ul
                    tabIndex="-1"
                    ref={this.listRef}
                    className={classNames.items}
                    onFocus={this.handleListFocus}
                    onBlur={this.handleComponentBlur}
                    onKeyDown={this.handleListKeyDown}
                >
                    {itemsOutput}
                </ul>
            );
        }

        return output;
    };

    renderItem = (item) => {
        const itemText = this.getItemText(item);

        return (
            <>
                {itemText}
            </>
        );
    };

    handleInputChange = (event) => {
        const { editable, onTextChanged } = this.props;

        const selectedText = event.target.value;
        let filterText;

        if (editable) {
            filterText = selectedText;
        }

        this.setState({
            selectedText: selectedText,
            filterText: filterText
        });

        if (editable && onTextChanged) {
            onTextChanged(selectedText);
        }
    };

    handleInputKeyDown = (event) => {
        const { disabled, editable } = this.props;
        const { expanded, items, selectedIndex } = this.state;

        let newSelectedIndex;

        switch (event.keyCode) {
            case 27: // Esc
                if (expanded) {
                    this.setState({
                        expanded: false
                    });
                    break;
                } else {
                    return;
                }

            case 32: // Space
                if (!disabled && !editable) {
                    this.setState({
                        expanded: !expanded
                    });
                    break;
                } else {
                    return;
                }

            case 38: // Up
                if (!disabled && items.length) {
                    if (expanded) {
                        if (selectedIndex > 0) {
                            newSelectedIndex = selectedIndex - 1;
                        } else {
                            newSelectedIndex = items.length - 1;
                        }

                        this.setState({
                            selectedIndex: newSelectedIndex
                        });
                    }

                    this.listRef.current.focus();

                    this.setState({
                        expanded: true
                    });
                }
                break;

            case 40: // Down
                if (!disabled && items.length) {
                    if (expanded) {
                        if (selectedIndex > -1 && selectedIndex < items.length - 1) {
                            newSelectedIndex = selectedIndex + 1;
                        } else {
                            newSelectedIndex = 0;
                        }

                        this.listRef.current.focus();

                        this.setState({
                            selectedIndex: newSelectedIndex
                        });
                    }

                    this.setState({
                        expanded: true
                    });
                }
                break;

            default:
                return;
        }

        event.preventDefault();
        event.stopPropagation();
    };

    handleInputFocus = () => {
        const { editable, disabled } = this.props;
        const { items } = this.state;

        if (!editable && window.getSelection) {
            window.getSelection().removeAllRanges();
        }

        this.focused = true;

        if (!disabled && items.length) {
            this.setState({
                expanded: true
            });
        }
    };

    handleListFocus = () => {
        this.focused = true;
    };

    handleComponentBlur = () => {
        const { editable, onLostFocus } = this.props;

        this.focused = false;

        setTimeout(() => {
            if (!this.focused) {
                let selectedValue = this.state.selectedValue;

                if (editable) {
                    selectedValue = this.selectItemByText(this.inputRef.current.value);
                }

                this.setState({
                    expanded: false
                });

                if (onLostFocus) {
                    onLostFocus(selectedValue);
                }
            }
        });
    };

    handleListKeyDown = (event) => {
        const { selectedIndex, items } = this.state;

        let newSelectedIndex;

        switch (event.keyCode) {
            case 27: // Esc
                this.inputRef.current.focus();

                this.setState({
                    expanded: false
                });
                break;

            case 13:
            case 32: // Space
                this.selectItemByIndex(selectedIndex);

                this.inputRef.current.focus();

                this.setState({
                    expanded: false
                });
                break;

            case 38: // Up
                if (items.length) {
                    if (selectedIndex > 0) {
                        newSelectedIndex = selectedIndex - 1;
                    } else {
                        newSelectedIndex = items.length - 1;
                    }

                    this.setState({
                        selectedIndex: newSelectedIndex
                    });
                }
                break;

            case 40: // Down
                if (items.length) {
                    if (selectedIndex > -1 && selectedIndex < items.length - 1) {
                        newSelectedIndex = selectedIndex + 1;
                    } else {
                        newSelectedIndex = 0;
                    }

                    this.setState({
                        selectedIndex: newSelectedIndex
                    });
                }
                break;

            default:
                return;
        }

        event.preventDefault();
        event.stopPropagation();
    };

    handleListItemMouseDown = (classNames, value) => (event) => {
        const { items } = this.state;

        if (event.button !== 0) {
            return;
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemValue = this.getItemValue(item);

            if (String(itemValue) === String(value)) {
                this.selectItemByIndex(i);

                this.setState({
                    expanded: false
                });

                break;
            }
        }
    };

    handleMouseDown = (event) => {
        if (this.componentRef.current.contains(event.target)) {
            return;
        }

        if (this.focused) {
            this.handleComponentBlur();
        }
    };

    createState = (selectedValue, selectedText, items) => {
        const state = {
            selectedIndex: -1,
            selectedText: '',
            selectedValue: ''
        };

        if (Array.isArray(items)) {
            state.items = items;
        } else if (items) {
            state.items = [items];
        } else {
            state.items = [];
        }

        if (!isNil(selectedValue)) {
            for (let i = 0; i < state.items.length; i++) {
                const item = state.items[i];
                const itemValue = this.getItemValue(item);
                const itemText = this.getItemText(item);

                if (String(itemValue) === String(selectedValue)) {
                    state.selectedText = itemText;
                    state.selectedValue = itemValue;
                    state.selectedIndex = i;
                    break;
                }
            }
        } else if (!isNil(selectedText)) {
            state.selectedText = selectedText;
        }

        return state;
    };

    selectItemByText = (selectedText) => {
        const { items, selectedIndex } = this.state;

        const selectedItem = items[selectedIndex];
        let newSelectedIndex = -1;

        if (selectedItem && this.getItemText(selectedItem) === selectedText) {
            newSelectedIndex = selectedIndex;
        } else {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const itemText = this.getItemText(item);

                if (selectedText && itemText && itemText.substr(0, selectedText.length) === selectedText) {
                    newSelectedIndex = i;
                    break;
                }
            }
        }

        return this.selectItemByIndex(newSelectedIndex);
    };

    selectItemByIndex = (selectedIndex) => {
        const { editable, onTextChanged, onValueChanged } = this.props;
        const { items } = this.state;

        const item = items[selectedIndex];
        let selectedValue;
        let selectedText;

        if (item) {
            selectedValue = this.getItemValue(item);
            selectedText = this.getItemText(item);
        } else {
            selectedText = '';
        }

        this.setState({
            selectedValue: selectedValue,
            selectedText: selectedText,
            selectedIndex: selectedIndex,
            filterText: ''
        });

        if (editable && onTextChanged) {
            onTextChanged(selectedText, selectedValue);
        }

        if (onValueChanged) {
            onValueChanged(selectedValue);
        }

        return selectedValue;
    };

    getItemValue = (item) => {
        const { itemValueField } = this.props;

        return item[itemValueField || 'value'];
    };

    getItemText = (item) => {
        const { itemTextField } = this.props;

        return item[itemTextField || 'text'];
    };
}

DropDown.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    editable: PropTypes.bool,
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    selectedValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    selectedText: PropTypes.string,
    itemValueField: PropTypes.string,
    itemTextField: PropTypes.string,
    renderInput: PropTypes.func,
    renderItem: PropTypes.func,
    theme: utils.getThemePropType([
        'error',
        'success'
    ]),
    onValueChanged: PropTypes.func,
    onTextChanged: PropTypes.func,
    onFocus: PropTypes.func,
    onLostFocus: PropTypes.func
};

DropDown.defaultProps = {
    disabled: false
};

export default DropDown;
