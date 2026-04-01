export type EventMap = Record<string, unknown>

export type EventHandler<T> = (payload: T) => void | Promise<void>

export interface EventBus<TEvents extends EventMap> {
  emit<TKey extends keyof TEvents>(eventName: TKey, payload: TEvents[TKey]): Promise<void>
  on<TKey extends keyof TEvents>(eventName: TKey, handler: EventHandler<TEvents[TKey]>): () => void
  listenerCount<TKey extends keyof TEvents>(eventName: TKey): number
}

export interface ModuleDefinition<TEvents extends EventMap = EventMap> {
  id: string
  dependsOn?: string[]
  setup?: (context: ModuleContext<TEvents>) => void | Promise<void>
}

export interface ModuleContext<TEvents extends EventMap = EventMap> {
  eventBus: EventBus<TEvents>
  hasModule(moduleId: string): boolean
}

export interface ModuleRegistry<TEvents extends EventMap = EventMap> {
  register(moduleDefinition: ModuleDefinition<TEvents>): Promise<void>
  hasModule(moduleId: string): boolean
  listModules(): string[]
}
