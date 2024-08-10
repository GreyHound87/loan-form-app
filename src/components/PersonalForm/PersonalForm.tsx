import React, { useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';

const { Option } = Select;

const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length > 0 && cleaned[0] !== '0') {
        cleaned = `0${cleaned}`;
    }
    if (cleaned.length > 4) {
        cleaned = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
    if (cleaned.length > 8) {
        cleaned = `${cleaned.slice(0, 8)} ${cleaned.slice(8)}`;
    }
    return cleaned.slice(0, 12);
};

export function PersonalForm(): JSX.Element {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);

    useEffect(() => {
        form.setFieldsValue({
            phone: formData.phone,
        });
    }, [formData.phone, form]);

    const onFinish = (/* values: any */) => {
        /* console.log('PersonalForm values:', values); */
        navigate('/address-work');
    };

    const onValuesChange = (changedValues: Partial<FormStateType>) => {
        if (changedValues.phone) {
            changedValues.phone = formatPhoneNumber(changedValues.phone);
        }
        dispatch(updateFormField(changedValues));
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            name="personal"
            layout="vertical"
            requiredMark={false}
            onValuesChange={onValuesChange}
            initialValues={formData}
        >
            <Row gutter={64}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item
                        name="phone"
                        label="Телефон"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            {
                                validator: (_, value) => {
                                    const cleanedValue = value.replace(/\D/g, '');
                                    if (cleanedValue.length === 10) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Phone number must be 12 digits long!'));
                                },
                            },
                        ]}
                    >
                        <Input type="tel" maxLength={12} placeholder="0XXX XXX XXX" value={formData.phone} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <Form.Item
                        name="firstName"
                        label="Имя"
                        rules={[
                            { required: true, message: 'Please input your first name!' },
                            { whitespace: true, message: 'First name cannot be just whitespace.' },
                        ]}
                    >
                        <Input type="text" value={formData.firstName} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <Form.Item
                        name="lastName"
                        label="Фамилия"
                        rules={[
                            { required: true, message: 'Please input your last name!' },
                            { whitespace: true, message: 'Last name cannot be just whitespace.' },
                        ]}
                    >
                        <Input type="text" value={formData.lastName} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={64}>
                <Col xs={24} md={12} lg={8}>
                    <Form.Item
                        name="gender"
                        label="Пол"
                        rules={[{ required: true, message: 'Please select your gender!' }]}
                    >
                        <Select placeholder="Select your gender" value={formData.gender}>
                            <Option value="male">Мужской</Option>
                            <Option value="female">Женский</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={16}
                    style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                >
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Далее
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
