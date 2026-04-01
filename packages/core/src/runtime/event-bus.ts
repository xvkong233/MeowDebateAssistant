import type { EventBus, EventHandler, EventMap } from './types'

export function createEventBus<TEvents extends EventMap = EventMap>(): EventBus<TEvents> {
  const listeners = new Map<keyof TEvents, Set<EventHandler<TEvents[keyof TEvents]>>>()

  return {
    async emit<TKey extends keyof TEvents>(eventName: TKey, payload: TEvents[TKey]) {
      const handlers = listeners.get(eventName)

      if (!handlers) {
        return
      }

      for (const handler of handlers) {
        await handler(payload)
      }
    },

    on<TKey extends keyof TEvents>(eventName: TKey, handler: EventHandler<TEvents[TKey]>) {
      const handlers = listeners.get(eventName) ?? new Set<EventHandler<TEvents[TKey]>>()
      handlers.add(handler)
      listeners.set(eventName, handlers as Set<EventHandler<TEvents[keyof TEvents]>>)

      return () => {
        const currentHandlers = listeners.get(eventName)

        if (!currentHandlers) {
          return
        }

        currentHandlers.delete(handler as EventHandler<TEvents[keyof TEvents]>)

        if (currentHandlers.size === 0) {
          listeners.delete(eventName)
        }
      }
    },

    listenerCount<TKey extends keyof TEvents>(eventName: TKey) {
      return listeners.get(eventName)?.size ?? 0
    },
  }
}
