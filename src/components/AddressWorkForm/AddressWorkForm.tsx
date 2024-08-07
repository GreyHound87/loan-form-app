import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export function AddressWorkForm(): JSX.Element {
    const navigate = useNavigate();

    const onFinish = (/* values: any */) => {
        /*         console.log('AddressWorkForm values:', values);
         */ navigate('/loan-params');
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="workplace"
                label="Workplace"
                rules={[{ required: true, message: 'Please select your workplace!' }]}
            >
                <Select placeholder="Select your workplace">
                    <Option value="company1">Company 1</Option>
                    <Option value="company2">Company 2</Option>
                    <Option value="company3">Company 3</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please input your address!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => navigate('/')}>Previous</Button>
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
}
