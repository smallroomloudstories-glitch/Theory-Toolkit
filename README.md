# Theory Toolkit

Theory Toolkit is a free, browser-based music theory visualization and teaching aid.

## Versions

- **v0.1** — Google Sheets prototype used to establish and test the core Explorer concepts.
- **v0.5** — First web application, currently in development.

## v0.5 scope

The initial web version will port the four core Explorers from v0.1:

- Fretboard Explorer
- Chord Shape Explorer
- Mode Explorer
- Key Explorer

The project is intended as an instructor-guided aid rather than a ground-zero music theory course.

## Development principles

- Musical facts and expected behavior are verified rather than guessed.
- The v0.1 workbook is the reference for existing Explorer behavior.
- Development proceeds in small, testable increments.
- When an increment requires browser/user validation, dependent work waits for that result.
- Data, music-theory logic, and user-interface code remain separate where practical.
- The fretboard model should not assume six strings internally, allowing other instruments/tunings later without rewriting the theory engine.
- The basic web version is intended to remain free, with no accounts, cookies, advertising, or tracking required for normal use.

## Technology

v0.5 begins as a static application using plain HTML, CSS, and JavaScript. Additional dependencies will be introduced only if the project develops a concrete need for them.
