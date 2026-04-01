# 系统架构文档

## 当前架构

项目当前采用 monorepo 结构，按“桌面端壳层 + 共享核心 + 集成适配 + 工作流”组织：

```text
/apps
  /desktop           桌面端 UI 与 Tauri 容器
/packages
  /core              共享核心运行时与领域模块
  /integrations      外部服务适配层占位
  /workflows         开发与运行工作流占位
/.github/workflows   CI 配置
```

## 分层说明

- `apps/desktop`
  - 提供桌面端入口页面、基础样式、Tauri 配置与前端启动脚本占位。
  - 当前 `src/App.tsx` 只负责展示骨架状态，并实例化共享核心中的事件总线与模块注册器。
- `packages/core`
  - 负责共享运行时能力。
  - `src/runtime` 包含 `createEventBus` 与 `createModuleRegistry`，作为后续音频、转录、策略模块的协作基础。
  - 其他模块目录如 `audio-capture`、`asr-orchestrator`、`fallacy-engine` 等目前为占位导出，目的是先建立清晰边界。
- `packages/integrations`
  - 预留给 ASR、LLM、存储或同步服务适配器。
- `packages/workflows`
  - 预留给自动提交、赛时工作流、批处理流程等脚本逻辑。

## 当前关键设计决策

- 桌面端优先：首发交付目标是 macOS 与 Windows，因此优先构建 `apps/desktop` 与 `src-tauri` 结构。
- 事件驱动：共享核心先实现事件总线和模块注册器，后续所有模块按事件协作，避免直接耦合。
- 渐进式接入：由于当前环境没有 Rust 工具链，Tauri 的 Rust 侧文件已占位，但真实编译接入放到后续任务。
- CI 先行：在 `.github/workflows/ci.yml` 中先接入类型检查和测试，保证基础骨架可持续演进。

## 已验证的正确性

- 事件总线按注册顺序分发事件。
- 多次连续发送事件不会乱序丢失。
- 模块注册器可以校验依赖顺序。
- 重复注册和缺失依赖会被明确拒绝。

这些性质已在 `packages/core/tests/runtime.test.ts` 中覆盖。
