# Competitive Programming Tools for VS Code

Quickly compile, run and judge competitive programming problems in VS Code.
Automatically download testcases , or write & test your own problems.

neocph supports a large number of popular platforms like Codeforces, Codechef,
TopCoder etc. with the help of competitive companion browser extension

## Quick start

1. Open any folder and create a problem file.
1. [Optional] Install
   [Competitive Companion](https://github.com/jmerle/competitive-companion#readme)
   in your browser to parse the testcases.
1. Press <kbd>Ctrl</kbd>+<kbd>R</kbd> to run your code.

## Features

-   Automatic compilation with display for compilation errors.
-   Intelligent judge with support for signals, timeouts and runtime errors.
-   Works with Competitive Companion.
-   Works locally for your own problems.
-   Support for several languages.

## Supported Languages

-   C/C++
-   Python
-   Java
-   Rust
-   Go

## Architecture

The extension runs in a Node.JS context with the
[VS Code API](https://code.visualstudio.com/api/references/vscode-api). The
extension shows the results in a web-view (code in `src/webview`). It
communicates to-and-from the extension by posting messages. See the
[webview API](https://code.visualstudio.com/api/extension-guides/webview) for
details. The webview is currently a React App.

It compiles and runs code by spawning binaries, and pipes input to STDIN and
compares each line of STDOUT with expected output to judge results.

Generated testcases are stored as JSON files (`.prob` extension) either in the
folder of the source code or the folder mentioned in extension preferences.

## Competitive Companion Integration

The extension is integrated with the
[Competitive Companion](https://github.com/jmerle/competitive-companion) browser
extension. Our extension runs a HTTP server on port `27121`, and companion
`POST`s a new problem to this server, and we process it.

## Developer Tools

Currently, TypeScript is used to develop both the Node.JS and the webview parts
of the extension. Webpack is used to bundle the extension to reduce extension size and
number of individual components.

Most of the TypeScript type definitions are stored in `src/types.ts`, the most
important of which is `Problem` and `Case`.

Several common functions have brief JSDocs on their purpose/ workings.

## Building and Hacking the extension in VS Code

The root source file is `src/extension.ts`, which registers the commands etc.

After making changes to code, you will want to test the extension. It's easy.
The launch config is in `.vscode/launch/json`. To launch the extension, just
press `F5`. It will bundle the extension using Webpack first, saving the output
in `dist/`.

We recommend installing `ESLint` VS Code extensions. Before
commiting, make sure you are passing the following tests:

-   ESLint lint: `npm run lint`.
-   Typescript compilation: `npm run test-compile`.
-   Pre-publish bundling: `npm run vscode:prepublish`.

### Bundling as `.vsix`

To generate the extension bundle for publishing, install
[VSCE package](https://www.npmjs.com/package/vsce) first (globally).

Then, in the root directory, run `vsce package` to generate the extension file.

## Getting help

To discuss ideas and problems while development, please create an issue in the
[repo](https://github.com/YuiHrsw/neocph).

## Contributing

You can contribute to this extension in many ways:

-   File bug reports by creating issues.
-   Develop this extension further.
-   Spreading the word about this extension.

**Before creating a Pull Request, please create an issue to discuss the
approach. It makes reviewing and accepting the PR much easier.**

## Original License

Copyright (C) 2023 Divyanshu Agrawal

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see https://www.gnu.org/licenses/.
