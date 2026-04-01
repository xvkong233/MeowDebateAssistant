import { createEventBus, createModuleRegistry } from '@meow-debate-assistant/core'

const eventBus = createEventBus()
const registry = createModuleRegistry(eventBus)

export function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Meow Debate Assistant</p>
        <h1>实时辩论辅助桌面端骨架已就绪</h1>
        <p className="summary">
          当前已建立桌面壳、共享核心模块、事件总线与模块注册边界，为后续转录、漏洞识别与席位策略引擎接入做准备。
        </p>
      </section>
      <section className="status-grid">
        <article className="status-card">
          <h2>运行时核心</h2>
          <p>事件总线、模块注册器、依赖校验接口已定义。</p>
        </article>
        <article className="status-card">
          <h2>模块占位</h2>
          <p>音频采集、ASR、论证解析、漏洞引擎等核心模块已完成目录预留。</p>
        </article>
        <article className="status-card">
          <h2>启动状态</h2>
          <p>{registry.listModules().length} 个模块已注册到桌面端示例实例。</p>
        </article>
      </section>
    </main>
  )
}
