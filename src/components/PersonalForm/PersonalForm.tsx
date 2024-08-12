import { useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';
import { formatPhoneNumber } from './utils/formatPhoneNumber';
import { phoneValidator } from './utils/phoneValidator';

const { Option } = Select;

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

    const onFinish = () => {
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
                    <Form.Item name="phone" label="Телефон" rules={[{ validator: phoneValidator }]}>
                        <Input type="tel" maxLength={12} placeholder="0XXX XXX XXX" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <Form.Item
                        name="firstName"
                        label="Имя"
                        rules={[{ required: true, whitespace: true, message: 'Введите ваше имя' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <Form.Item
                        name="lastName"
                        label="Фамилия"
                        rules={[{ required: true, whitespace: true, message: 'Введите вашу фамилию' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                </Col>
            </Row>
            <Row
                gutter={64}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                }}
            >
                <Col xs={24} sm={12} lg={8} style={{ marginBottom: '10px' }}>
                    <Form.Item name="gender" label="Пол" rules={[{ required: true, message: 'Укажите свой пол' }]}>
                        <Select placeholder="Select your gender">
                            <Option value="male">Мужской</Option>
                            <Option value="female">Женский</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8} style={{ marginBottom: '10px' }}>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Далее
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
