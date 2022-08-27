import { Token } from './models'
import { TokenType } from './enums'

type voidFunc = () => void
type boolFunc = (char: string) => boolean

export default (code: string): Token[] => {
  // This is all the logic for the actual tokens
  const basicLexemes: { [key: string]: voidFunc } = {
    '=': () => addToken(TokenType.EQUAL),
    '+': () => addToken(TokenType.PLUS),
  }

  // It would be nice just to have the functions rather than nesting
  // them one level but that would involve declaring them above here,
  // which I currently don't want to do.
  const functionalLexemes: Array<[boolFunc, voidFunc]> = [
    [(char) => isDigit(char), () => handleNumber()],
    [(char) => isDigit(char), () => handleNumber()],
  ]

  const handleNumber = (): void => {
    // If we have numbers, just keep moving through the string.
    while (isDigit(peek())) {
      advance()
    }

    // When we hit a decimal point followed by a number, advance through
    // both the decimal place and also the numbers that come afterwards
    if (peek() === '.' && isDigit(peek(2))) {
      advance()

      while (isDigit(peek())) {
        advance()
      }
    }

    addToken(TokenType.NUMBER)
  }

  /* *********
   * *********
   * Next we have some useful checking methods for determining types of things
   * *********
   * *********/
  const isDigit = (char: string): boolean => {
    return !isNaN(char as any) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  /* *********
   * *********
   * Everything below here handles the actual iterating through
   * the code and tokenising it. This is done by stepping through
   * characters and checking/handling them using the code above
   * *********
   * *********/

  // An absolute cursor position
  let cursorIdx = 0

  // The Line and character this appears at.
  // Both are 0-based and in the token class we have
  // lineNumber and charPosition that normalised them to
  // 1-based for more obvious visual consumption
  let lineIdx = 0
  let charIdx = 0

  // The absolute start position of the current lexeme
  // And the relative char position of the current lexeme
  let lexemeStartCursorIdx = 0
  let lexemeStartCharIdx = 0

  const tokens: Token[] = []

  const addToken = (type: TokenType, literal?: string): void => {
    const text = code.substring(lexemeStartCursorIdx, cursorIdx)
    const normalisedLiteral = literal === undefined ? null : literal // Normalised undefined to null

    tokens.push(
      new Token(
        type,
        text,
        normalisedLiteral,
        lineIdx,
        lexemeStartCharIdx,
        lexemeStartCharIdx + (charIdx - lexemeStartCharIdx - 1)
      )
    )
  }

  const addEOFToken = (): void => {
    // These four setup lines just do a little ugly dance to move
    // things on so the char position is in position one on a new line
    // by itself. The first two get the start char position to be the next
    // line at position 0, then the final two move a character forward to the "end".
    lexemeStartCursorIdx = cursorIdx
    charIdx = lexemeStartCharIdx = 0
    lineIdx++
    charIdx++

    addToken(TokenType.EOF)
  }

  // Check to see if we're at the final charater
  const codeLength = code.length
  const isAtEnd = (): boolean => cursorIdx >= codeLength

  // Advance the scan onto the next character.
  // Increment the char counter and the current count
  const advance = (): string => {
    const char = code.charAt(cursorIdx)

    charIdx++
    cursorIdx++

    return char
  }

  // Peak at the next character without actually advancing
  const peek = (lookahead = 1): string => {
    if (cursorIdx + lookahead > codeLength) {
      return '\0'
    }
    return code.charAt(cursorIdx + lookahead)
  }

  // Consume the next token and see if it matches
  // the start of an expected lexeme. This is where the
  // actual intelligent bit of all this happens.
  const scanToken = (): void => {
    const char = advance()

    // Handle whitespace firt
    switch (char) {
      case ' ':
      case '\r':
      case '\t':
        return
      case '\n':
        lineIdx++
        charIdx = 0
        return
    }

    // Look for a function for this lexeme start
    // and execute it if there is one.
    const func = basicLexemes[char]
    if (func != null) {
      func()
      return
    }

    // Check the functional lexemes - each has a check method
    // (e.g. isDigit) and an evaluator to call if it's true
    for (let i = 0; i < functionalLexemes.length; i++) {
      // These two lines should be merged into the one below
      // but it's beyond my TS skills right now.
      const pair = functionalLexemes[i]
      if (pair == null) {
        break
      }

      const [check, evaluator] = pair
      if (check(char)) {
        evaluator()
        return
      }
    }

    // Handle some weird special cases
    switch (char) {
      case ' ':
      case '\r':
      case '\t':
        break
      case '\n':
        lineIdx++
        charIdx = 0
        break
      default:
        // TODO: Notify properly here
        // TODO: We probably want to just hard exit here.
        console.log(lineIdx, charIdx, `Unexpected character: ${char}`)
    }
  }

  // The main work happens here - loop until we've consumed
  // the final character.
  while (!isAtEnd()) {
    lexemeStartCursorIdx = cursorIdx
    lexemeStartCharIdx = charIdx
    scanToken()
  }

  // Add a final token to signify the end of the file
  addEOFToken()

  // And finally send the tokens back upstream to be processed.
  return tokens
}
