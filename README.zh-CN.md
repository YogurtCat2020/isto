# **YogurtCat-Lib**

**爱吃酸奶的猫**的代码库，基于 TypeScript 开发，
存放了一些工具，常用的如下

- 类型判断
- 类型转化
- 容器
- Decor
- Code



## **安装**

首先通过 npm 安装

```sh
npm i -S @yogurtcat/lib
```

### **直接和目标代码打包**

啥也不加。

### **通过标签引入**

在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib'
}
```

在 html 文件中添加

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yogurtcat/lib@{版本号}/dist/index.min.js"></script>
```

其中的 `{版本号}` 请查询最新版本号后替换。

### **在 Vue 项目中使用**

在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib'
}
```

在 main.js 文件中添加

```JavaScript
import '@yogurtcat/lib/dist/index.min.js'
```

### **二次开发 npm 包**

如果目标包通过 webpack 打包，
则在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'commonjs2 @yogurtcat/lib'
}
```

或者
如果目标包通过标签引入，
则在 webpack.config.js 文件中添加

```JavaScript
externals: {
  '@yogurtcat/lib': 'global $yogurtcat$lib'
}
```



## **使用**

### **类型判断**

```TypeScript
import {is} from '@yogurtcat/lib'

is.undef(x)  // 是不是 undefined
is.null(x)  // 是不是 null
is.un(x)  // 是不是 undefined 或 null
is.bool(x)  // 是不是 布尔
is.num(x)  // 是不是 数字
is.str(x)  // 是不是 字符串
is.sym(x)  // 是不是 Symbol
is.func(x)  // 是不是 函数
is.obj(x)  // 是不是 Object，不包括 null
is.iter(x)  // 是不是 可迭代的，即实现了 for..of
is.arr(x)  // 是不是 Array
is.set(x)  // 是不是 Set
is.map(x)  // 是不是 Map
```

### **类型转化**

```TypeScript
import {to} from '@yogurtcat/lib'

/**
 * 返回 x 的类型
 * 如果 x 是 undefined 或 null，返回 null
 * 如果 x 是 布尔、数字、字符串、Symbol
 *   则分别返回 Boolean、Number、String、Symbol
 * 其他情况返回 x.constructor
 */
to.type(x)

/**
 * 把 x 转化成 Object 并返回
 * 如果 x 实现了 sym.obj 方法，返回 x[sym.obj]()
 * 如果 x 是 可迭代的，除了 Map，返回 Array 对象
 * 如果 x 是 其他 Object，返回新的 Object
 * 其他情况返回 x 本身
 */
to.obj(x)

/**
 * 把 x 转化成 字符串 并返回
 * 如果 x 实现了 sym.str 方法，返回 x[sym.str]()
 * 令 x = to.obj(x)
 * 如果 x 是 字符串、Symbol、Object，
 *   将其转化成适合阅读的 JS 代码格式字符串并返回
 * 其他情况返回 String(x)
 */
to.str(x)

/**
 * 把 x 转化成 布尔 并返回
 * 如果 x 实现了 sym.bool 方法，返回 x[sym.bool]()
 * 如果 x 是 undefined 或 null，返回 false
 * 如果 x 是 布尔，返回 x 本身
 * 如果 x 是 数字，返回 x !== 0
 * 如果 x 是 字符串、Object、Array、Set、Map，
 *   x 长度为 0 返回 false，否则返回 true
 * 其他情况返回 true
 */
to.bool(x)

/**
 * 返回 x 的长度
 * 如果 x 实现了 sym.size 方法，返回 x[sym.size]()
 * 如果 x 是 字符串、Object、Array、Set、Map，返回 x 的长度
 * 其他情况返回 null
 */
to.size(x)

/**
 * 判断 x 中是否包含 i
 * 如果 x 实现了 sym.has 方法，返回 x[sym.has](i)
 * 如果 x 是 字符串、Object、Array、Set、Map，返回 x 是否包含 i
 * 其他情况返回 null
 */
to.has(x, i)

/**
 * 把 x 转化成 迭代器 并返回
 * 如果 x 实现了 sym.iter 方法，返回 x[sym.iter]()
 * 如果 x 是 可迭代的，返回 x[Symbol.iterator]()
 * 如果 x 是 undefined 或 null，返回 空迭代器
 * 如果 x 是 Object，返回 x 的 键值对迭代器
 * 其他情况返回 x 的 本身迭代器，即迭代器只迭代返回 x 本身，只返回一项
 */
to.iter(x)

/**
 * 把 x 转化成 vki 迭代器 并返回，
 *   vki 迭代器 每次迭代返回 (v, k, i) 三个值
 *   分别表示 value、key、index
 * 如果 x 实现了 sym.vki 方法，返回 x[sym.vki]()
 * 如果 x 是 undefined 或 null，返回 空迭代器
 * 如果 x 是 可迭代的，除了 Map，返回 数组 vki 迭代器
 *   数组 vki 迭代器 返回的 v 是 数组的元素；k === i，是数组中元素的索引
 * 如果 x 是 其他 Object，返回 键值对 vki 迭代器
 * 其他情况返回 x 的本身 vki 迭代器，
 *   本身 vki 迭代器 返回的 v === x，k === i === 0，只返回一项
 */
to.vki(x)

/**
 * 把 x 转化成 Array 并返回
 * 返回 [...to.iter(x)]
 */
to.arr(x)

/**
 * 把 x 转化成 Set 并返回
 * 返回 new Set(to.iter(x))
 */
to.set(x)

/**
 * 把 x 转化成 Map 并返回
 * 返回 new Map(to.iter(x))
 */
to.map(x)
```

