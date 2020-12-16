/*!
 * @yogurtcat/lib.js v1.0.1
 * (c) 2020- YogurtCat
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Decor.ts":
/*!**********************!*
  !*** ./src/Decor.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ./base */ "./src/base/index.ts");
class Decor {
    static new(...args) {
        return this._new(...base_1.to.obj(args));
    }
    static _new(...args) {
        if (args.length <= 0)
            return decorNull;
        else if (args.length == 1) {
            let [arg] = args;
            if (arg instanceof Decor)
                return arg;
            if (base_1.is.un(arg))
                return decorNull;
            if (base_1.is.func(arg))
                return new DecorAtom(arg);
            if (base_1.is.arr(arg))
                return new DecorChain(arg);
            if (base_1.is.obj(arg))
                return new DecorTree(arg);
        }
        else
            return new DecorChain(args);
    }
    [base_1.sym.obj]() {
        return this;
    }
    [base_1.sym.bool]() {
        return base_1.err.notImplemented();
    }
    decor(x) {
        return base_1.err.notImplemented();
    }
}
exports.default = Decor;
class DecorNull extends Decor {
    constructor() {
        super();
    }
    [base_1.sym.bool]() {
        return false;
    }
    decor(x) {
        return x;
    }
}
class DecorAtom extends Decor {
    constructor(func) {
        super();
        this.func = func;
    }
    [base_1.sym.bool]() {
        return true;
    }
    decor(x) {
        const r = this.func(x);
        if (base_1.is.un(r))
            return x;
        return r;
    }
}
class DecorChain extends Decor {
    constructor(args) {
        super();
        this.decors = args.map(i => i instanceof Decor ? i : Decor._new(i));
    }
    [base_1.sym.bool]() {
        return base_1.to.bool(this.decors);
    }
    decor(x) {
        for (const decor of this.decors)
            x = decor.decor(x);
        return x;
    }
}
class DecorTree extends Decor {
    constructor(args) {
        super();
        const { before, after } = base_1.sugar(args, {
            before: 'B',
            after: 'A'
        });
        this.before = before instanceof Decor ? before : Decor._new(before);
        this.after = after instanceof Decor ? after : Decor._new(after);
    }
    [base_1.sym.bool]() {
        return base_1.to.bool(this.before) || base_1.to.bool(this.after) || base_1.to.bool(this.decors);
    }
    decor(x) {
        x = this.before.decor(x);
        if (!base_1.is.un(this.decors))
            x = this.decors.decor(x);
        x = this.after.decor(x);
        return x;
    }
    up(...args) {
        if (base_1.is.un(this.decors))
            this.decors = Decor.new(...args);
    }
}
const decorNull = new DecorNull();


/***/ }),

/***/ "./src/base/asrt.ts":
/*!**************************!*
  !*** ./src/base/asrt.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const err_1 = __webpack_require__(/*! ./err */ "./src/base/err.ts");
function default_1(cdt, msg) {
    if (!cdt) {
        if (is_1.default.un(msg))
            err_1.default.assertionFail();
        else
            err_1.default.err(msg);
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/base/err.ts":
/*!*************************!*
  !*** ./src/base/err.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = new (class {
    constructor() {
        this.err = (msg) => { throw `<err> ${msg} </err>`; };
        this.notImplemented = () => this.err('not implemented !');
        this.assertionFail = () => this.err('assertion fail !');
    }
})();


/***/ }),

/***/ "./src/base/has.ts":
/*!*************************!*
  !*** ./src/base/has.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.objHas = exports.funcHas = void 0;
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
function default_1(x, a) {
    return (is_1.default.func(x) || is_1.default.obj(x)) && a in x;
}
exports.default = default_1;
function funcHas(x, a) {
    return is_1.default.func(x) && a in x;
}
exports.funcHas = funcHas;
function objHas(x, a) {
    return is_1.default.obj(x) && a in x;
}
exports.objHas = objHas;


/***/ }),

/***/ "./src/base/index.ts":
/*!***************************!*
  !*** ./src/base/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asrt = exports.err = exports.sugar = exports.init = exports.objHas = exports.funcHas = exports.has = exports.split = exports.join = exports.map = exports.sym = exports.to = exports.is = void 0;
var is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
Object.defineProperty(exports, "is", ({ enumerable: true, get: function () { return is_1.default; } }));
var to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
Object.defineProperty(exports, "to", ({ enumerable: true, get: function () { return to_1.default; } }));
var sym_1 = __webpack_require__(/*! ./sym */ "./src/base/sym.ts");
Object.defineProperty(exports, "sym", ({ enumerable: true, get: function () { return sym_1.default; } }));
var map_1 = __webpack_require__(/*! ./map */ "./src/base/map.ts");
Object.defineProperty(exports, "map", ({ enumerable: true, get: function () { return map_1.default; } }));
var join_1 = __webpack_require__(/*! ./join */ "./src/base/join.ts");
Object.defineProperty(exports, "join", ({ enumerable: true, get: function () { return join_1.default; } }));
var split_1 = __webpack_require__(/*! ./split */ "./src/base/split.ts");
Object.defineProperty(exports, "split", ({ enumerable: true, get: function () { return split_1.default; } }));
var has_1 = __webpack_require__(/*! ./has */ "./src/base/has.ts");
Object.defineProperty(exports, "has", ({ enumerable: true, get: function () { return has_1.default; } }));
Object.defineProperty(exports, "funcHas", ({ enumerable: true, get: function () { return has_1.funcHas; } }));
Object.defineProperty(exports, "objHas", ({ enumerable: true, get: function () { return has_1.objHas; } }));
var init_1 = __webpack_require__(/*! ./init */ "./src/base/init.ts");
Object.defineProperty(exports, "init", ({ enumerable: true, get: function () { return init_1.default; } }));
var sugar_1 = __webpack_require__(/*! ./sugar */ "./src/base/sugar.ts");
Object.defineProperty(exports, "sugar", ({ enumerable: true, get: function () { return sugar_1.default; } }));
var err_1 = __webpack_require__(/*! ./err */ "./src/base/err.ts");
Object.defineProperty(exports, "err", ({ enumerable: true, get: function () { return err_1.default; } }));
var asrt_1 = __webpack_require__(/*! ./asrt */ "./src/base/asrt.ts");
Object.defineProperty(exports, "asrt", ({ enumerable: true, get: function () { return asrt_1.default; } }));


