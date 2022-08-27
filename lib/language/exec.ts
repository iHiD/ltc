import scan from './scan'

export default (code: string): string => {
  const tokens = scan(code)
  tokens.forEach((token) => {
    console.log(token)
  })

  return 'foobar'
}
