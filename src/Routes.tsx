import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from './App'
import { PageLayout } from './components/PageLayout/PageLayout'
import { ReportSuccess } from './features/report/ReportSuccess'

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
      <Route
        path="/success"
        element={
          <PageLayout>
            <ReportSuccess />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/players" replace />} />
    </Routes>
  )
}

export { AppRoutes }