/***/ }),

/***/ "./src/base/init.ts":
/*!**************************!*
  !*** ./src/base/init.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const container_1 = __webpack_require__(/*! ../container */ "./src/container/index.ts");
exports.default = new (class {
    constructor() {
        this.bool = () => false;
        this.num = () => 0;
        this.str = () => '';
        this.sym = () => Symbol();
        this.func = () => () => { };
        this.obj = () => ({});
        this.arr = () => [];
        this.set = () => new Set();
        this.map = () => new Map();
        this.list = () => new container_1.List();
        this.dict = () => new container_1.Dict();
    }
})();


/***/ }),

/***/ "./src/base/is.ts":
/*!************************!*
  !*** ./src/base/is.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = new (class {
    constructor() {
        this.undef = (x) => {
            return x === undefined;
        };
        this.null = (x) => {
            return x === null;
        };
        this.un = (x) => {
            return this.undef(x) || this.null(x);
        };
        this.bool = (x) => {
            return typeof x === 'boolean';
        };
        this.false = (x) => {
            return x === false;
        };
        this.true = (x) => {
            return x === true;
        };
        this.num = (x) => {
            return typeof x === 'number';
        };
        this.int = (x) => {
            return Number.isInteger(x);
        };
        this.real = (x) => {
            return this.fin(x) || this.nan(x);
        };
        this.fin = (x) => {
            return Number.isFinite(x);
        };
        this.nan = (x) => {
            return Number.isNaN(x);
        };
        this.str = (x) => {
            return typeof x === 'string';
        };
        this.sym = (x) => {
            return typeof x === 'symbol';
        };
        this.func = (x) => {
            return typeof x === 'function';
        };
        this.type = (x) => {
            return this.func(x);
        };
        this.obj = (x) => {
            return typeof x === 'object' && !this.null(x);
        };
        this.iter = (x) => {
            return this.obj(x) && Symbol.iterator in x;
        };
        this.arr = (x) => {
            return Array.isArray(x);
        };
        this.set = (x) => {
            return x instanceof Set;
        };
        this.map = (x) => {
            return x instanceof Map;
        };
    }
})();


/***/ }),

/***/ "./src/base/join.ts":
/*!**************************!*
  !*** ./src/base/join.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
function default_1(arr, sep) {
    if (is_1.default.un(sep))
        sep = '';
    return [...to_1.default.iter(arr)].join(sep);
}
exports.default = default_1;


/***/ }),

/***/ "./src/base/map.ts":
/*!*************************!*
  !*** ./src/base/map.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
function* default_1(x, func) {
    for (const [v, k, i] of to_1.default.vki(x))
        yield func(v, k, i);
}
exports.default = default_1;


/***/ }),

/***/ "./src/base/split.ts":
/*!***************************!*
  !*** ./src/base/split.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
function default_1(str) {
    const r = [];
    let q = null;
    let p = null;
    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);
        if (!is_1.default.un(q)) {
            if (c === '\\')
                i++;
            else if (c === q) {
                r.push(eval(str.slice(p, i + 1)));
                q = null;
                p = null;
            }
        }
        else if (to_1.default.has('\'"`', c)) {
            q = c;
            p = i;
        }
        else if (!is_1.default.un(p)) {
            if (c === ' ') {
                r.push(str.slice(p, i));
                p = null;
            }
        }
        else if (c !== ' ')
            p = i;
    }
    if (!is_1.default.un(p))
        r.push(str.slice(p));
    return r;
}
exports.default = default_1;


/***/ }),

/***/ "./src/base/sugar.ts":
/*!***************************!*
  !*** ./src/base/sugar.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
function default_1(args, keys) {
    for (const k in keys) {
        const s = keys[k];
        if (is_1.default.un(args[k]))
            args[k] = args[s];
    }
    return args;
}
exports.default = default_1;


/***/ }),

/***/ "./src/base/sym.ts":
/*!*************************!*
  !*** ./src/base/sym.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = new (class {
    constructor() {
        this.obj = Symbol('obj');
        this.str = Symbol('str');
        this.bool = Symbol('bool');
        this.size = Symbol('size');
        this.has = Symbol('has');
        this.iter = Symbol('iter');
        this.vki = Symbol('vki');
    }
})();


/***/ }),

