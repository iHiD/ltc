import { Token } from '../../../lib/language/models'
import { TokenType } from '../../../lib/language/enums'

describe('Token', () => {
  test('toString with a literal', async () => {
    const token = new Token(TokenType.EOF, 'something', 'litty', 1, 2, 3)

    const expected = 'EOF something litty (L1:2-3)'
    expect(token.toString()).toEqual(expected)
  })
})
