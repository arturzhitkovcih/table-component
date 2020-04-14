import get from 'lodash/get';

/**
 * @typedef {Object} EmployeeModel
 *
 * @property {String} id - Employee id
 * @property {String} name - Employee name
 * @property {String} position - Employee position id
 * @property {String} mail - Employee e-mail
 * @property {String} state - Employee state id
 * @property {Boolean} position - Employee favorite
 * @property {Boolean} position - Employee blocked
 * @property {Array} tags - Employee tags id
 * @property {String} avatar - Employee avatar
 * @property {Array} files - Employee files
 */
export default (item) => {
    return {
        id: get(item, '_id'),
        name: get(item, 'name') || '',
        mail: get(item, 'mail') || '',
        phone: get(item, 'phone') || '',
        skype: get(item, 'skype') || '',
        linkedin: get(item, 'linkedin') || '',
        description: get(item, 'description') || '',
        position: get(item, 'position') || '',
        state: get(item, 'state') || '',
        favorite: get(item, 'favorite') || false,
        blocked: get(item, 'blocked') || false,
        tags: get(item, 'tags') || [],
        avatar:  get(item, 'avatar') || '',
        files: get(item, 'files') || []
    };
};
