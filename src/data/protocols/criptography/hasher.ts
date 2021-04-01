export interface Hasher {
  hash: (value: string | object) => Promise<string>
}
