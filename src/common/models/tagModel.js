import get from 'lodash/get';

/**
 * @typedef {Object} TagsModel
 *
 * @property {String} id - Tags id
 * @property {String} title - Tags title
 * @property {String} description - Tags description
 */
export default (item) => {
    return {
        id: get(item, 'id'),
        title: get(item, 'title') || '',
        description: get(item, 'description') || '',
    };
};
