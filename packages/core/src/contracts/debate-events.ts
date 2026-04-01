export interface DebateAssistantEvents {
  TRANSCRIPT_UPDATED: {
    chunkId: string
    text: string
  }
  ROUND_CHANGED: {
    sessionId: string
    roundName: string
  }
  TACTIC_CARD_READY: {
    sessionId: string
    cardId: string
  }
}
