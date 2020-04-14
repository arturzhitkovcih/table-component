import constants from 'common/constants';

const utils = {};

/**
 * @typedef {Array.<{0: String, 1: Boolean}>} ClassNameArray
 */

/**
 * Gets a combined className.
 *
 * @param {String|ClassNameArray} [args] - Parameters object which contains classNames or a className string.
 *
 * @returns String - ClassName string which contains combined classNames.
 */
utils.getClassName = (...args) => {
    let classNames = [];

    for (let i = 0; i < args.length; i++) {
        let arg = args[i];

        if (arg) {
            if (Array.isArray(arg)) {
                if (arg[0] && arg[1]) {
                    classNames.push(arg[0]);
                }
            } else {
                classNames.push(arg);
            }
        }
    }

    return classNames.join(' ');
};

/**
 * Gets a PropTypes custom validation method.
 *
 * @param {Array} themes - Array which contains all possible themes.
 *
 * @returns Function - Function which implements a PropTypes custom validation.
 */
utils.getThemePropType = (themes) => {
    return (props, propName) => {
        const propValue = props[propName] || '';

        propValue.split(' ').every((propTheme) => {
            return themes.indexOf(propTheme) !== -1;
        });
    };
};

/**
 * Gets a component theme className.
 *
 * @param {String} baseClassName - Component base className.
 * @param {String} theme - ClassName which contains themes separated by space symbol.
 *
 * @returns String - Component className combined with themes.
 */
utils.getThemeClassName = (baseClassName, theme) => {
    let themeClassName;

    if (theme) {
        const themeClassNames = theme.split(' ').map((themeClass) => {
            return `${baseClassName}--theme-${themeClass}`;
        });

        themeClassName = themeClassNames.join(' ');
    }

    return themeClassName;
};

/**
 * Gets the current screen size.
 *
 * @returns SCREEN_SIZE - Current screen size.
 */
utils.getScreenSize = () => {
    let screenSize;

    if (window.innerWidth < constants.SCREEN_SIZE.SIZE_480) {
        screenSize = constants.SCREEN_SIZE.SIZE_320;
    } else if (window.innerWidth < constants.SCREEN_SIZE.SIZE_768) {
        screenSize = constants.SCREEN_SIZE.SIZE_480;
    } else if (window.innerWidth < constants.SCREEN_SIZE.SIZE_1080) {
        screenSize = constants.SCREEN_SIZE.SIZE_768;
    } else if (window.innerWidth < constants.SCREEN_SIZE.SIZE_1440) {
        screenSize = constants.SCREEN_SIZE.SIZE_1080;
    } else {
        screenSize = constants.SCREEN_SIZE.SIZE_1440;
    }

    return screenSize;
};

utils.saveFile = (filePath) => {
    const link = document.createElement('a');

    link.setAttribute('type', 'hidden');
    link.download = 'file';
    link.href = filePath;
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export default utils;
