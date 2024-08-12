import { useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, useGetCategoriesQuery } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';
import { showErrorModal } from '../../utils/modalUtils';

const { Option } = Select;

export function AddressWorkForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);
    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    useEffect(() => {
        if (!formData.phone || !formData.firstName || !formData.lastName || !formData.gender) {
            navigate('/');
        }
    }, [formData, navigate]);

    useEffect(() => {
        if (error) {
            showErrorModal('Ошибка загрузки категорий. Пожалуйста, попробуйте позже.', navigate);
        }
    }, [error, navigate]);

    const onFinish = () => {
        navigate('/loan-params');
    };

    const onValuesChange = (changedValues: Partial<FormStateType>) => {
        dispatch(updateFormField(changedValues));
    };

    return (
        <Form
            onFinish={onFinish}
            name="address"
            layout="vertical"
            requiredMark={false}
            onValuesChange={onValuesChange}
            initialValues={formData}
        >
            <Row gutter={64}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="workplace"
                        label="Место работы"
                        rules={[{ required: true, message: 'Выберите место работы' }]}
                    >
                        <Select placeholder="Select your workplace" value={formData.workplace} loading={isLoading}>
                            {categories?.map((category) => (
                                <Option key={category.slug} value={category.name}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="address"
                        label="Адрес проживания"
                        rules={[{ required: true, whitespace: true, message: 'Введите ваш адрес' }]}
                    >
                        <Input type="text" value={formData.address} />
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
                    <Form.Item>
                        <Button block onClick={() => navigate('/')}>
                            Назад
                        </Button>
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
