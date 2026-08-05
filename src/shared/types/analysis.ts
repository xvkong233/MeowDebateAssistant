export type ArgumentType =
  | 'definition'
  | 'criterion'
  | 'causal'
  | 'comparison'
  | 'example'
  | 'value'

export type AnalysisResult = {
  chunkId: string
  claim: string
  argumentType: ArgumentType
  weaknesses: string[]
  issueTags: string[]
  suggestedResponse: string[]
  confidence: number
}
