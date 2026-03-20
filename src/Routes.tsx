import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from './App'
import { PageLayout } from './components/PageLayout/PageLayout'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/players"
        element={
          <PageLayout>
            <App />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/players" replace />} />
    </Routes>
  )
}

export { AppRoutes }