/***/ "./src/base/to.ts":
/*!************************!*
  !*** ./src/base/to.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const sym_1 = __webpack_require__(/*! ./sym */ "./src/base/sym.ts");
const has_1 = __webpack_require__(/*! ./has */ "./src/base/has.ts");
exports.default = new (class {
    constructor() {
        this.type = (x) => {
            if (is_1.default.un(x))
                return null;
            if (is_1.default.bool(x))
                return Boolean;
            if (is_1.default.num(x))
                return Number;
            if (is_1.default.str(x))
                return String;
            if (is_1.default.sym(x))
                return Symbol;
            return x.constructor;
        };
        this.obj = (x) => {
            if (has_1.objHas(x, sym_1.default.obj))
                return x[sym_1.default.obj]();
            if (is_1.default.map(x)) {
                const r = {};
                for (let [k, v] of x) {
                    if (!(is_1.default.str(k) || is_1.default.sym(k)))
                        k = String(k);
                    r[k] = this.obj(v);
                }
                return r;
            }
            if (is_1.default.iter(x)) {
                const r = [];
                for (const i of x)
                    r.push(this.obj(i));
                return r;
            }
            if (is_1.default.obj(x)) {
                const r = {};
                for (const k in x)
                    r[k] = this.obj(x[k]);
                return r;
            }
            return x;
        };
        this.str = (x, ...args) => {
            if (has_1.objHas(x, sym_1.default.str))
                return x[sym_1.default.str](...args);
            const _str = (x, n = 0) => {
                if (!is_1.default.obj(x))
                    return String(x);
                n += 1;
                const ind_in = ' '.repeat(2 * n);
                const ind_out = ' '.repeat(2 * (n - 1));
                if (is_1.default.arr(x))
                    return '[' + x
                        .map(i => '\n' + ind_in + _str(i, n))
                        .join(',') + '\n' + ind_out + ']';
                return '{' + this.arr(x)
                    .map(([k, v]) => '\n' + ind_in + _str(k) + ': ' + _str(v, n))
                    .join(',') + '\n' + ind_out + '}';
            };
            return _str(this.obj(x), ...args);
        };
        this.bool = (x) => {
            if (has_1.objHas(x, sym_1.default.bool))
                return x[sym_1.default.bool]();
            if (is_1.default.un(x))
                return false;
            if (is_1.default.bool(x))
                return x;
            if (is_1.default.num(x))
                return x !== 0;
            if (is_1.default.str(x) || is_1.default.arr(x))
                return x.length > 0;
            if (is_1.default.set(x) || is_1.default.map(x))
                return x.size > 0;
            if (is_1.default.obj(x)) {
                for (const k in x)
                    return true;
                return false;
            }
            return true;
        };
        this.size = (x) => {
            if (has_1.objHas(x, sym_1.default.size))
                return x[sym_1.default.size]();
            if (is_1.default.str(x) || is_1.default.arr(x))
                return x.length;
            if (is_1.default.set(x) || is_1.default.map(x))
                return x.size;
            if (is_1.default.obj(x)) {
                let r = 0;
                for (const k in x)
                    r += 1;
                return r;
            }
            return null;
        };
        this.has = (x, i) => {
            if (has_1.objHas(x, sym_1.default.has))
                return x[sym_1.default.has](i);
            if (is_1.default.str(x)) {
                if (is_1.default.str(i))
                    return x.indexOf(i) >= 0;
                return false;
            }
            if (is_1.default.arr(x))
                return x.indexOf(i) >= 0;
            if (is_1.default.set(x))
                return x.has(i);
            if (is_1.default.map(x))
                return !is_1.default.un(x.get(i));
            if (is_1.default.obj(x))
                return i in x;
            return false;
        };
        this.iter = (x) => {
            if (has_1.objHas(x, sym_1.default.iter))
                return x[sym_1.default.iter]();
            if (is_1.default.iter(x))
                return x[Symbol.iterator]();
            return (function* (x) {
                if (is_1.default.un(x))
                    return;
                else if (is_1.default.obj(x))
                    for (const k in x)
                        yield [k, x[k]];
                else
                    yield x;
            })(x);
        };
        this.vki = (x) => {
            if (has_1.objHas(x, sym_1.default.vki))
                return x[sym_1.default.vki]();
            return (function* (x) {
                if (is_1.default.un(x))
                    return;
                if (is_1.default.map(x)) {
                    let i = 0;
                    for (const [k, v] of x) {
                        yield [v, k, i];
                        i++;
                    }
                }
                else if (is_1.default.iter(x)) {
                    let i = 0;
                    for (const v of x) {
                        yield [v, i, i];
                        i++;
                    }
                }
                else if (is_1.default.obj(x)) {
                    let i = 0;
                    for (const k in x) {
                        yield [x[k], k, i];
                        i++;
                    }
                }
                else
                    yield [x, 0, 0];
            })(x);
        };
        this.arr = (x) => {
            return [...this.iter(x)];
        };
        this.set = (x) => {
            return new Set(this.iter(x));
        };
        this.map = (x) => {
            return new Map(this.iter(x));
        };
    }
})();


/***/ }),

/***/ "./src/code/Code.ts":
/*!**************************!*
  !*** ./src/code/Code.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const container_1 = __webpack_require__(/*! ../container */ "./src/container/index.ts");
