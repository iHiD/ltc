import scan from '../../lib/language/scan'
import { Token } from '../../lib/language/models'
import { TokenType } from '../../lib/language/enums'

describe('Scan', () => {
  test('returns an empty array for no code', async () => {
    const eofToken = new Token(TokenType.EOF, '', null, 0, 0, 0)

    expect(scan('')).toEqual([eofToken])
  })
})
