# 接口文档

## 共享核心导出

当前 `packages/core/src/index.ts` 暴露以下接口与模块：

### 运行时接口

- `createEventBus<TEvents>()`
  - 创建一个按顺序分发事件的事件总线。
  - 支持 `emit`、`on`、`listenerCount`。

- `createModuleRegistry<TEvents>(eventBus)`
  - 创建模块注册器。
  - 支持 `register`、`hasModule`、`listModules`。
  - 注册时会校验依赖模块是否已存在。

### 类型定义

- `EventMap`
- `EventHandler<T>`
- `EventBus<TEvents>`
- `ModuleDefinition<TEvents>`
- `ModuleContext<TEvents>`
- `ModuleRegistry<TEvents>`

### 事件契约

`packages/core/src/contracts/debate-events.ts` 当前定义了以下事件名称：

- `TRANSCRIPT_UPDATED`
- `ROUND_CHANGED`
- `TACTIC_CARD_READY`

这些事件目前只定义载荷结构，具体生产与消费逻辑将在后续任务中实现。

### 模块边界占位

当前已经建立以下模块导出，占位用于后续接入：

- `audioCaptureModule`
- `asrOrchestratorModule`
- `argumentParserModule`
- `fallacyEngineModule`
- `seatStrategyEngineModule`
- `tacticCardGeneratorModule`
- `timelineEngineModule`
- `knowledgeBaseModule`
- `syncAndGitModule`
- `indexingModule`

其中部分模块已声明依赖链，例如：

- `asr-orchestrator` 依赖 `audio-capture`
- `argument-parser` 依赖 `asr-orchestrator`
- `fallacy-engine` 依赖 `argument-parser`
- `seat-strategy-engine` 依赖 `fallacy-engine`
- `tactic-card-generator` 依赖 `seat-strategy-engine`

## 桌面端接口

`apps/desktop/src/App.tsx` 当前通过 `@meow-debate-assistant/core` 读取：

- `createEventBus`
- `createModuleRegistry`

当前桌面端只展示骨架状态，还没有接入真实业务数据流。