class Code {
    constructor(code) {
        this.code = code;
    }
    static new(...args) {
        return this._new(...base_1.to.obj(args));
    }
    static _new(...args) {
        if (args.length <= 0)
            return codeNull;
        else if (args.length == 1) {
            let [arg] = args;
            if (arg instanceof Code)
                return arg;
            if (base_1.is.un(arg))
                return codeNull;
            if (base_1.is.str(arg))
                return new CodeAtom(arg);
            if (base_1.is.arr(arg))
                return new CodeChain(arg);
            if (base_1.is.obj(arg)) {
                let _a = base_1.sugar(arg, {
                    extension: 'X'
                }), { extension, X } = _a, rem = __rest(_a, ["extension", "X"]);
                if (!base_1.is.un(extension)) {
                    extension = this.extension.get(extension);
                    if (base_1.is.un(extension))
                        return codeNull;
                    return extension(rem);
                }
                return new CodeTree(rem);
            }
        }
        else
            return new CodeChain(args);
    }
    [base_1.sym.obj]() {
        return this;
    }
    [base_1.sym.str]() {
        return this.code;
    }
    [base_1.sym.bool]() {
        return base_1.to.bool(this.code);
    }
    toString() {
        return this.code;
    }
}
exports.default = Code;
Code.extension = new container_1.Dict();
class CodeNull extends Code {
    constructor() {
        super('');
    }
}
class CodeAtom extends Code {
    constructor(code) {
        super(code);
    }
}
class CodeChain extends Code {
    constructor(args) {
        super(args.map(i => i instanceof Code ? i : Code._new(i)).join('\n'));
    }
}
class CodeTree extends Code {
    constructor(args) {
        let { template, codes, placeholder } = base_1.sugar(args, {
            template: 'T',
            codes: 'C',
            placeholder: 'P'
        });
        if (base_1.is.un(placeholder))
            placeholder = '@';
        base_1.asrt(base_1.to.bool(placeholder), 'placeholder不能为空字符串！');
        const templates = template.split(placeholder);
        const t = [];
        for (let i = 0; i < templates.length - 1; i++) {
            const code = codes[i];
            t.push(templates[i]);
            t.push(code instanceof Code ? code : Code._new(code));
        }
        t.push(templates[templates.length - 1]);
        super(t.join(''));
    }
}
const codeNull = new CodeNull();


/***/ }),

/***/ "./src/code/CodeBracket.ts":
/*!*********************************!*
  !*** ./src/code/CodeBracket.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeBracketCurly = exports.CodeBracketSquare = exports.CodeBracketRound = void 0;
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeBracket extends Code_1.default {
    constructor(args, bracket) {
        const _a = base_1.sugar(args, {
            template: 'T',
            codes: 'C'
        }), { template, T, codes, C } = _a, rem = __rest(_a, ["template", "T", "codes", "C"]);
        super(Code_1.default.new(Object.assign({ template: bracket, codes: [codes] }, rem)).code);
    }
}
exports.default = CodeBracket;
class CodeBracketRound extends CodeBracket {
    constructor(args) {
        super(args, `(@)`);
    }
}
exports.CodeBracketRound = CodeBracketRound;
class CodeBracketSquare extends CodeBracket {
    constructor(args) {
        super(args, `[@]`);
    }
}
exports.CodeBracketSquare = CodeBracketSquare;
class CodeBracketCurly extends CodeBracket {
    constructor(args) {
        super(args, `{@}`);
    }
}
exports.CodeBracketCurly = CodeBracketCurly;
Code_1.default.extension.set('()', x => new CodeBracketRound(x));
Code_1.default.extension.set('[]', x => new CodeBracketSquare(x));
Code_1.default.extension.set('{}', x => new CodeBracketCurly(x));


/***/ }),

/***/ "./src/code/CodeClosure.ts":
/*!*********************************!*
  !*** ./src/code/CodeClosure.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeClosure extends Code_1.default {
    constructor(args) {
        const _a = base_1.sugar(args, {
            template: 'T',
            code: 'C'
        }), { template, T, codes, code, C } = _a, rem = __rest(_a, ["template", "T", "codes", "code", "C"]);
        super(Code_1.default.new(Object.assign({ template: template, codes: [code] }, rem)).code);
    }
}
exports.default = CodeClosure;
Code_1.default.extension.set('closure', x => new CodeClosure(x));
Code_1.default.extension.set('C', x => new CodeClosure(x));


/***/ }),

