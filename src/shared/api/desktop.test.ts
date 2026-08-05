import { beforeEach, describe, expect, it, vi } from 'vitest'

const { invokeMock } = vi.hoisted(() => ({
  invokeMock: vi.fn(),
}))

vi.mock('@tauri-apps/api/core', () => ({
  invoke: invokeMock,
}))

describe('getDesktopAppInfo', () => {
  beforeEach(() => {
    invokeMock.mockReset()
  })

  it('invokes the desktop app info command', async () => {
    invokeMock.mockResolvedValue({
      appName: 'Meow Debate Assistant',
      appVersion: '0.1.0',
      bridgeStatus: 'connected',
    })

    const { getDesktopAppInfo } = await import('./desktop')

    await expect(getDesktopAppInfo()).resolves.toEqual({
      appName: 'Meow Debate Assistant',
      appVersion: '0.1.0',
      bridgeStatus: 'connected',
    })
    expect(invokeMock).toHaveBeenCalledWith('get_desktop_app_info')
  })

  it('normalizes bridge failures into a stable error', async () => {
    invokeMock.mockRejectedValue(new Error('bridge unavailable'))

    const { getDesktopAppInfo } = await import('./desktop')

    await expect(getDesktopAppInfo()).rejects.toThrow('无法连接桌面桥接')
  })
})
