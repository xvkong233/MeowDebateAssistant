import type { DebateRole, DebateSide } from './debate'

export type TranscriptChunk = {
  id: string
  startAt: number
  endAt: number
  text: string
  speakerSide?: DebateSide
  speakerRole?: DebateRole
  confidence?: number
}
