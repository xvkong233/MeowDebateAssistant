import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SettingsPage } from './SettingsPage'
import type { DesktopAppInfo } from '../../shared/api/desktop'

const { getDesktopAppInfoMock } = vi.hoisted(() => ({
  getDesktopAppInfoMock: vi.fn<() => Promise<DesktopAppInfo>>(),
}))

vi.mock('../../shared/api/desktop', () => ({
  getDesktopAppInfo: getDesktopAppInfoMock,
}))

describe('SettingsPage', () => {
  beforeEach(() => {
    getDesktopAppInfoMock.mockReset()
  })

  it('renders a loading state before bridge data resolves', () => {
    getDesktopAppInfoMock.mockReturnValue(new Promise(() => undefined))

    render(<SettingsPage />)

    expect(screen.getByRole('heading', { name: '设置' })).toBeInTheDocument()
    expect(screen.getByText('正在连接桌面桥接…')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('正在连接桌面桥接…')
  })

  it('renders desktop app info after bridge success', async () => {
    getDesktopAppInfoMock.mockResolvedValue({
      appName: 'Meow Debate Assistant',
      appVersion: '0.1.0',
      bridgeStatus: 'connected',
    })

    render(<SettingsPage />)

    expect(await screen.findByText('Meow Debate Assistant')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('桌面桥接已连接')
    expect(screen.getByText('0.1.0')).toBeInTheDocument()
    expect(screen.getByText('connected')).toBeInTheDocument()
  })

  it('renders a stable error message after bridge failure', async () => {
    getDesktopAppInfoMock.mockRejectedValue(new Error('boom'))

    render(<SettingsPage />)

    expect(await screen.findByRole('alert')).toHaveTextContent('无法连接桌面桥接')
  })
})
