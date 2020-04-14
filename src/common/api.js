import employeeModel from './models/employeeModel';

import mockedEmployee from './mocked/employees';

const api = {};

api.createModelsArray = (data, typeModel) => {
    let model;

    if (Array.isArray(data)) {
        model = data.map((item) => {
            return typeModel(item);
        });
    }

    return model || [];
};

api.loadEmployees = (filter) => {
    return new Promise((resolve, reject) => {
        const employees = api.createModelsArray(mockedEmployee, employeeModel);

        resolve(employees);
    });
};

export default api;
