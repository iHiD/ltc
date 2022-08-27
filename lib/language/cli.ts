import path from 'path'
import { readFileSync } from 'node:fs'
import exec from './exec'

export const runFile = (relativePath: string): void => {
  const absolutePath = path.resolve(relativePath)

  const result = exec(readFileSync(absolutePath, 'utf8'))
  console.log(result)
}
