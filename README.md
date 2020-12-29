# YogurtCat-lib

YogurtCat's code library.

This code library is based on TypeScript and includes type judgment, type transformation, decorator types, mixin objects, container types, code generation, utilities, code evaluation, and more.

## Installation

```sh
npm i -S @yogurtcat/lib
```

## Usage

Add in webpack.config.js

```JavaScript
externals: {
  '@yogurtcat/lib': '$yogurtcat$lib'
}
```

Import modules by adding tags in index.html

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@1.0.6/dist/index.min.js"></script>
```

Import in TypeScript (or JavaScript)

```TypeScript
import {base, Decor, mixin, container, code, util, evaluate} from '@yogurtcat/lib'

const {is, to} = base
const {mount} = mixin
const {List, Dict, Mass} = container
const {Code} = code
const {print, printObj, printLine} = util
```