/***/ "./src/code/CodeContainer.ts":
/*!***********************************!*
  !*** ./src/code/CodeContainer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeObj = exports.CodeMap = exports.CodeArr = exports.CodeSet = exports.CodeDict = exports.CodeList = void 0;
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
const CodeVar_1 = __webpack_require__(/*! ./CodeVar */ "./src/code/CodeVar.ts");
class CodeContainer extends CodeVar_1.default {
    constructor(args, initClosure, initItem, codeInitItem) {
        super(args, init => ({
            template: initClosure,
            codes: [base_1.map(init, (v, k, i) => ({
                    template: initItem + (i + 1 < base_1.to.size(init) ? `,` : ``),
                    codes: codeInitItem(v, k, i)
                }))]
        }));
    }
}
exports.default = CodeContainer;
class CodeList extends CodeContainer {
    constructor(args) {
        super(args, `new List([@])`, `@`, v => [v]);
    }
}
exports.CodeList = CodeList;
class CodeDict extends CodeContainer {
    constructor(args) {
        super(args, `new Dict({@})`, `@: @`, (v, k) => [k, v]);
    }
}
exports.CodeDict = CodeDict;
class CodeSet extends CodeContainer {
    constructor(args) {
        super(args, `new Set([@])`, `@`, v => [v]);
    }
}
exports.CodeSet = CodeSet;
class CodeArr extends CodeContainer {
    constructor(args) {
        super(args, `[@]`, `@`, v => [v]);
    }
}
exports.CodeArr = CodeArr;
class CodeMap extends CodeContainer {
    constructor(args) {
        super(args, `to.map({@})`, `@: @`, (v, k) => [k, v]);
    }
}
exports.CodeMap = CodeMap;
class CodeObj extends CodeContainer {
    constructor(args) {
        super(args, `{@}`, `@: @`, (v, k) => [k, v]);
    }
}
exports.CodeObj = CodeObj;
Code_1.default.extension.set('list', x => new CodeList(x));
Code_1.default.extension.set('L', x => new CodeList(x));
Code_1.default.extension.set('dict', x => new CodeDict(x));
Code_1.default.extension.set('D', x => new CodeDict(x));
Code_1.default.extension.set('set', x => new CodeSet(x));
Code_1.default.extension.set('S', x => new CodeSet(x));
Code_1.default.extension.set('arr', x => new CodeArr(x));
Code_1.default.extension.set('A', x => new CodeArr(x));
Code_1.default.extension.set('map', x => new CodeMap(x));
Code_1.default.extension.set('M', x => new CodeMap(x));
Code_1.default.extension.set('obj', x => new CodeObj(x));
Code_1.default.extension.set('O', x => new CodeObj(x));


/***/ }),

/***/ "./src/code/CodeVar.ts":
/*!*****************************!*
  !*** ./src/code/CodeVar.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeVar extends Code_1.default {
    constructor(args, codeInit) {
        let _a = base_1.sugar(args, {
            template: 'T',
            closure: 'C',
            variable: 'V',
            name: 'N',
            init: 'I',
            opr: 'O'
        }), { template, T, codes, closure, C, variable, V, name, N, init, I, opr, O } = _a, rem = __rest(_a, ["template", "T", "codes", "closure", "C", "variable", "V", "name", "N", "init", "I", "opr", "O"]);
        if (base_1.is.un(closure))
            closure = `(()=>{@})()`;
        if (base_1.is.un(variable))
            variable = false;
        if (base_1.is.un(name))
            name = 'R';
        if (base_1.is.un(codeInit))
            codeInit = init => init;
        if (!base_1.to.bool(opr))
            super(Code_1.default.new(Object.assign({ template: '@', codes: [codeInit(init)] }, rem)).code);
        else
            super(Code_1.default.new(Object.assign({ template: closure, codes: [{
                        template: `@ @ = @\n@\nreturn @`,
                        codes: [
                            variable ? 'let' : 'const',
                            name,
                            codeInit(init),
                            opr,
                            name
                        ]
                    }] }, rem)).code);
    }
}
exports.default = CodeVar;
Code_1.default.extension.set('var', x => new CodeVar(x));
Code_1.default.extension.set('V', x => new CodeVar(x));


/***/ }),

/***/ "./src/code/index.ts":
/*!***************************!*
  !*** ./src/code/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeObj = exports.CodeMap = exports.CodeArr = exports.CodeSet = exports.CodeDict = exports.CodeList = exports.CodeContainer = exports.CodeVar = exports.CodeBracketCurly = exports.CodeBracketSquare = exports.CodeBracketRound = exports.CodeBracket = exports.CodeClosure = exports.Code = void 0;
var Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
Object.defineProperty(exports, "Code", ({ enumerable: true, get: function () { return Code_1.default; } }));
var CodeClosure_1 = __webpack_require__(/*! ./CodeClosure */ "./src/code/CodeClosure.ts");
Object.defineProperty(exports, "CodeClosure", ({ enumerable: true, get: function () { return CodeClosure_1.default; } }));
var CodeBracket_1 = __webpack_require__(/*! ./CodeBracket */ "./src/code/CodeBracket.ts");
Object.defineProperty(exports, "CodeBracket", ({ enumerable: true, get: function () { return CodeBracket_1.default; } }));
Object.defineProperty(exports, "CodeBracketRound", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketRound; } }));
Object.defineProperty(exports, "CodeBracketSquare", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketSquare; } }));
Object.defineProperty(exports, "CodeBracketCurly", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketCurly; } }));
var CodeVar_1 = __webpack_require__(/*! ./CodeVar */ "./src/code/CodeVar.ts");
Object.defineProperty(exports, "CodeVar", ({ enumerable: true, get: function () { return CodeVar_1.default; } }));
var CodeContainer_1 = __webpack_require__(/*! ./CodeContainer */ "./src/code/CodeContainer.ts");
Object.defineProperty(exports, "CodeContainer", ({ enumerable: true, get: function () { return CodeContainer_1.default; } }));
Object.defineProperty(exports, "CodeList", ({ enumerable: true, get: function () { return CodeContainer_1.CodeList; } }));
Object.defineProperty(exports, "CodeDict", ({ enumerable: true, get: function () { return CodeContainer_1.CodeDict; } }));
Object.defineProperty(exports, "CodeSet", ({ enumerable: true, get: function () { return CodeContainer_1.CodeSet; } }));
Object.defineProperty(exports, "CodeArr", ({ enumerable: true, get: function () { return CodeContainer_1.CodeArr; } }));
Object.defineProperty(exports, "CodeMap", ({ enumerable: true, get: function () { return CodeContainer_1.CodeMap; } }));
Object.defineProperty(exports, "CodeObj", ({ enumerable: true, get: function () { return CodeContainer_1.CodeObj; } }));


