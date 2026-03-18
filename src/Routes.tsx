import { Route, Routes } from 'react-router-dom'
import { App } from './App'
import { PageLayout } from './components/PageLayout/PageLayout'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <App />
          </PageLayout>
        }
      />
      <Route
        path="*"
        element={
          <PageLayout>
            <App />
          </PageLayout>
        }
      />
    </Routes>
  )
}

export { AppRoutes }
