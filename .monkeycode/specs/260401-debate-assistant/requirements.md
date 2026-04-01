# Requirements Document

## Introduction

本需求文档定义一个面向中文竞技辩论场景的实时辩论辅助程序。系统需要在比赛进行中持续采集对方发言音频，完成低延迟转录、论证结构抽取、逻辑漏洞识别、角色化回应建议与赛程阶段提醒，并结合辩题、己方立场、赛制与席位信息生成个性化辅助内容。系统首要目标是实时性，其次是建议质量、角色适配度与跨端可交付性。

## Glossary

- **系统**: 实时辩论辅助程序及其配套服务。
- **赛制模板**: 对具体辩论规则的结构化配置，例如新国辩类流程模板。
- **席位**: 己方一辩、二辩、三辩、四辩中的特定角色。
- **回合**: 比赛中的一个发言或交锋阶段，例如立论、驳论、自由辩、总结陈词。
- **战术卡**: 系统生成的一条可立即使用的应对建议。
- **实时窗口**: 从收到音频到生成建议的处理时延窗口。
- **逻辑漏洞**: 对方发言中可被进攻的论证缺陷，例如偷换概念、因果倒置、证据不足、标准漂移、双重标准、未比较、循环论证。

## Product Assumptions

- 系统默认支持中文普通话场景，并保留扩展方言与英语的能力。
- 系统默认提供“新国辩类”模板，抽象为开篇立论、攻防质询或申论、自由辩论、总结陈词等主要阶段；具体赛事参数可配置。
- 系统默认允许用户在赛前输入辩题、己方立场、己方核心论点、禁用论点、对手信息与资料库。
- 系统默认以桌面端为主战场，并通过共享后端与适配前端支持 Mac 与 Windows 打包发布，后续扩展移动端或 Web 观察端。
- 系统默认与 GitHub 集成，在每个明确的开发提交完成后自动推送远程仓库；生产环境中的比赛记录是否自动上传由用户控制。

## Requirements

### Requirement 1

**User Story:** AS 辩手, I want to configure debate context before the match, so that the system can generate position-aware assistance.

#### Acceptance Criteria

1. WHEN 用户创建一场新比赛, 系统 SHALL 允许用户输入辩题、己方立场、赛制模板、己方席位与比赛语言。
2. WHEN 用户完成比赛初始化, 系统 SHALL 保存比赛上下文、论点树、预设资料与策略偏好。
3. WHILE 比赛尚未开始, 系统 SHALL 允许用户编辑己方主论点、预判对方论点、底线立场与禁忌表达。
4. IF 用户选择“新国辩类”模板, 系统 SHALL 自动载入默认回合顺序、时间限制、席位职责与提示逻辑。

### Requirement 2

**User Story:** AS 辩手, I want the system to transcribe opponent speech in real time, so that I can capture the latest attackable content.

#### Acceptance Criteria

1. WHEN 系统接收到对方发言音频流, 系统 SHALL 在实时窗口内输出增量转录结果。
2. WHILE 音频流持续输入, 系统 SHALL 对转录文本进行时间戳切分并保留说话片段顺序。
3. IF 音频质量下降、多人重叠说话或环境噪声升高, 系统 SHALL 标记对应文本片段的置信度。
4. IF 实时转录服务异常, 系统 SHALL 提示降级状态并切换到备用识别策略或半自动输入模式。

### Requirement 3

**User Story:** AS 辩手, I want the system to identify logical vulnerabilities from opponent speech, so that I can respond with targeted attacks.

#### Acceptance Criteria

1. WHEN 新的转录片段稳定成句, 系统 SHALL 提取其中的主张、论据、比较标准、定义与价值判断。
2. WHEN 系统识别论证结构, 系统 SHALL 检测逻辑漏洞类型并给出证据引用片段。
3. WHILE 系统输出漏洞分析, 系统 SHALL 对每条漏洞标注紧急程度、可攻击性与推荐回应方向。
4. IF 系统无法确认漏洞成立, 系统 SHALL 将该项标记为“待核验”而不是输出确定性结论。

### Requirement 4

**User Story:** AS 不同席位的辩手, I want seat-specific assistance, so that the suggestions match my round objectives.

#### Acceptance Criteria

1. WHEN 用户选择一辩, 系统 SHALL 优先提供定义维护、框架稳固、立论补强与总论证一致性提醒。
2. WHEN 用户选择二辩, 系统 SHALL 优先提供针对对方立论的拆解路径、攻防脚本与证据回击建议。
3. WHEN 用户选择三辩, 系统 SHALL 优先提供自由辩高频短打、追问链、压缩表达与局部战场收束建议。
4. WHEN 用户选择四辩, 系统 SHALL 优先提供交锋归纳、评判标准回收、赛局叙事与总结陈词框架。
5. WHILE 回合推进, 系统 SHALL 按当前回合动态调整建议长度、密度、语气与行动类型。

### Requirement 5

**User Story:** AS 辩手, I want the system to adapt to the progress of the debate, so that assistance remains relevant at each stage.

#### Acceptance Criteria

1. WHEN 比赛进入新的回合, 系统 SHALL 切换到该回合对应的策略视图与建议模板。
2. WHEN 当前回合接近结束, 系统 SHALL 提供时间敏感型提醒，例如“先收标准”“只打一条最强进攻”“准备回扣评判”。
3. WHILE 自由辩论进行中, 系统 SHALL 持续刷新短句型建议并降低长篇文字输出比例。
4. WHEN 比赛进入总结陈词阶段, 系统 SHALL 汇总己方有效交锋点、对方未回应点与可复述的判准线索。

