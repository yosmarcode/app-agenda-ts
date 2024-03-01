import React from 'react'

import './App.css'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import PageAgenda from './page/PageAgenda/PageAgenda'

function App () {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: 40 }}>
          <div style={{
            background: colorBgContainer,
            minHeight: '70vh',
            borderRadius: borderRadiusLG,
            padding: 30
          }}
          >
            <PageAgenda />
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default App
