import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { router as appRouter } from './router'

function renderRouter(initialEntry: string) {
  const router = createMemoryRouter(appRouter.routes, {
    initialEntries: [initialEntry],
  })

  render(<RouterProvider router={router} />)

  return router
}

describe('router', () => {
  it('redirects the index route to /config', async () => {
    const router = renderRouter('/')

    expect(await screen.findByRole('heading', { name: '赛前配置' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/config')
  })

  it('renders the app shell navigation', async () => {
    renderRouter('/config')

    expect(await screen.findByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '赛前配置' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '实时比赛' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '赛后复盘' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '设置' })).toBeInTheDocument()
  })

  it.each([
    ['/config', '赛前配置'],
    ['/live', '实时比赛'],
    ['/replay', '赛后复盘'],
    ['/settings', '设置'],
  ])('renders %s', async (path, heading) => {
    renderRouter(path)

    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
  })
})
