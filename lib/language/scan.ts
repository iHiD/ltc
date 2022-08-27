import { Token } from './models'
import { TokenType } from './enums'

export default (code: string): Token[] => {
  console.log(code)

  const tokens: Token[] = []
  const line = 0
  const char = 0

  // while(!isAtEnd()) {
  //   start = current
  //   scanToken()
  // }
  tokens.push(new Token(TokenType.EOF, '', null, line, char, char))
  return tokens
}
