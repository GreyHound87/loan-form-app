import React from 'react';
import { Form, Button, Slider, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';

export function LoanParamsForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);

    const modalText = `Поздравляем, ${formData.lastName} ${formData.firstName}. 
    Вам одобрена ${formData.loanAmount} на ${formData.loanTerm} дней.`;

    const showSuccessModal = () => {
        Modal.success({
            title: 'Поздравляем!',
            content: modalText,
            afterClose: () => {
                navigate('/');
            },
        });
    };

    const showErrorModal = () => {
        Modal.error({
            title: 'Ошибка',
            content: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
            afterClose: () => {
                navigate('/');
            },
        });
    };

    const onFinish = (/* values: any */) => {
        const isSuccess = true;
        if (isSuccess) {
            showSuccessModal();
        } else {
            showErrorModal();
        }
    };

    const onValuesChange = (changedValues: Partial<FormStateType>) => {
        dispatch(updateFormField(changedValues));
    };

    return (
        <Form
            onFinish={onFinish}
            name="params"
            layout="vertical"
            requiredMark={false}
            onValuesChange={onValuesChange}
            initialValues={formData}
        >
            <Row gutter={64}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="loanAmount"
                        label="Сумма займа"
                        rules={[{ required: true, message: 'Please select the loan amount!' }]}
                    >
                        <Slider
                            min={200}
                            max={1000}
                            step={100}
                            marks={{
                                200: { style: { fontSize: '10px' }, label: '$200' },
                                300: { style: { fontSize: '10px' }, label: '$300' },
                                400: { style: { fontSize: '10px' }, label: '$400' },
                                500: { style: { fontSize: '10px' }, label: '$500' },
                                600: { style: { fontSize: '10px' }, label: '$600' },
                                700: { style: { fontSize: '10px' }, label: '$700' },
                                800: { style: { fontSize: '10px' }, label: '$800' },
                                900: { style: { fontSize: '10px' }, label: '$900' },
                                1000: { style: { fontSize: '10px' }, label: '$1000' },
                            }}
                            value={formData.loanAmount}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="loanTerm"
                        label="Срок займа"
                        rules={[{ required: true, message: 'Please select the loan term!' }]}
                    >
                        <Slider
                            min={10}
                            max={30}
                            step={1}
                            marks={{
                                10: { style: { fontSize: '10px' }, label: '10 дней' },
                                15: { style: { fontSize: '10px' }, label: '15 дней' },
                                20: { style: { fontSize: '10px' }, label: '20 дней' },
                                25: { style: { fontSize: '10px' }, label: '25 дней' },
                                30: { style: { fontSize: '10px' }, label: '30 дней' },
                            }}
                            value={formData.loanTerm}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row gutter={64} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Col>
                        <Button onClick={() => navigate('/address-work')}>Назад</Button>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            Подать заявку
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}