如果要实现 `to` 中的几个接口，需要导入 `sym`

```TypeScript
import {sym} from '@yogurtcat/lib'
```

### **容器**

容器主要包括 `List`、`Dict` 和 `Mass`。

`Container<K, V>` 是它们的父类，里面定义了公共的方法

```TypeScript
import {Container} from '@yogurtcat/lib'

Container.obj  // 调用 sym.obj 方法
Container.str()  // 调用 sym.str 方法
Container.bool  // 调用 sym.bool 方法
Container.size  // 调用 sym.size 方法
Container.has(item)  // 调用 sym.has 方法
Container.iter  // 调用 sym.iter 方法
Container.vki  // 调用 sym.vki 方法

Container.get(key)  // 返回 键 key 对应的 值
Container.set(key, val)  // 设置 键 key 对应的 值
Container.del(key)  // 删除 键 key
Container.take(key)  // 删除 键 key，返回对应的 值
Container.replace(key, val)  // 设置 键 key 对应的 值，返回原来的 值
Container.enforce(key, val)  // 设置 键 key 对应的 值，返回设置后的 值
/**
 * 如果 键 key 存在
 *   返回 键 key 对应的 值
 * 否则
 *   如果 valOrFactory 是 函数，令 val = valOrFactory()
 *   否则 令 val = valOrFactory
 *   返回 val
 */
Container.default(key, valOrFactory)
/**
 * 如果 键 key 存在
 *   返回 键 key 对应的 值
 * 否则
 *   如果 valOrFactory 是 函数，令 val = valOrFactory()
 *   否则 令 val = valOrFactory
 *   设置 键 key 对应的 值，返回设置后的 值
 */
Container.ensure(key, valOrFactory)
Container.splice(key, num, ...vals)  // 类似 Array.splice，只对 List 或 List 型 Mass 起作用
Container.merge(args)  // 合并 args
Container.decor(...args)  // 应用 args 中的装饰器
```

`List<T>` 继承了 `Container<number, T>`，是对 `Array` 的二次封装

