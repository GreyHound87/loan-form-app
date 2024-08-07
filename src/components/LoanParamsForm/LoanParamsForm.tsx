import React from 'react';
import { Form, Button, Slider } from 'antd';
import { useNavigate } from 'react-router-dom';

export function LoanParamsForm(): JSX.Element {
    const navigate = useNavigate();

    const onFinish = (/* values: any */) => {
        /*         console.log('LoanParamsForm values:', values);
         */ navigate('/');
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item
                name="loanAmount"
                label="Loan Amount"
                rules={[{ required: true, message: 'Please select the loan amount!' }]}
            >
                <Slider
                    min={200}
                    max={1000}
                    step={100}
                    marks={{
                        200: '$200',
                        300: '$300',
                        400: '$400',
                        500: '$500',
                        600: '$600',
                        700: '$700',
                        800: '$800',
                        900: '$900',
                        1000: '$1000',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="loanTerm"
                label="Loan Term (days)"
                rules={[{ required: true, message: 'Please select the loan term!' }]}
            >
                <Slider
                    min={10}
                    max={30}
                    step={1}
                    marks={{
                        10: '10 days',
                        15: '15 days',
                        20: '20 days',
                        25: '25 days',
                        30: '30 days',
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={() => navigate('/address-work')}>Previous</Button>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
