import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';

export const phoneValidator = (_: RuleObject, value: StoreValue) => {
    if (!value || typeof value !== 'string' || !value.match(/^0\d{3}\s\d{3}\s\d{3}$/)) {
        return Promise.reject(new Error('Введите номер телефона в формате 0___ ___ ___'));
    }
    return Promise.resolve();
};
