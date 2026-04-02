import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/config', label: '赛前配置' },
  { to: '/live', label: '实时比赛' },
  { to: '/replay', label: '赛后复盘' },
  { to: '/settings', label: '设置' },
]

export function AppShell() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      <aside
        style={{
          borderRight: '1px solid rgba(148, 163, 184, 0.18)',
          padding: '24px 16px',
          background: '#111827',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Meow Debate Assistant</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>实时辩论辅助</div>
        </div>
        <nav style={{ display: 'grid', gap: 8 }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '10px 12px',
                borderRadius: 10,
                background: isActive ? '#1e293b' : 'transparent',
                color: isActive ? '#f8fafc' : '#cbd5e1',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  )
}
