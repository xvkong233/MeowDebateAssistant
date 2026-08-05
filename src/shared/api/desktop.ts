import { invoke } from '@tauri-apps/api/core'

export type DesktopAppInfo = {
  appName: string
  appVersion: string
  bridgeStatus: string
}

export async function getDesktopAppInfo(): Promise<DesktopAppInfo> {
  try {
    return await invoke<DesktopAppInfo>('get_desktop_app_info')
  } catch {
    throw new Error('无法连接桌面桥接')
  }
}
