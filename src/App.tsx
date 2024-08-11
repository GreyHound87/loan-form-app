import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { PersonalForm, AddressWorkForm, LoanParamsForm } from './components';

const { Header, Footer, Content } = Layout;

export function App(): JSX.Element {
    return (
        <Router>
            <Layout
                style={{
                    maxWidth: '1280px',
                    margin: '0 auto',
                }}
            >
                <Header>
                    <h1 style={{ color: 'rgba(255, 255, 255, 0.95)', margin: '0' }}>Loan Form App</h1>
                </Header>
                <Content
                    style={{
                        padding: '32px',
                    }}
                >
                    <Routes>
                        <Route path="/" element={<PersonalForm />} />
                        <Route path="/address-work" element={<AddressWorkForm />} />
                        <Route path="/loan-params" element={<LoanParamsForm />} />
                    </Routes>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Router>
    );
}
