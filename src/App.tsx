import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

export function App(): JSX.Element {
    return (
        <Layout
            style={{
                maxWidth: '1280px',
                margin: '0 auto',
            }}
        >
            <Header>
                <h1 style={{ color: 'rgba(255, 255, 255, 0.95)', margin: '0' }}>Loan Form App</h1>
            </Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
}
