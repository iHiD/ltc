import path from 'path'
import { readFileSync } from 'node:fs'

export const runFile = (relativePath: string): void => {
  const absolutePath = path.resolve(relativePath)

  console.log(readFileSync(absolutePath, 'utf8'))
}