/***/ }),

/***/ "./src/container/Container.ts":
/*!************************************!*
  !*** ./src/container/Container.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const mixin_1 = __webpack_require__(/*! ../mixin */ "./src/mixin/index.ts");
let Container = class Container {
    constructor(container) {
        this.container = container;
    }
    [base_1.sym.obj]() {
        return this.obj;
    }
    [base_1.sym.str](...args) {
        return this.str(...args);
    }
    [base_1.sym.bool]() {
        return this.bool;
    }
    [base_1.sym.size]() {
        return this.size;
    }
    [base_1.sym.has](item) {
        return this.has(item);
    }
    [base_1.sym.iter]() {
        return this.iter;
    }
    [base_1.sym.vki]() {
        return this.vki;
    }
    toString() {
        return this.str();
    }
    [Symbol.iterator]() {
        return this.iter;
    }
    get obj() {
        return base_1.to.obj(this.container);
    }
    str(...args) {
        return base_1.to.str(this.container, ...args);
    }
    get bool() {
        return this.size > 0;
    }
    get size() {
        return base_1.to.size(this.container);
    }
    has(item) {
        return base_1.to.has(this.container, item);
    }
    get iter() {
        return base_1.to.iter(this.container);
    }
    get vki() {
        return base_1.to.vki(this.container);
    }
    relocate(key) {
        return [this, key];
    }
    reg(val) {
        return val;
    }
    _get(key) {
        return base_1.err.notImplemented();
    }
    _set(key, val) {
        base_1.err.notImplemented();
    }
    _del(key) {
        base_1.err.notImplemented();
    }
    get(key) {
        const [c, k] = this.relocate(key);
        if (c !== this)
            return c.get(k);
        return c._get(k);
    }
    set(key, val) {
        const [c, k] = this.relocate(key);
        const v = this.reg(val);
        if (c !== this)
            c.set(k, v);
        else
            c._set(k, v);
        return this;
    }
    del(key) {
        const [c, k] = this.relocate(key);
        if (c !== this)
            c.del(k);
        else
            c._del(k);
        return this;
    }
    take(key) {
        const [c, k] = this.relocate(key);
        if (c !== this)
            return c.take(k);
        const r = c._get(k);
        c._del(k);
        return r;
    }
    replace(key, val) {
        const [c, k] = this.relocate(key);
        const v = this.reg(val);
        if (c !== this)
            return c.replace(k, v);
        const r = c._get(k);
        c._set(k, v);
        return r;
    }
    enforce(key, val) {
        const [c, k] = this.relocate(key);
        const v = this.reg(val);
        if (c !== this)
            return c.enforce(k, v);
        c._set(k, v);
        return v;
    }
    _default_ensure(mode, key, val) {
        const [c, k] = this.relocate(key);
        let v = () => this.reg(!base_1.is.func(val) ? val : val());
        if (c !== this)
            return c._default_ensure(mode, k, v);
        const r = c._get(k);
        if (!base_1.is.un(r))
            return r;
        v = v();
        if (mode)
            c._set(k, v);
        return v;
    }
    default(key, val) {
        return this._default_ensure(false, key, val);
    }
    ensure(key, val) {
        return this._default_ensure(true, key, val);
    }
    _splice(key, num, ...vals) {
        return base_1.err.notImplemented();
    }
    splice(key, num, ...vals) {
        const [c, k] = this.relocate(key);
        const vs = vals.map(i => this.reg(i));
        if (c !== this)
            return c.splice(k, num, ...vs);
        return c._splice(k, num, ...vs);
    }
    _merge(args) {
        base_1.err.notImplemented();
    }
    merge(args) {
        args = base_1.to.obj(args);
        this._merge(args);
        return this;
    }
    $(...args) {
        return base_1.err.notImplemented();
    }
};
Container = __decorate([
    mixin_1.mount('$')
], Container);
exports.default = Container;


/***/ }),

/***/ "./src/container/Dict.ts":
/*!*******************************!*
  !*** ./src/container/Dict.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Container_1 = __webpack_require__(/*! ./Container */ "./src/container/Container.ts");
class Dict extends Container_1.default {
    constructor(container) {
        super(base_1.to.map(container));
    }
    _get(key) {
        return this.container.get(key);
    }
    _set(key, val) {
        this.container.set(key, val);
    }
    _del(key) {
        this.container.delete(key);
    }
    _merge(args) {
        for (const k in args)
            this._set(k, args[k]);
    }
}
exports.default = Dict;


/***/ }),

/***/ "./src/container/List.ts":
/*!*******************************!*
  !*** ./src/container/List.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Container_1 = __webpack_require__(/*! ./Container */ "./src/container/Container.ts");
