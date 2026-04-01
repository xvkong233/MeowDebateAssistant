export const Fragment = Symbol('Fragment')

export function jsx(type: unknown, props: Record<string, unknown>, key?: unknown) {
  return { type, props, key }
}

export function jsxs(type: unknown, props: Record<string, unknown>, key?: unknown) {
  return { type, props, key }
}
