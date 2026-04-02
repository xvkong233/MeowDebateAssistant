export type DebateSide = 'pro' | 'con'

export type DebateRole = 'first' | 'second' | 'third' | 'free'

export type DebateFormat = 'new-national-debate'

export type DebateStage =
  | 'preparation'
  | 'opening'
  | 'questioning'
  | 'free-debate'
  | 'closing'
  | 'completed'

export type DebateConfig = {
  topic: string
  side: DebateSide
  role: DebateRole
  format: DebateFormat
  criterion: string
  coreClaims: string[]
  attackFocus: string[]
  defenseFocus: string[]
  forbiddenConcessions: string[]
}

export type DebateState = {
  config: DebateConfig
  stage: DebateStage
  elapsedMs: number
  isRunning: boolean
}

export const DEFAULT_FORMAT: DebateFormat = 'new-national-debate'
export const DEFAULT_SIDE: DebateSide = 'pro'
export const DEFAULT_ROLE: DebateRole = 'first'

export const DEFAULT_CONFIG: DebateConfig = {
  topic: '',
  side: DEFAULT_SIDE,
  role: DEFAULT_ROLE,
  format: DEFAULT_FORMAT,
  criterion: '',
  coreClaims: ['', '', ''],
  attackFocus: [],
  defenseFocus: [],
  forbiddenConcessions: [],
}
