import scan from '../../lib/language/scan'
import { Token } from '../../lib/language/models'
import { TokenType } from '../../lib/language/enums'

describe('Scan', () => {
  test('returns an empty array for no code', async () => {
    const code = ''
    const tokens = [new Token(TokenType.EOF, '', null, 1, 0, 0)]

    expect(scan(code)).toEqual(tokens)
  })

  test('returns single character tokens correctly', async () => {
    const code = '+ ='
    const tokens = [
      new Token(TokenType.PLUS, '+', null, 0, 0, 0),
      new Token(TokenType.EQUAL, '=', null, 0, 2, 2),
      new Token(TokenType.EOF, '', null, 1, 0, 0),
    ]

    expect(scan(code)).toEqual(tokens)
  })

  test('returns integers correctly', async () => {
    const code = '5'
    const tokens = [
      new Token(TokenType.NUMBER, '5', null, 0, 0, 0),
      new Token(TokenType.EOF, '', null, 1, 0, 0),
    ]

    expect(scan(code)).toEqual(tokens)
  })

  test('returns floats correctly', async () => {
    const code = '5.43'
    const tokens = [
      new Token(TokenType.NUMBER, '5.43', null, 0, 0, 3),
      new Token(TokenType.EOF, '', null, 1, 0, 0),
    ]

    expect(scan(code)).toEqual(tokens)
  })

  test('returns simple sum correctly', async () => {
    const code = '5 + 3.74 ='
    const tokens = [
      new Token(TokenType.NUMBER, '5', null, 0, 0, 0),
      new Token(TokenType.PLUS, '+', null, 0, 2, 2),
      new Token(TokenType.NUMBER, '3.74', null, 0, 4, 7),
      new Token(TokenType.EQUAL, '=', null, 0, 9, 9),
      new Token(TokenType.EOF, '', null, 1, 0, 0),
    ]

    expect(scan(code)).toEqual(tokens)
  })
})
