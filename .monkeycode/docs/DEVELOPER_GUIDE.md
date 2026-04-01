# 开发者指南

## 当前技术栈

- 包管理：npm workspaces
- 语言：TypeScript
- 桌面端：React 入口 + Tauri 配置占位
- 测试：Node 原生 `node:test` 通过 `tsx --test` 执行
- CI：GitHub Actions

## 目录约定

- `apps/desktop`：桌面端工程
- `apps/desktop/src-tauri`：Tauri Rust 侧配置与入口占位
- `packages/core`：共享核心能力
- `packages/integrations`：外部适配层
- `packages/workflows`：流程与自动化脚本

## 常用命令

```bash
# 类型检查
npm run typecheck

# 运行测试
npm run test
```

## 开发说明

- 当前仓库还没有安装本地 `node_modules`，因此部分前端依赖先通过类型占位和路径映射维持骨架可验证状态。
- 当前环境没有 Rust 工具链，因此 Tauri 仅完成配置与目录占位，真实桌面打包应在后续具备 Rust 环境后接入。
- `apps/desktop/vite.config.ts` 已预置 `allowedHosts: ['.monkeycode-ai.online']`，满足在线预览环境配置要求。

## 测试说明

- `packages/core/tests/runtime.test.ts` 覆盖了事件总线与模块注册器的基础行为。
- 该测试文件同时包含简单属性测试，用循环样本验证顺序性与依赖链稳定性。

## 后续扩展建议

- 在任务 2 中优先补齐会话模型、赛制模板与模板校验。
- 在任务 5 之前再引入真实前端构建工具与 Tauri CLI，避免过早依赖 Rust 环境。
