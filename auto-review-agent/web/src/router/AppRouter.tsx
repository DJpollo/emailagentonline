import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import SubmitRequestPage from '../pages/SubmitRequestPage';
import ApprovalQueuePage from '../pages/ApprovalQueuePage';
import RequestDetailPage from '../pages/RequestDetailPage';
import ActivityLogPage from '../pages/ActivityLogPage';
import MyRequestsPage from '../pages/MyRequestsPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import LandingPage from '../pages/LandingPage';
import { AdminRoute, ProtectedRoute, PublicOnlyRoute } from './RouteGuards';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <h1 className="text-4xl font-bold text-primary-dark">404</h1>
    <p className="text-muted">Page not found</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/submit', element: <SubmitRequestPage /> },
          {
            element: <AdminRoute />,
            children: [{ path: '/queue', element: <ApprovalQueuePage /> }],
          },
          { path: '/request/:id', element: <RequestDetailPage /> },
          { path: '/my-requests', element: <MyRequestsPage /> },
          { path: '/activity', element: <ActivityLogPage /> },
          { path: '/analytics', element: <AnalyticsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