### Requirement 6

**User Story:** AS 辩手, I want concise and actionable responses, so that I can use the output under severe time pressure.

#### Acceptance Criteria

1. WHEN 系统生成一条战术卡, 系统 SHALL 包含“攻击点”“一句话反击”“可追问问题”“风险提示”四类最少三类信息。
2. WHILE 处于高压回合, 系统 SHALL 优先输出一句话、两句话与三点式结构，而不是长段落。
3. WHEN 同时存在多个可攻击点, 系统 SHALL 按优先级排序并展示最值得立即使用的前三项。
4. IF 用户开启“极简模式”, 系统 SHALL 仅展示最短可执行回应与风险标签。

### Requirement 7

**User Story:** AS 教练或备赛人员, I want to preload knowledge and strategy, so that the model output reflects team preparation.

#### Acceptance Criteria

1. WHEN 用户导入资料卡、案例、数据、名言或既有稿件, 系统 SHALL 将内容归档到可检索知识库。
2. WHEN 模型生成建议, 系统 SHALL 优先引用与当前辩题、立场与回合相关的已准备材料。
3. IF 导入资料之间存在冲突结论, 系统 SHALL 标记冲突来源并提示用户裁定。
4. WHILE 比赛进行中, 系统 SHALL 支持按关键词快速搜索已准备材料。

### Requirement 8

**User Story:** AS 系统管理员, I want configurable LLM and ASR pipelines, so that the product can balance latency, privacy, and cost.

#### Acceptance Criteria

1. WHEN 管理员配置模型供应商, 系统 SHALL 支持至少一个实时 ASR 服务与至少一个大语言模型服务。
2. WHEN 管理员启用本地模型或私有化服务, 系统 SHALL 允许切换到本地推理路径。
3. WHILE 生成建议, 系统 SHALL 记录每次推理耗时、令牌消耗与失败原因。
4. IF 外部模型服务超时, 系统 SHALL 返回基于规则引擎的降级建议。

### Requirement 9

**User Story:** AS 赛事现场用户, I want resilient operation under unstable conditions, so that the system remains usable during debate.

#### Acceptance Criteria

1. IF 网络中断, 系统 SHALL 保持本地转录缓存、时间线与最近建议可见。
2. IF 云端分析暂时不可用, 系统 SHALL 提供本地规则级提醒，例如定义混淆、比较缺失、绝对化表达。
3. WHILE 系统处于降级模式, 系统 SHALL 明确展示当前不可用能力与建议可信度。
4. WHEN 服务恢复, 系统 SHALL 合并离线期间的比赛记录并恢复实时分析。

### Requirement 10

**User Story:** AS 组织者或高级用户, I want editable rule templates, so that the system can support multiple debate formats beyond one competition.

#### Acceptance Criteria

1. WHEN 用户创建或编辑赛制模板, 系统 SHALL 支持配置回合顺序、回合时长、允许席位、提示策略与输出风格。
2. WHEN 用户复制“新国辩类”模板, 系统 SHALL 允许用户调整自由辩时长、是否有盘问、是否有申论或结辩限制。
3. WHILE 比赛使用自定义模板, 系统 SHALL 按模板驱动时间轴与席位辅助逻辑。
4. IF 模板存在不完整配置, 系统 SHALL 阻止比赛开始并指出缺失字段。

### Requirement 11

**User Story:** AS 产品负责人, I want cross-platform delivery, so that the application can run on Mac and Windows.

#### Acceptance Criteria

1. WHEN 系统进入发布流程, 系统 SHALL 生成可安装的 macOS 与 Windows 客户端包。
2. WHEN 构建桌面客户端, 系统 SHALL 复用同一套核心业务逻辑与配置协议。
3. IF 目标平台存在权限差异, 系统 SHALL 针对麦克风、系统音频采集与本地存储能力给出差异化适配。
4. WHEN 用户安装客户端, 系统 SHALL 提供首次启动配置向导用于完成音频权限、模型配置与 GitHub 集成设置。

### Requirement 12

**User Story:** AS 开发团队, I want automated GitHub commits after each completed development change, so that design and implementation progress remains synchronized remotely.

#### Acceptance Criteria

1. WHEN 开发流程完成一个明确的工作单元, 开发工作流 SHALL 自动创建 Git 提交并推送到 GitHub 远程仓库。
2. WHEN 自动提交被触发, 工作流 SHALL 使用描述性提交信息并记录关联任务上下文。
3. IF 自动推送失败, 工作流 SHALL 保留本地提交并提示开发者处理认证或冲突问题。
4. WHILE 自动提交机制运行, 工作流 SHALL 避免提交密钥、凭证文件与其他敏感信息。

## Non-Functional Requirements

1. 系统 SHOULD 以低延迟为优先目标，常态下从稳定语句到战术卡输出应控制在可现场使用的秒级范围。
2. 系统 SHOULD 具备可解释性，每条关键建议应可回溯到对方原始发言片段或己方预置资料。
3. 系统 SHOULD 提供隐私控制，允许用户选择本地保存、会后销毁或脱敏归档比赛记录。
4. 系统 SHOULD 在长时间比赛中维持稳定内存占用，并支持连续多场次切换。
