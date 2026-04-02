import type { DebateRole, DebateStage } from './debate'

export type PromptPriority = 'high' | 'medium' | 'low'

export type PromptType = 'attack' | 'defense' | 'question' | 'summary' | 'closing'

export type LivePrompt = {
  id: string
  role: DebateRole
  stage: DebateStage
  priority: PromptPriority
  type: PromptType
  text: string
}
