import React, { Suspense, lazy } from 'react'

import './App.css'
import { Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'

import { ErrorBoundary } from 'react-error-boundary'
import { Loading } from './components/Loading/Loading'
import { PageContextProviderAgenda } from './page/PageAgenda/context/PageContextAgenda'

function App () {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()
  const PageAgenda = lazy(() => import('./page/PageAgenda/PageAgenda'))

  return (
    <div>
      <PageContextProviderAgenda>
        <ErrorBoundary fallback={<p>⚠️Error inesperado...</p>}>

          <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: 40 }}>
              <div style={{
                background: colorBgContainer,
                minHeight: '70vh',
                borderRadius: borderRadiusLG,
                padding: 30
              }}
              >

                <Suspense fallback={<Loading />}>
                  <PageAgenda />
                </Suspense>

              </div>
            </Content>
          </Layout>
        </ErrorBoundary>
      </PageContextProviderAgenda>
    </div>
  )
}

export default App
