import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export function AddressWorkForm(): JSX.Element {
    const navigate = useNavigate();

    const onFinish = (/* values: any */) => {
        /*         console.log('AddressWorkForm values:', values);
         */ navigate('/loan-params');
    };

    return (
        <Form onFinish={onFinish} name="address" layout="vertical" requiredMark={false}>
            <Row gutter={64}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="workplace"
                        label="Место работы"
                        rules={[{ required: true, message: 'Please select your workplace!' }]}
                    >
                        <Select placeholder="Select your workplace">
                            <Option value="company1">Company 1</Option>
                            <Option value="company2">Company 2</Option>
                            <Option value="company3">Company 3</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="address"
                        label="Адрес проживания"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Row gutter={64} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Col>
                        <Button onClick={() => navigate('/')}>Назад</Button>
                    </Col>
                    <Col>
                        <Button type="primary" htmlType="submit">
                            Далее
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    );
}
