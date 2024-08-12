import { Modal } from 'antd';
import { NavigateFunction } from 'react-router-dom';

export const showSuccessModal = (message: string, navigate: NavigateFunction) => {
    Modal.success({
        content: message,
        afterClose: () => {
            navigate('/');
        },
    });
};

export const showErrorModal = (message: string, navigate: NavigateFunction) => {
    Modal.error({
        content: message,
        afterClose: () => {
            navigate('/');
        },
    });
};
