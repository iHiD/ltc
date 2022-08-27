# Langauge Specification

A formal grammar can be seen in [grammar.ebnf](./grammar.ebnf) which can be visualised on website such as https://bottlecaps.de/rr/ui.

This document lists that grammar out in a more human-readable format with extra details.

## Data Types

### Booleans

- `true`
- `false`

### Numbers

All double-precision floating points.

- `0`
- `1`
- `1.5`

## Expressions

### Arithmetic

- Addition: `1 + 2`
- Subtraction: `1 - 2`
- Division: `1 / 2`
- Multiplication: `1 * 2`

### Comparison

- Equality: `1 == 2` (`false`)

## Statements

### Print:

Printing to the console is via `print`.
This is not exposed in the UI.
