import type { TokenType } from '../enums'
import type { Literal } from '../types'

export class Token {
  type: TokenType
  lexeme: string
  literal: Literal
  lineIdx: number
  startCharIdx: number
  endCharIdx: number

  constructor(
    type: TokenType,
    lexeme: string,
    literal: Literal,
    lineIdx: number,
    startCharIdx: number,
    endCharIdx: number
  ) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.lineIdx = lineIdx
    this.startCharIdx = startCharIdx
    this.endCharIdx = endCharIdx
  }

  // Normalise to 1-based for more normal visual consumption
  public get lineNumber(): number {
    return this.lineIdx + 1
  }

  public get startCharPosition(): number {
    return this.startCharIdx + 1
  }

  public get endCharPosition(): number {
    return this.endCharIdx + 1
  }

  public toString(): string {
    return `${this.type} ${this.lexeme} ${this.literal} (L${this.lineNumber}:${this.startCharPosition}-${this.endCharPosition})`
  }
}
