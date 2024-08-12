import { useEffect } from 'react';
import { Form, Button, Slider, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormField, useAddProductMutation } from '../../redux/slices/formSlice';
import { FormStateType } from '../../types/FormStateType';
import { RootState } from '../../redux/store';
import { loanAmountSliderConfig, loanTermSliderConfig } from './sliderConfig';
import { showSuccessModal, showErrorModal } from '../../utils/modalUtils';

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

    const onFinish = async () => {
        try {
            await addProduct({ title: `${formData.firstName} ${formData.lastName}` }).unwrap();
            showSuccessModal(modalText, navigate);
        } catch (error) {
            showErrorModal('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.', navigate);
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
                        rules={[{ required: true, message: 'Выберите сумму кредита' }]}
                    >
                        <Slider
                            {...loanAmountSliderConfig}
                            value={formData.loanAmount === null ? undefined : formData.loanAmount}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="loanTerm"
                        label="Срок займа"
                        rules={[{ required: true, message: 'Выберите срок кредита' }]}
                    >
                        <Slider
                            {...loanTermSliderConfig}
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
