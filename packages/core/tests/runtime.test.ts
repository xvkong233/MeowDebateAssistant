import test from 'node:test'
import assert from 'node:assert/strict'

import { createEventBus, createModuleRegistry } from '../src/index'

interface TestEvents extends Record<string, unknown> {
  STEP: { value: number }
}

test('事件总线按注册顺序分发事件', async () => {
  const eventBus = createEventBus<TestEvents>()
  const steps: number[] = []

  eventBus.on('STEP', async ({ value }) => {
    steps.push(value)
  })
  eventBus.on('STEP', async ({ value }) => {
    steps.push(value + 1)
  })

  await eventBus.emit('STEP', { value: 1 })

  assert.deepEqual(steps, [1, 2])
})

test('事件总线的属性测试：多次发送不会乱序丢失', async () => {
  for (let size = 1; size <= 25; size += 1) {
    const eventBus = createEventBus<TestEvents>()
    const seen: number[] = []

    eventBus.on('STEP', ({ value }) => {
      seen.push(value)
    })

    const expected = Array.from({ length: size }, (_, index) => index)

    for (const value of expected) {
      await eventBus.emit('STEP', { value })
    }

    assert.deepEqual(seen, expected)
  }
})

test('模块注册器在依赖满足时允许注册模块', async () => {
  const eventBus = createEventBus<TestEvents>()
  const registry = createModuleRegistry(eventBus)

  await registry.register({ id: 'alpha' })
  await registry.register({ id: 'beta', dependsOn: ['alpha'] })

  assert.equal(registry.hasModule('alpha'), true)
  assert.equal(registry.hasModule('beta'), true)
  assert.deepEqual(registry.listModules(), ['alpha', 'beta'])
})

test('模块注册器拒绝重复注册', async () => {
  const eventBus = createEventBus<TestEvents>()
  const registry = createModuleRegistry(eventBus)

  await registry.register({ id: 'alpha' })

  await assert.rejects(() => registry.register({ id: 'alpha' }), /already registered/)
})

test('模块注册器拒绝缺失依赖', async () => {
  const eventBus = createEventBus<TestEvents>()
  const registry = createModuleRegistry(eventBus)

  await assert.rejects(
    () => registry.register({ id: 'beta', dependsOn: ['alpha'] }),
    /depends on missing module/,
  )
})

test('模块注册器的属性测试：线性依赖链总能按顺序建立', async () => {
  for (let size = 1; size <= 20; size += 1) {
    const eventBus = createEventBus<TestEvents>()
    const registry = createModuleRegistry(eventBus)

    for (let index = 0; index < size; index += 1) {
      await registry.register({
        id: `module-${index}`,
        dependsOn: index === 0 ? [] : [`module-${index - 1}`],
      })
    }

    assert.equal(registry.listModules().length, size)
    assert.equal(registry.hasModule(`module-${size - 1}`), true)
  }
})
