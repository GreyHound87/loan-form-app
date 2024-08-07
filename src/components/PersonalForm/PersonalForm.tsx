import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

export function PersonalForm(): JSX.Element {
    const navigate = useNavigate();

    const onFinish = (/* values: any */) => {
        /*         console.log('PersonalForm values:', values);
         */ navigate('/address-work');
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input type="tel" />
            </Form.Item>
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
                <Select placeholder="Select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form.Item>
        </Form>
    );
}
