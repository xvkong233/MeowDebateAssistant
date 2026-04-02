import { useEffect, useState } from 'react'
import { getDesktopAppInfo, type DesktopAppInfo } from '../../shared/api/desktop'

type BridgeState =
  | { status: 'loading' }
  | { status: 'success'; data: DesktopAppInfo }
  | { status: 'error'; message: string }

export function SettingsPage() {
  const [bridgeState, setBridgeState] = useState<BridgeState>({ status: 'loading' })

  useEffect(() => {
    let isMounted = true

    void getDesktopAppInfo()
      .then((data) => {
        if (isMounted) {
          setBridgeState({ status: 'success', data })
        }
      })
      .catch(() => {
        if (isMounted) {
          setBridgeState({ status: 'error', message: '无法连接桌面桥接' })
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section aria-labelledby="settings-heading">
      <h1 id="settings-heading">设置</h1>

      {bridgeState.status === 'loading' ? <p role="status">正在连接桌面桥接…</p> : null}

      {bridgeState.status === 'success' ? (
        <div>
          <p role="status">桌面桥接已连接</p>
          <dl>
            <div>
              <dt>应用名</dt>
              <dd>{bridgeState.data.appName}</dd>
            </div>
            <div>
              <dt>版本号</dt>
              <dd>{bridgeState.data.appVersion}</dd>
            </div>
            <div>
              <dt>Bridge 状态</dt>
              <dd>{bridgeState.data.bridgeStatus}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      {bridgeState.status === 'error' ? <p role="alert">{bridgeState.message}</p> : null}
    </section>
  )
}
