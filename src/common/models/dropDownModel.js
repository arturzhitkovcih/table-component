import get from 'lodash/get';

export default (item) => {
    return {
        value: get(item, 'id'),
        text: get(item, 'title')
    };
};
