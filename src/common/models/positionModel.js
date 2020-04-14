import get from 'lodash/get';

/**
 * @typedef {Object} PositionModel
 *
 * @property {String} id - Position id
 * @property {String} title - Position title
 * @property {String} description - Position description
 */
export default (item) => {
    return {
        id: get(item, 'id'),
        title: get(item, 'title') || '',
        description: get(item, 'description') || ''
    };
};
