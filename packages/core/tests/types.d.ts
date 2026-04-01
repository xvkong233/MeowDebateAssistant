declare module 'node:test' {
  const test: (name: string, callback: () => void | Promise<void>) => void
  export default test
}

declare module 'node:assert/strict' {
  interface AssertModule {
    deepEqual(actual: unknown, expected: unknown): void
    equal(actual: unknown, expected: unknown): void
    rejects(block: () => Promise<unknown>, error?: RegExp): Promise<void>
  }

  const assert: AssertModule
  export default assert
}
