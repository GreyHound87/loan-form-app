import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';

const { Option } = Select;

export function PersonalForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);

    const onFinish = (/* values: any */) => {
        /* console.log('PersonalForm values:', values); */
        navigate('/address-work');
    };

    const onValuesChange = (changedValues: Partial<FormStateType>) => {
        dispatch(updateFormField(changedValues));
    };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
            <Form
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
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input type="tel" value={formData.phone} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item
                            name="firstName"
                            label="Имя"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                        >
                            <Input type="text" value={formData.firstName} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item
                            name="lastName"
                            label="Фамилия"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
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
        </div>
    );
}