class List extends Container_1.default {
    constructor(container) {
        super(base_1.to.arr(container));
    }
    relocate(key) {
        if (base_1.is.un(key))
            key = this.size;
        else if (key > this.size)
            key = this.size;
        else if (key < 0) {
            key = this.size + key;
            if (key < 0)
                key = 0;
        }
        return [this, key];
    }
    _get(key) {
        return this.container[key];
    }
    _set(key, val) {
        this.container[key] = val;
    }
    _del(key) {
        delete this.container[key];
    }
    _splice(key, num, ...vals) {
        return this.container.splice(key, num, ...vals);
    }
    _merge(args) {
        if (base_1.is.arr(args))
            this._splice(this.size, 0, ...args);
        else
            for (const k in args) {
                if (k === '')
                    this._splice(this.size, 0, ...args[k]);
                else
                    this.set(Number(k), args[k]);
            }
    }
}
exports.default = List;


/***/ }),

/***/ "./src/container/Mass.ts":
/*!*******************************!*
  !*** ./src/container/Mass.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Container_1 = __webpack_require__(/*! ./Container */ "./src/container/Container.ts");
const List_1 = __webpack_require__(/*! ./List */ "./src/container/List.ts");
const Dict_1 = __webpack_require__(/*! ./Dict */ "./src/container/Dict.ts");
class Mass extends Container_1.default {
    constructor(container) {
        super(container);
    }
    static new(container) {
        if (base_1.is.un(container))
            return new MassConstructor();
        if (container instanceof Mass)
            return container;
        if (container instanceof List_1.default || container instanceof Dict_1.default)
            return new MassConstructor(container);
        if (base_1.is.map(container))
            return new MassConstructor(new Dict_1.default(container));
        if (base_1.is.iter(container))
            return new MassConstructor(new List_1.default(container));
        if (base_1.is.obj(container))
            return new MassConstructor(new Dict_1.default(container));
        return container;
    }
    relocate(key) {
        if (base_1.is.str(key))
            key = base_1.split(key);
        if (!base_1.is.arr(key))
            key = base_1.to.arr(key);
        if (!base_1.to.bool(key))
            return [this, null];
        let curr = this;
        let i = 0;
        for (; i < key.length - 1; i++) {
            let k = key[i];
            k = curr.init(k);
            let next = curr._get(k);
            if (base_1.is.un(next)) {
                next = Mass.new();
                curr._set(k, next);
            }
            curr = next;
        }
        let k = key[i];
        k = curr.init(k);
        return [curr, k];
    }
    reg(val) {
        return Mass.new(val);
    }
    init(key) {
        if (base_1.is.un(this.container)) {
            if (base_1.is.un(key) || base_1.is.num(key) || base_1.is.str(key) && !base_1.is.nan(Number(key)))
                this.container = new List_1.default();
            else
                this.container = new Dict_1.default();
        }
        if (this.container instanceof List_1.default && base_1.is.str(key)) {
            if (key === '')
                key = null;
            else
                key = Number(key);
        }
        return key;
    }
    _get(key) {
        return this.container.get(key);
    }
    _set(key, val) {
        this.container.set(key, val);
    }
    _del(key) {
        this.container.del(key);
    }
    _splice(key, num, ...vals) {
        return this.container.splice(key, num, ...vals);
    }
    _merge(args) {
        if (base_1.is.arr(args)) {
            const t = [];
            for (const v of args) {
                if (base_1.is.obj(v)) {
                    const m = Mass.new();
                    m._merge(v);
                    t.push(m);
                }
                else
                    t.push(v);
            }
            this.init(null);
            this.splice(null, 0, ...t);
        }
        else
            for (const key in args) {
                const [c, k] = this.relocate(key);
                const v = args[key];
                if (base_1.is.un(k) && c.container instanceof List_1.default)
                    c._merge(v);
                else if (base_1.is.obj(v)) {
                    const t = c._get(k);
                    if (t instanceof Mass)
                        t._merge(v);
                    else {
                        const m = Mass.new();
                        m._merge(v);
                        c._set(k, m);
                    }
                }
                else
                    c._set(k, Mass.new(v));
            }
    }
}
exports.default = Mass;
class MassConstructor extends Mass {
    constructor(container) {
        super(container);
        if (this.container instanceof List_1.default)
            for (const i in this.container.container)
                this.container.container[i] = Mass.new(this.container.container[i]);
        else if (this.container instanceof Dict_1.default)
            for (const [k, v] of this.container.container)
                this.container.container.set(k, Mass.new(v));
    }
}


/***/ }),

/***/ "./src/container/index.ts":
/*!********************************!*
  !*** ./src/container/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mass = exports.Dict = exports.List = exports.Container = void 0;
var Container_1 = __webpack_require__(/*! ./Container */ "./src/container/Container.ts");
Object.defineProperty(exports, "Container", ({ enumerable: true, get: function () { return Container_1.default; } }));
var List_1 = __webpack_require__(/*! ./List */ "./src/container/List.ts");
Object.defineProperty(exports, "List", ({ enumerable: true, get: function () { return List_1.default; } }));
var Dict_1 = __webpack_require__(/*! ./Dict */ "./src/container/Dict.ts");
Object.defineProperty(exports, "Dict", ({ enumerable: true, get: function () { return Dict_1.default; } }));
var Mass_1 = __webpack_require__(/*! ./Mass */ "./src/container/Mass.ts");
Object.defineProperty(exports, "Mass", ({ enumerable: true, get: function () { return Mass_1.default; } }));


/***/ }),