```TypeScript
import {List} from '@yogurtcat/lib'

// 创建 List，可以传入任意对象，构造器会对传入参数调用 to.arr
const list = new List([0, 11, 22, 33, 44])

list.get(1)  // 11
list.set(0, 999)  // list: [999, 11, 22, 33, 44]
list.del(-2)  // list: [999, 11, 22, undefined, 44]
list.splice(2, 2)  // [22, undefined], list: [999, 11, 44]
list.merge([1, 2, 3])  // list: [999, 11, 44, 1, 2, 3]
list.merge({
    '': [233],
    0: -999,
    2: 0
  })  // list: [-999, 11, 0, 1, 2, 3, 233]
```

`Dict<K, V>` 继承了 `Container<K, V>`，是对 `Map` 的二次封装

```TypeScript
import {Dict} from '@yogurtcat/lib'

// 创建 Dict，可以传入任意对象，构造器会对传入参数调用 to.map
const dict = new Dict({
    a: 123,
    b: 'hello',
    c: {x: 0}
  })

dict.get('a')  // 123
dict.set('b', [1, 2, 3])  // dict: {a:123, b:[1,2,3], c:{x:0}}
dict.del('a')  // dict: {b:[1,2,3], c:{x:0}}
dict.merge({
    a: 'hi',
    b: [233, 666],
    c: {
      y: 1
    }
  })  // dict: {b:[233,666], c:{y:1}, a:'hi'}
```

`Mass` 初始时是 `List` 和 `Dict` 的叠加态，
当执行 `List` 或 `Dict` 特征的操作后，
就会坍缩成对应类型，坍缩后不可再修改类型，
`Mass` 中设置的 值，如果是 类容器对象
  （`Object`、`Array`、`Set`、`Map`、`List`、`Dict`、`Mass`），
  就会自动初始化成 `Mass`

```TypeScript
import {Mass} from '@yogurtcat/lib'

let mass
mass = Mass.new()  // mass: undefined
mass = Mass.new([1, 2, 3])  // mass: [1, 2, 3]
mass = Mass.new({x: 0, y: 1})  // mass: {x:0, y:1}

mass = Mass.new({
    a: 123,
    b: 'hello',
    c: {x: 0}
  })

mass.get('a')  // 123
mass.set('b', [1, 2, 3])  // mass: {a:123, b:[1,2,3], c:{x:0}}
mass.del('a')  // mass: {b:[1,2,3], c:{x:0}}
mass.merge({
    a: 'hi',
    b: [233, 666],
    c: {
      y: 1
    }
  })  // mass: {b:[1,2,3,233,666], c:{x:0,y:1}, a:'hi'}
```

### **Decor**

`Container.decor` 方法中传入的参数，
  可以是一般的函数：`(x: any) => any`，
  也可以是 `Decor` 对象

```TypeScript
import {Mass, Decor} from '@yogurtcat/lib'

const decorNull = Decor.new()  // 无操作
const decorAtom = Decor.new(
  x => {x.set('a', 'hello')}
)  // 执行传入的函数
const decorChain = Decor.new([
  x => {x.set('a', 'hi')},
  x => {x.set('b', [])},
  x => {x.set('c', {})}
])  // 依次执行数组中的函数
/**
 * 如果有前后配对的一组操作，可以如下创建装饰器。
 * 该装饰器先执行 B（before）对应的函数，
 * 然后执行中间操作（待定）
 * 最后执行 A（after）对应的函数
 */
const decorTree = Decor.new({
  B: x => {x.merge({b: [233]})},
  A: x => {x.merge({b: [666]})}
})
decorTree.up(
  x => {x.merge({b: [1, 2, 3]})}
)  // 中间操作 通过 .up 方法设置

Mass.new().decor(
    decorNull,
    decorAtom,
    decorChain,
    decorTree
  )  // {a:'hi', b:[233,1,2,3,666], c:{}}
```

### **Code**

`Code` 定义了 Code 语法，Code 语法 允许用 容器 来描述 JS 代码，
`Code` 可以将 符合 Code 语法 的 容器 转换成 JS 代码。

