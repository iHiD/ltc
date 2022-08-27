# Interpreter

This is an interpreted language.
When the program is executed, it steps through several stages:

1. **Scanning:** The written code is split out into tokens (e.g. the letters `e`, `l`, `s`, `e` become `Token<Else>`).

All of this is handled by the Executor.

## Executor

See: `lib/language/exec.ts`.

This function orchestrates the compilation process through the others stages.

## Scanning

See: `lib/language/scan.ts`

Scanning is done via the `scan` function.
This:

1. Parses the code
2. Determines the lexemes (strings like `if`, `<`, `=`, `var`, etc)
3. Turns them into Token objects (the lexeme augmented with data such as the line and character numbers).

**TODO:** The scanner should take an array of "active" token types based on what is enabled for this exercise, and only recognise those.
If other token types are detected, it should raise an error saying "this is a reserved word that you can't use until later in the course".
