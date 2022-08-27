import { runFile } from '../../lib/language/cli'

describe('Runs fixture files', () => {
  test('runs basic fixture', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    await runFile('test/language/fixtures/basic.code')
    expect(log).toHaveBeenCalledWith('3\n')
    log.mockReset()
  })
})
