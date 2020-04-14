import get from 'lodash/get';

/**
 * @typedef {Object} EmployeeStateModel
 *
 * @property {String} id - EmployeeState id
 * @property {String} title - EmployeeState title
 * @property {String} description - EmployeeState description
 */
export default (item) => {
    return {
        id: get(item, 'id'),
        title: get(item, 'title') || '',
        description: get(item, 'description') || ''
    };
};
