import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '../layout/AppShell'
import { ConfigPage } from './ConfigPage'
import { LivePage } from './LivePage'
import { ReplayPage } from './ReplayPage'
import { SettingsPage } from './SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/config" replace /> },
      { path: 'config', element: <ConfigPage /> },
      { path: 'live', element: <LivePage /> },
      { path: 'replay', element: <ReplayPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])