```TypeScript
import {Code} from '@yogurtcat/lib'

// 字符串 是 Code，会原样返回
Code.new(`() => {console.log('hello')}`).$
=== `() => {console.log('hello')}`

// 数组 中每个 Code 会用 \n 拼接起来
Code.new([
    `() => {`,
    `console.log('hello')`,
    `}`
  ]).$
=== `() => {
console.log('hello')
}`

// Object 中的 T（template）为模板，模板中的 @ 是 占位符
// C（codes）为 Code 数组，其中的 Code 会依次替换占位符
Code.new({
  T: `() => {@}`,
  C: [
    `console.log('hello')`
  ]
}).$
=== `() => {console.log('hello')}`

// P（placeholder）可以修改 占位符
Code.new({
  T: `() => {<P>}`,
  C: [
    `console.log('hello')`
  ],
  P: '<P>'
}).$
=== `() => {console.log('hello')}`
```

`Code.extension` 是一个 `Dict` 对象，可以定义扩展，
其中 键 是 扩展名，值是一个函数：`x => Code`，
传入 `Object` 对象，返回 `Code` 对象。

`Object` 对象中用 `X（extension）` 键 指定扩展名，可以调用扩展。

默认提供了以下扩展

```TypeScript
import {Code} from '@yogurtcat/lib'

// 括号扩展
//   注意 C（code）不需要传递数组
Code.new({
  X: '()',
  C: `'hello'`
}).$
=== `('hello')`

Code.new({
  X: '[]',
  C: `'hello'`
}).$
=== `['hello']`

Code.new({
  X: '{}',
  C: `'hello'`
}).$
=== `{'hello'}`

// C（closure）扩展
//   注意 C（code）不需要传递数组
Code.new({
  X: 'C',
  T: `() => {@}`
  C: `console.log('hello')`
}).$
=== `() => {console.log('hello')}`

/**
 * O（obj）扩展
 * I（init）键 为一个 Object
 *   定义对象初始化的键值对
 *   键 为普通的键，值 为 Code
 */
Code.new({
  X: 'O',
  I: {
    a: `'hello'`,
    b: {
      X: 'O',
      I: {
        a: `'world'`
      }
    }
  }
}).$
=== `{a: 'hello',
b: {a: 'world'}}`

/**
 * O（opr）键 为一个数组
 *   定义针对对象的操作
 *   当存在这个键时，以闭包形式返回
 *   R 变量 引用所返回的对象
 */
Code.new({
  X: 'O',
  I: {
    a: `'hello'`
  },
  O: [
    `R.b = 'world'`,
    {
      T: `for(let i=0; i<3; i++) {@}`,
      C: [[
        `R['c'+i] = i`,
        `R['d'+i] = -i`
      ]]
    }
  ]
}).$
=== `(()=>{const R = {a: 'hello'}
R.b = 'world'
for(let i=0; i<3; i++) {R['c'+i] = i
R['d'+i] = -i}
return R})()`

/**
 * A（arr）扩展
 * I（init）键 为一个 Array
 * 其他类似于 O 扩展
 */
Code.new({
  X: 'A',
  I: [
    `666`,
    `'hello'`
  ]
}).$
=== `[666,
'hello']`

/**
 * S（set）扩展
 * 类似于 A 扩展
 */
Code.new({
  X: 'S',
  I: [
    `666`,
    `'hello'`
  ]
}).$
=== `new Set([666,
'hello'])`

/**
 * M（map）扩展
 * 类似于 O 扩展
 */
Code.new({
  X: 'M',
  I: {
    a: `666`,
    b: `'hello'`
  }
}).$
=== `to.map({a: 666,
b: 'hello'})`

/**
 * L（list）扩展
 * 类似于 A 扩展
 */
Code.new({
  X: 'L',
  I: [
    `666`,
    `'hello'`
  ]
}).$
=== `new List([666,
'hello'])`

/**
 * D（dict）扩展
 * 类似于 O 扩展
 */
Code.new({
  X: 'D',
  I: {
    a: `666`,
    b: `'hello'`
  }
}).$
=== `new Dict({a: 666,
b: 'hello'})`
```