/***/ "./src/evaluate.ts":
/*!*************************!*
  !*** ./src/evaluate.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ./base */ "./src/base/index.ts");
const container_1 = __webpack_require__(/*! ./container */ "./src/container/index.ts");
const mixin_1 = __webpack_require__(/*! ./mixin */ "./src/mixin/index.ts");
const code_1 = __webpack_require__(/*! ./code */ "./src/code/index.ts");
const Decor_1 = __webpack_require__(/*! ./Decor */ "./src/Decor.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
const is = base_1.is;
const to = base_1.to;
const sym = base_1.sym;
const map = base_1.map;
const join = base_1.join;
const split = base_1.split;
const has = base_1.has;
const funcHas = base_1.funcHas;
const objHas = base_1.objHas;
const init = base_1.init;
const sugar = base_1.sugar;
const err = base_1.err;
const asrt = base_1.asrt;
const Container = container_1.Container;
const List = container_1.List;
const Dict = container_1.Dict;
const Mass = container_1.Mass;
const mount = mixin_1.mount;
const Code = code_1.Code;
const CodeClosure = code_1.CodeClosure;
const CodeBracket = code_1.CodeBracket;
const CodeBracketRound = code_1.CodeBracketRound;
const CodeBracketSquare = code_1.CodeBracketSquare;
const CodeBracketCurly = code_1.CodeBracketCurly;
const CodeVar = code_1.CodeVar;
const CodeContainer = code_1.CodeContainer;
const CodeList = code_1.CodeList;
const CodeDict = code_1.CodeDict;
const CodeSet = code_1.CodeSet;
const CodeArr = code_1.CodeArr;
const CodeMap = code_1.CodeMap;
const CodeObj = code_1.CodeObj;
const Decor = Decor_1.default;
const print = util_1.print;
const printObj = util_1.printObj;
const printLine = util_1.printLine;
function default_1(code, context, contextName) {
    code = Code.new(code).code;
    if (is.un(context))
        return eval(code);
    if (is.un(contextName))
        contextName = 'C';
    return eval(Code.new({
        template: `(@ => @)`,
        codes: [contextName, code]
    }).code)(context);
}
exports.default = default_1;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evaluate = exports.util = exports.code = exports.container = exports.mixin = exports.Decor = exports.base = void 0;
exports.base = __webpack_require__(/*! ./base */ "./src/base/index.ts");
var Decor_1 = __webpack_require__(/*! ./Decor */ "./src/Decor.ts");
Object.defineProperty(exports, "Decor", ({ enumerable: true, get: function () { return Decor_1.default; } }));
exports.mixin = __webpack_require__(/*! ./mixin */ "./src/mixin/index.ts");
exports.container = __webpack_require__(/*! ./container */ "./src/container/index.ts");
exports.code = __webpack_require__(/*! ./code */ "./src/code/index.ts");
exports.util = __webpack_require__(/*! ./util */ "./src/util.ts");
var evaluate_1 = __webpack_require__(/*! ./evaluate */ "./src/evaluate.ts");
Object.defineProperty(exports, "evaluate", ({ enumerable: true, get: function () { return evaluate_1.default; } }));


/***/ }),

/***/ "./src/mixin/index.ts":
/*!****************************!*
  !*** ./src/mixin/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mount = void 0;
var mount_1 = __webpack_require__(/*! ./mount */ "./src/mixin/mount.ts");
Object.defineProperty(exports, "mount", ({ enumerable: true, get: function () { return mount_1.default; } }));


/***/ }),

/***/ "./src/mixin/mount.ts":
/*!****************************!*
  !*** ./src/mixin/mount.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Decor_1 = __webpack_require__(/*! ../Decor */ "./src/Decor.ts");
function default_1(attr) {
    return function (cls) {
        cls.prototype[attr] = function (...args) {
            return Decor_1.default.new(...args).decor(this);
        };
        return cls;
    };
}
exports.default = default_1;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTestData = exports.line = exports.printLine = exports.printObj = exports.print = void 0;
const base_1 = __webpack_require__(/*! ./base */ "./src/base/index.ts");
function print(...args) {
    console.log(...args);
}
exports.print = print;
function printObj(...args) {
    print(...args.map(i => base_1.to.str(i)));
}
exports.printObj = printObj;
function printLine(...args) {
    print(line(...args));
}
exports.printLine = printLine;
function line(str, num) {
    if (base_1.is.un(str))
        str = '-';
    if (base_1.is.un(num))
        num = 64;
    return str.repeat(num);
}
exports.line = line;
function getTestData() {
    return new Map([
        ['undefined', undefined],
        ['null', null],
        ['false', false],
        ['true', true],
        ['0', 0],
        ['123', 123],
        ['0.0', 0.0],
        ['3.14', 3.14],
        ["''", ''],
        ["'Hello'", 'Hello'],
        [Symbol(), Symbol()],
        ['func', function () { }],
        ['lambda', () => { }],
        ['{}', {}],
        ['{...}', { a: 123, b: 'hahaha' }],
        ['[]', []],
        ['[...]', [11, 22, 22, 33]],
        ['Set()', new Set()],
        ['Set(...)', new Set([11, 22, 22, 33])],
        ['Map()', new Map()],
        ['Map(...)', new Map([['a', 123], ['b', 'hahaha']])],
    ]);
}
exports.getTestData = getTestData;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});