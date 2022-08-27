import { TokenType } from '../enums'
import type { Literal } from '../types'

export class Token {
  type: TokenType
  lexeme: string
  literal: Literal
  line: number
  startChar: number
  endChar: number

  constructor(
    type: TokenType,
    lexeme: string,
    literal: Literal,
    line: number,
    startChar: number,
    endChar: number
  ) {
    this.type = type
    this.lexeme = lexeme
    this.literal = literal
    this.line = line
    this.startChar = startChar
    this.endChar = endChar
  }

  public toString(): string {
    return `${this.type} ${this.lexeme} ${this.literal} (L${this.line}:${this.startChar}-${this.endChar})`
  }
}
