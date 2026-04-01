import type { EventBus, EventMap, ModuleDefinition, ModuleRegistry } from './types'

export function createModuleRegistry<TEvents extends EventMap = EventMap>(
  eventBus: EventBus<TEvents>,
): ModuleRegistry<TEvents> {
  const modules = new Map<string, ModuleDefinition<TEvents>>()

  return {
    async register(moduleDefinition) {
      if (modules.has(moduleDefinition.id)) {
        throw new Error(`Module '${moduleDefinition.id}' is already registered`)
      }

      for (const dependency of moduleDefinition.dependsOn ?? []) {
        if (!modules.has(dependency)) {
          throw new Error(`Module '${moduleDefinition.id}' depends on missing module '${dependency}'`)
        }
      }

      modules.set(moduleDefinition.id, moduleDefinition)
      await moduleDefinition.setup?.({
        eventBus,
        hasModule: (moduleId) => modules.has(moduleId),
      })
    },

    hasModule(moduleId) {
      return modules.has(moduleId)
    },

    listModules() {
      return [...modules.keys()]
    },
  }
}
