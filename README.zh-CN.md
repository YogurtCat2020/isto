# YogurtCat-lib

爱吃酸奶的猫的代码库。

这个代码库是基于 TypeScript 开发的，包含类型判断、类型转化、装饰器类、混入对象、容器类、代码生成、杂项工具、代码解释等等。

## 安装

```sh
npm i -S @yogurtcat/lib
```

## 使用

在 webpack.config.js 中添加

```JavaScript
externals: {
  '@yogurtcat/lib': '$yogurtcat$lib'
}
```

在 index.html 中用标签引入模块

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@1.0.6/dist/index.min.js"></script>
```

在 TypeScript（或 JavaScript）中导入

```TypeScript
import {base, Decor, mixin, container, code, util, evaluate} from '@yogurtcat/lib'

const {is, to} = base
const {mount} = mixin
const {List, Dict, Mass} = container
const {Code} = code
const {print, printObj, printLine} = util
```
