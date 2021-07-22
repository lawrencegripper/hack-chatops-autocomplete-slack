# Chatops autocomplete

This extension provides autocompletion style tips when using chatops. You provide it with a `help` document showing which commands are supported, for example the `.help` output from [`hubot`](https://hubot.github.com/).

This is very much a quick hack to play around with the concept.

Thanks to [Chrome Extension, TypeScript and Visual Studio Code](https://github.com/chibat/chrome-extension-typescript-starter) for the starting point.

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

## Option

* [Visual Studio Code](https://code.visualstudio.com/)

## Includes the following

* TypeScript
* Webpack
* React
* Jest
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test
`npx jest` or `npm run test`
