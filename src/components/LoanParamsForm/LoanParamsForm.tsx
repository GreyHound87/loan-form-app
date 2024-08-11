import { useEffect } from 'react';
import { Form, Button, Slider, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, useAddProductMutation } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';

export function LoanParamsForm(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);
    const [addProduct, { isLoading }] = useAddProductMutation();

    useEffect(() => {
        if (!formData.workplace || !formData.address) {
            navigate('/address-work');
        }
    }, [formData, navigate]);

    const modalText = `Поздравляем, ${formData.lastName} ${formData.firstName}. 
    Вам одобрен займ: $${formData.loanAmount} на ${formData.loanTerm} дней.`;

    const showSuccessModal = () => {
        Modal.success({
            content: modalText,
            afterClose: () => {
                navigate('/');
            },
        });
    };

    const onFinish = async () => {
        try {
            await addProduct({ title: `${formData.firstName} ${formData.lastName}` }).unwrap();
            showSuccessModal();
        } catch (error) {
            Modal.error({
                content: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.',
                afterClose: () => {
                    navigate('/');
                },
            });
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
                                200: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$200' },
                                300: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$300' },
                                400: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$400' },
                                500: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$500' },
                                600: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$600' },
                                700: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$700' },
                                800: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$800' },
                                900: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$900' },
                                1000: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '$1000' },
                            }}
                            value={formData.loanAmount === null ? undefined : formData.loanAmount}
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
                                10: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '10 дней' },
                                15: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '15 дней' },
                                20: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '20 дней' },
                                25: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '25 дней' },
                                30: { style: { fontSize: '8px', whiteSpace: 'nowrap' }, label: '30 дней' },
                            }}
                            value={formData.loanTerm === null ? undefined : formData.loanTerm}
                        />
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
                        <Button block onClick={() => navigate('/address-work')}>
                            Назад
                        </Button>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} lg={8} style={{ marginBottom: '10px' }}>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" loading={isLoading}>
                            Подать заявку
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}
