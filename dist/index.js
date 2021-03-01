/*!
 * @yogurtcat/lib.js v1.1.0
 * (c) 2020- YogurtCat
 * git: https://github.com/YogurtCat2020/lib
 * Released under the MIT License.
 */
module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Decor.ts":
/*!**********************!*\
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
    $(x) {
        return base_1.err.notImplemented();
    }
    static decor(name) {
        return (cls) => {
            const func = function (...args) {
                return Decor.new(...args).$(this);
            };
            const meth = base_1.decor.cls.newMeth(func);
            base_1.decor.cls.setMeth(cls, name, meth);
            return cls;
        };
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
    $(x) {
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
    $(x) {
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
    $(x) {
        for (const decor of this.decors)
            x = decor.$(x);
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
    $(x) {
        x = this.before.$(x);
        if (!base_1.is.un(this.decors))
            x = this.decors.$(x);
        x = this.after.$(x);
        return x;
    }
    up(...args) {
        if (base_1.is.un(this.decors))
            this.decors = Decor.new(...args);
    }
}
const decorNull = new DecorNull();


/***/ }),

/***/ "./src/Unique.ts":
/*!***********************!*\
  !*** ./src/Unique.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ./base */ "./src/base/index.ts");
class Unique {
    constructor(subKey) {
        this.key2subKeys = {};
        this.subKey = subKey;
    }
    put(key) {
        if (base_1.is.un(this.key2subKeys[key]))
            this.key2subKeys[key] = new Set();
        const subKeys = this.key2subKeys[key];
        let subKey;
        while (true) {
            subKey = this.subKey();
            if (!subKeys.has(subKey)) {
                subKeys.add(subKey);
                break;
            }
        }
        return subKey;
    }
    pick(key, subKey) {
        base_1.assert(!base_1.is.un(this.key2subKeys[key]), `key=${key} 不存在！`);
        this.key2subKeys[key].delete(subKey);
    }
}
exports.default = Unique;


/***/ }),

/***/ "./src/base/arr.ts":
/*!*************************!*\
  !*** ./src/base/arr.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
exports.default = new (class {
    constructor() {
        this.last = (arr, item) => {
            if (is_1.default.un(item))
                return arr[arr.length - 1];
            arr[arr.length - 1] = item;
            return null;
        };
        this.appends = (arr, items) => {
            arr.splice(arr.length, 0, ...items);
        };
    }
})();


/***/ }),

/***/ "./src/base/decor.ts":
/*!***************************!*\
  !*** ./src/base/decor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decorClsApplyClass = exports.decorClsApplyMeth = exports.decorClsApplyParam = exports.decorClsSetMeth = exports.decorClsNewMeth = exports.decorClsHasMeth = void 0;
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
exports.default = new (class {
    constructor() {
        this.$ = (x, ...funcs) => {
            for (let func of funcs) {
                if (is_1.default.un(func))
                    continue;
                let t = func(x);
                if (!is_1.default.un(t))
                    x = t;
            }
            return x;
        };
        this.obj = new (class {
            constructor() {
                this.add = (attr, val) => x => {
                    if (is_1.default.un(x[attr])) {
                        if (is_1.default.func(val))
                            val = val();
                        x[attr] = val;
                    }
                };
                this.get = (attr) => x => x[attr];
                this.set = (attr, val) => x => {
                    x[attr] = val;
                };
            }
        })();
        this.cls = new (class {
            constructor() {
                this.hasMeth = (cls, name) => decorClsHasMeth(cls, name);
                this.newMeth = (func, args) => decorClsNewMeth(func, args);
                this.setMeth = (cls, name, meth) => decorClsSetMeth(cls, name, meth);
                this.applyParam = (decor, cls, name, indx) => decorClsApplyParam(decor, cls, name, indx);
                this.applyMeth = (decor, cls, name, meth) => decorClsApplyMeth(decor, cls, name, meth);
                this.applyClass = (decor, cls) => decorClsApplyClass(decor, cls);
            }
        })();
    }
})();
function decorClsHasMeth(cls, name) {
    return cls.prototype.hasOwnProperty(name);
}
exports.decorClsHasMeth = decorClsHasMeth;
function decorClsNewMeth(func, args) {
    let { writable, enumerable, configurable } = args || {};
    writable = writable || true;
    enumerable = enumerable || false;
    configurable = configurable || true;
    return {
        value: func,
        writable,
        enumerable,
        configurable
    };
}
exports.decorClsNewMeth = decorClsNewMeth;
function decorClsSetMeth(cls, name, meth) {
    Object.defineProperty(cls.prototype, name, meth);
}
exports.decorClsSetMeth = decorClsSetMeth;
function decorClsApplyParam(decor, cls, name, indx) {
    decor(cls.prototype, name, indx);
}
exports.decorClsApplyParam = decorClsApplyParam;
function decorClsApplyMeth(decor, cls, name, meth) {
    return decor(cls.prototype, name, meth) || meth;
}
exports.decorClsApplyMeth = decorClsApplyMeth;
function decorClsApplyClass(decor, cls) {
    return decor(cls) || cls;
}
exports.decorClsApplyClass = decorClsApplyClass;


/***/ }),

/***/ "./src/base/err.ts":
/*!*************************!*\
  !*** ./src/base/err.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = new (class {
    constructor() {
        this.$ = (msg) => { throw `<err> ${msg} </err>`; };
        this.notImplemented = () => this.$('not implemented');
        this.assertionFail = () => this.$('assertion fail');
    }
})();


/***/ }),

/***/ "./src/base/index.ts":
/*!***************************!*\
  !*** ./src/base/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assert = exports.promisify = exports.sugar = exports.line = exports.split = exports.join = exports.map = exports.objHas = exports.funcHas = exports.has = exports.err = exports.print = exports.decorClsApplyClass = exports.decorClsApplyMeth = exports.decorClsApplyParam = exports.decorClsSetMeth = exports.decorClsNewMeth = exports.decorClsHasMeth = exports.decor = exports.arr = exports.str = exports.init = exports.sym = exports.to = exports.is = void 0;
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
exports.is = is_1.default;
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
exports.to = to_1.default;
const sym_1 = __webpack_require__(/*! ./sym */ "./src/base/sym.ts");
exports.sym = sym_1.default;
const init_1 = __webpack_require__(/*! ./init */ "./src/base/init.ts");
exports.init = init_1.default;
const str_1 = __webpack_require__(/*! ./str */ "./src/base/str.ts");
exports.str = str_1.default;
const arr_1 = __webpack_require__(/*! ./arr */ "./src/base/arr.ts");
exports.arr = arr_1.default;
const decor_1 = __webpack_require__(/*! ./decor */ "./src/base/decor.ts");
exports.decor = decor_1.default;
Object.defineProperty(exports, "decorClsHasMeth", ({ enumerable: true, get: function () { return decor_1.decorClsHasMeth; } }));
Object.defineProperty(exports, "decorClsNewMeth", ({ enumerable: true, get: function () { return decor_1.decorClsNewMeth; } }));
Object.defineProperty(exports, "decorClsSetMeth", ({ enumerable: true, get: function () { return decor_1.decorClsSetMeth; } }));
Object.defineProperty(exports, "decorClsApplyParam", ({ enumerable: true, get: function () { return decor_1.decorClsApplyParam; } }));
Object.defineProperty(exports, "decorClsApplyMeth", ({ enumerable: true, get: function () { return decor_1.decorClsApplyMeth; } }));
Object.defineProperty(exports, "decorClsApplyClass", ({ enumerable: true, get: function () { return decor_1.decorClsApplyClass; } }));
const print_1 = __webpack_require__(/*! ./print */ "./src/base/print.ts");
exports.print = print_1.default;
const err_1 = __webpack_require__(/*! ./err */ "./src/base/err.ts");
exports.err = err_1.default;
const util_1 = __webpack_require__(/*! ./util */ "./src/base/util.ts");
Object.defineProperty(exports, "has", ({ enumerable: true, get: function () { return util_1.has; } }));
Object.defineProperty(exports, "funcHas", ({ enumerable: true, get: function () { return util_1.funcHas; } }));
Object.defineProperty(exports, "objHas", ({ enumerable: true, get: function () { return util_1.objHas; } }));
Object.defineProperty(exports, "map", ({ enumerable: true, get: function () { return util_1.map; } }));
Object.defineProperty(exports, "join", ({ enumerable: true, get: function () { return util_1.join; } }));
Object.defineProperty(exports, "split", ({ enumerable: true, get: function () { return util_1.split; } }));
Object.defineProperty(exports, "line", ({ enumerable: true, get: function () { return util_1.line; } }));
Object.defineProperty(exports, "sugar", ({ enumerable: true, get: function () { return util_1.sugar; } }));
Object.defineProperty(exports, "promisify", ({ enumerable: true, get: function () { return util_1.promisify; } }));
Object.defineProperty(exports, "assert", ({ enumerable: true, get: function () { return util_1.assert; } }));


/***/ }),

/***/ "./src/base/init.ts":
/*!**************************!*\
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
/*!************************!*\
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

/***/ "./src/base/print.ts":
/*!***************************!*\
  !*** ./src/base/print.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/base/util.ts");
exports.default = new (class {
    constructor() {
        this.$ = (...args) => {
            console.log(...args);
        };
        this.obj = (...args) => {
            this.$(...args.map(i => to_1.default.str(i)));
        };
        this.line = (...args) => {
            this.$(util_1.line(...args));
        };
    }
})();


/***/ }),

/***/ "./src/base/str.ts":
/*!*************************!*\
  !*** ./src/base/str.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
exports.default = new (class {
    constructor() {
        this.join = (strs, sep) => {
            if (is_1.default.un(sep))
                sep = '';
            return strs.join(sep);
        };
        this.reverse = (str) => str.split('').reverse().join('');
        this.tightSpaces = (str) => str.replace(/ +/g, ' ');
        this.trimLeft = (str) => str.replace(/^[ \n]+/, '');
        this.trimRight = (str) => str.replace(/[ \n]+$/, '');
        this.trim = (str) => this.trimRight(this.trimLeft(str));
        this.split = (str) => str.split(/[ \n]+/);
        this.splitLines = (str) => str.split(/\n+/);
        this.splitLeft = (str) => {
            const i = str.indexOf(' ');
            if (i < 0)
                return [str, null];
            return [str.slice(0, i), str.slice(i + 1)];
        };
    }
})();


/***/ }),

/***/ "./src/base/sym.ts":
/*!*************************!*\
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
/*!************************!*\
  !*** ./src/base/to.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const sym_1 = __webpack_require__(/*! ./sym */ "./src/base/sym.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/base/util.ts");
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
            if (util_1.objHas(x, sym_1.default.obj))
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
            if (util_1.objHas(x, sym_1.default.str))
                return x[sym_1.default.str](...args);
            const strToKey = (x) => {
                const r = x.match(/^[$A-Za-z_][$0-9A-Za-z_]*$/);
                if (!is_1.default.un(r))
                    return x;
                return strToStr(x);
            };
            const strToStr = (x) => {
                let q;
                if (this.has(x, '\n')) {
                    q = '`';
                    x = x.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
                }
                else if (!this.has(x, "'"))
                    q = "'";
                else if (!this.has(x, '"'))
                    q = '"';
                else if (!this.has(x, '`'))
                    q = '`';
                else {
                    q = "'";
                    x = x.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                }
                return q + x + q;
            };
            const objToStr = (x, n) => {
                n += 1;
                const ind_in = ' '.repeat(2 * n);
                const ind_out = ' '.repeat(2 * (n - 1));
                if (is_1.default.arr(x))
                    return '[' + x
                        .map(i => '\n' + ind_in + toStr(i, n))
                        .join(',') + '\n' + ind_out + ']';
                return '{' + this.arr(x)
                    .map(([k, v]) => '\n' + ind_in + strToKey(k) + ': ' + toStr(v, n))
                    .join(',') + '\n' + ind_out + '}';
            };
            const toStr = (x, n) => {
                if (is_1.default.str(x))
                    return strToStr(x);
                if (is_1.default.obj(x))
                    return objToStr(x, n);
                return String(x);
            };
            let [n] = args;
            if (is_1.default.un(n))
                n = 0;
            return toStr(this.obj(x), n);
        };
        this.bool = (x) => {
            if (util_1.objHas(x, sym_1.default.bool))
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
            if (util_1.objHas(x, sym_1.default.size))
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
            if (util_1.objHas(x, sym_1.default.has))
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
            if (util_1.objHas(x, sym_1.default.iter))
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
            if (util_1.objHas(x, sym_1.default.vki))
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

/***/ "./src/base/util.ts":
/*!**************************!*\
  !*** ./src/base/util.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assert = exports.promisify = exports.sugar = exports.line = exports.split = exports.join = exports.map = exports.objHas = exports.funcHas = exports.has = void 0;
const is_1 = __webpack_require__(/*! ./is */ "./src/base/is.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/base/to.ts");
const err_1 = __webpack_require__(/*! ./err */ "./src/base/err.ts");
function has(x, attr) {
    return (is_1.default.func(x) || is_1.default.obj(x)) && attr in x;
}
exports.has = has;
function funcHas(x, attr) {
    return is_1.default.func(x) && attr in x;
}
exports.funcHas = funcHas;
function objHas(x, attr) {
    return is_1.default.obj(x) && attr in x;
}
exports.objHas = objHas;
function* map(x, func) {
    for (const [v, k, i] of to_1.default.vki(x))
        yield func(v, k, i);
}
exports.map = map;
function join(arr, sep) {
    if (is_1.default.un(sep))
        sep = '';
    return [...to_1.default.iter(arr)].join(sep);
}
exports.join = join;
function split(str) {
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
            if (to_1.default.has(' \n', c)) {
                r.push(str.slice(p, i));
                p = null;
            }
        }
        else if (!to_1.default.has(' \n', c))
            p = i;
    }
    if (!is_1.default.un(p))
        r.push(str.slice(p));
    return r;
}
exports.split = split;
function line(str, num) {
    if (is_1.default.un(str))
        str = '-';
    if (is_1.default.un(num))
        num = 64;
    return str.repeat(num);
}
exports.line = line;
function sugar(args, keys) {
    for (const k in keys) {
        const s = keys[k];
        if (is_1.default.un(args[k]))
            args[k] = args[s];
    }
    return args;
}
exports.sugar = sugar;
function promisify(func) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            func(...args, (err, ret) => {
                if (is_1.default.un(err))
                    resolve(ret);
                else
                    reject(err);
            });
        });
    };
}
exports.promisify = promisify;
function assert(cdt, msg) {
    if (!cdt) {
        if (is_1.default.un(msg))
            err_1.default.assertionFail();
        else
            err_1.default.$(msg);
    }
}
exports.assert = assert;


/***/ }),

/***/ "./src/code/Code.ts":
/*!**************************!*\
  !*** ./src/code/Code.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
                let { extension, X, ...rem } = base_1.sugar(arg, {
                    extension: 'X'
                });
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
    get $() {
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
        base_1.assert(base_1.to.bool(placeholder), 'placeholder不能为空字符串！');
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
/*!*********************************!*\
  !*** ./src/code/CodeBracket.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeBracketCurly = exports.CodeBracketSquare = exports.CodeBracketRound = void 0;
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeBracket extends Code_1.default {
    constructor(args, bracket) {
        const { template, T, codes, code, C, ...rem } = base_1.sugar(args, {
            template: 'T',
            code: 'C'
        });
        super(Code_1.default.new({
            template: bracket,
            codes: [code],
            ...rem
        }).$);
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
/*!*********************************!*\
  !*** ./src/code/CodeClosure.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeClosure extends Code_1.default {
    constructor(args) {
        const { template, T, codes, code, C, ...rem } = base_1.sugar(args, {
            template: 'T',
            code: 'C'
        });
        super(Code_1.default.new({
            template: template,
            codes: [code],
            ...rem
        }).$);
    }
}
exports.default = CodeClosure;
Code_1.default.extension.set('closure', x => new CodeClosure(x));
Code_1.default.extension.set('C', x => new CodeClosure(x));


/***/ }),

/***/ "./src/code/CodeContainer.ts":
/*!***********************************!*\
  !*** ./src/code/CodeContainer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeDict = exports.CodeList = exports.CodeMap = exports.CodeSet = exports.CodeArr = exports.CodeObj = void 0;
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
class CodeObj extends CodeContainer {
    constructor(args) {
        super(args, `{@}`, `@: @`, (v, k) => [k, v]);
    }
}
exports.CodeObj = CodeObj;
class CodeArr extends CodeContainer {
    constructor(args) {
        super(args, `[@]`, `@`, v => [v]);
    }
}
exports.CodeArr = CodeArr;
class CodeSet extends CodeContainer {
    constructor(args) {
        super(args, `new Set([@])`, `@`, v => [v]);
    }
}
exports.CodeSet = CodeSet;
class CodeMap extends CodeContainer {
    constructor(args) {
        super(args, `to.map({@})`, `@: @`, (v, k) => [k, v]);
    }
}
exports.CodeMap = CodeMap;
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
Code_1.default.extension.set('obj', x => new CodeObj(x));
Code_1.default.extension.set('O', x => new CodeObj(x));
Code_1.default.extension.set('arr', x => new CodeArr(x));
Code_1.default.extension.set('A', x => new CodeArr(x));
Code_1.default.extension.set('set', x => new CodeSet(x));
Code_1.default.extension.set('S', x => new CodeSet(x));
Code_1.default.extension.set('map', x => new CodeMap(x));
Code_1.default.extension.set('M', x => new CodeMap(x));
Code_1.default.extension.set('list', x => new CodeList(x));
Code_1.default.extension.set('L', x => new CodeList(x));
Code_1.default.extension.set('dict', x => new CodeDict(x));
Code_1.default.extension.set('D', x => new CodeDict(x));


/***/ }),

/***/ "./src/code/CodeVar.ts":
/*!*****************************!*\
  !*** ./src/code/CodeVar.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
class CodeVar extends Code_1.default {
    constructor(args, codeInit) {
        let { template, T, codes, closure, C, variable, V, name, N, init, I, opr, O, ...rem } = base_1.sugar(args, {
            template: 'T',
            closure: 'C',
            variable: 'V',
            name: 'N',
            init: 'I',
            opr: 'O'
        });
        if (base_1.is.un(closure))
            closure = `(()=>{@})()`;
        if (base_1.is.un(variable))
            variable = false;
        if (base_1.is.un(name))
            name = 'R';
        if (base_1.is.un(codeInit))
            codeInit = init => init;
        if (!base_1.to.bool(opr))
            super(Code_1.default.new({
                template: '@',
                codes: [codeInit(init)],
                ...rem
            }).$);
        else
            super(Code_1.default.new({
                template: closure,
                codes: [{
                        template: `@ @ = @\n@\nreturn @`,
                        codes: [
                            variable ? 'let' : 'const',
                            name,
                            codeInit(init),
                            opr,
                            name
                        ]
                    }],
                ...rem
            }).$);
    }
}
exports.default = CodeVar;
Code_1.default.extension.set('var', x => new CodeVar(x));
Code_1.default.extension.set('V', x => new CodeVar(x));


/***/ }),

/***/ "./src/code/index.ts":
/*!***************************!*\
  !*** ./src/code/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeDict = exports.CodeList = exports.CodeMap = exports.CodeSet = exports.CodeArr = exports.CodeObj = exports.CodeContainer = exports.CodeVar = exports.CodeBracketCurly = exports.CodeBracketSquare = exports.CodeBracketRound = exports.CodeBracket = exports.CodeClosure = exports.Code = void 0;
const Code_1 = __webpack_require__(/*! ./Code */ "./src/code/Code.ts");
exports.Code = Code_1.default;
const CodeClosure_1 = __webpack_require__(/*! ./CodeClosure */ "./src/code/CodeClosure.ts");
exports.CodeClosure = CodeClosure_1.default;
const CodeBracket_1 = __webpack_require__(/*! ./CodeBracket */ "./src/code/CodeBracket.ts");
exports.CodeBracket = CodeBracket_1.default;
Object.defineProperty(exports, "CodeBracketRound", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketRound; } }));
Object.defineProperty(exports, "CodeBracketSquare", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketSquare; } }));
Object.defineProperty(exports, "CodeBracketCurly", ({ enumerable: true, get: function () { return CodeBracket_1.CodeBracketCurly; } }));
const CodeVar_1 = __webpack_require__(/*! ./CodeVar */ "./src/code/CodeVar.ts");
exports.CodeVar = CodeVar_1.default;
const CodeContainer_1 = __webpack_require__(/*! ./CodeContainer */ "./src/code/CodeContainer.ts");
exports.CodeContainer = CodeContainer_1.default;
Object.defineProperty(exports, "CodeObj", ({ enumerable: true, get: function () { return CodeContainer_1.CodeObj; } }));
Object.defineProperty(exports, "CodeArr", ({ enumerable: true, get: function () { return CodeContainer_1.CodeArr; } }));
Object.defineProperty(exports, "CodeSet", ({ enumerable: true, get: function () { return CodeContainer_1.CodeSet; } }));
Object.defineProperty(exports, "CodeMap", ({ enumerable: true, get: function () { return CodeContainer_1.CodeMap; } }));
Object.defineProperty(exports, "CodeList", ({ enumerable: true, get: function () { return CodeContainer_1.CodeList; } }));
Object.defineProperty(exports, "CodeDict", ({ enumerable: true, get: function () { return CodeContainer_1.CodeDict; } }));


/***/ }),

/***/ "./src/container/Container.ts":
/*!************************************!*\
  !*** ./src/container/Container.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! ../base */ "./src/base/index.ts");
const Decor_1 = __webpack_require__(/*! ../Decor */ "./src/Decor.ts");
class Container {
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
    decor(...args) {
        return Decor_1.default.new(...args).$(this);
    }
}
exports.default = Container;


/***/ }),

/***/ "./src/container/Dict.ts":
/*!*******************************!*\
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
/*!*******************************!*\
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
/*!*******************************!*\
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
/*!********************************!*\
  !*** ./src/container/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mass = exports.Dict = exports.List = exports.Container = void 0;
const Container_1 = __webpack_require__(/*! ./Container */ "./src/container/Container.ts");
exports.Container = Container_1.default;
const List_1 = __webpack_require__(/*! ./List */ "./src/container/List.ts");
exports.List = List_1.default;
const Dict_1 = __webpack_require__(/*! ./Dict */ "./src/container/Dict.ts");
exports.Dict = Dict_1.default;
const Mass_1 = __webpack_require__(/*! ./Mass */ "./src/container/Mass.ts");
exports.Mass = Mass_1.default;


/***/ }),

/***/ "./src/evaluate.ts":
/*!*************************!*\
  !*** ./src/evaluate.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base = __webpack_require__(/*! ./base */ "./src/base/index.ts");
const container = __webpack_require__(/*! ./container */ "./src/container/index.ts");
const code = __webpack_require__(/*! ./code */ "./src/code/index.ts");
const Decor_1 = __webpack_require__(/*! ./Decor */ "./src/Decor.ts");
const Unique_1 = __webpack_require__(/*! ./Unique */ "./src/Unique.ts");
const is = base.is;
const to = base.to;
const sym = base.sym;
const init = base.init;
const str = base.str;
const arr = base.arr;
const decor = base.decor;
const decorClsHasMeth = base.decorClsHasMeth;
const decorClsNewMeth = base.decorClsNewMeth;
const decorClsSetMeth = base.decorClsSetMeth;
const decorClsApplyParam = base.decorClsApplyParam;
const decorClsApplyMeth = base.decorClsApplyMeth;
const decorClsApplyClass = base.decorClsApplyClass;
const print = base.print;
const err = base.err;
const has = base.has;
const funcHas = base.funcHas;
const objHas = base.objHas;
const map = base.map;
const join = base.join;
const split = base.split;
const line = base.line;
const sugar = base.sugar;
const promisify = base.promisify;
const assert = base.assert;
const Container = container.Container;
const List = container.List;
const Dict = container.Dict;
const Mass = container.Mass;
const Code = code.Code;
const CodeClosure = code.CodeClosure;
const CodeBracket = code.CodeBracket;
const CodeBracketRound = code.CodeBracketRound;
const CodeBracketSquare = code.CodeBracketSquare;
const CodeBracketCurly = code.CodeBracketCurly;
const CodeVar = code.CodeVar;
const CodeContainer = code.CodeContainer;
const CodeObj = code.CodeObj;
const CodeArr = code.CodeArr;
const CodeSet = code.CodeSet;
const CodeMap = code.CodeMap;
const CodeList = code.CodeList;
const CodeDict = code.CodeDict;
const Decor = Decor_1.default;
const Unique = Unique_1.default;
function default_1(code, context, contextName) {
    code = Code.new(code).$;
    if (is.un(context))
        return eval(code);
    if (is.un(contextName))
        contextName = 'C';
    return eval(Code.new({
        template: `(@ => @)`,
        codes: [contextName, code]
    }).$)(context);
}
exports.default = default_1;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evaluate = exports.Unique = exports.Decor = exports.CodeDict = exports.CodeList = exports.CodeMap = exports.CodeSet = exports.CodeArr = exports.CodeObj = exports.CodeContainer = exports.CodeVar = exports.CodeBracketCurly = exports.CodeBracketSquare = exports.CodeBracketRound = exports.CodeBracket = exports.CodeClosure = exports.Code = exports.Mass = exports.Dict = exports.List = exports.Container = exports.assert = exports.promisify = exports.sugar = exports.line = exports.split = exports.join = exports.map = exports.objHas = exports.funcHas = exports.has = exports.err = exports.print = exports.decorClsApplyClass = exports.decorClsApplyMeth = exports.decorClsApplyParam = exports.decorClsSetMeth = exports.decorClsNewMeth = exports.decorClsHasMeth = exports.decor = exports.arr = exports.str = exports.init = exports.sym = exports.to = exports.is = void 0;
const base_1 = __webpack_require__(/*! ./base */ "./src/base/index.ts");
Object.defineProperty(exports, "is", ({ enumerable: true, get: function () { return base_1.is; } }));
Object.defineProperty(exports, "to", ({ enumerable: true, get: function () { return base_1.to; } }));
Object.defineProperty(exports, "sym", ({ enumerable: true, get: function () { return base_1.sym; } }));
Object.defineProperty(exports, "init", ({ enumerable: true, get: function () { return base_1.init; } }));
Object.defineProperty(exports, "str", ({ enumerable: true, get: function () { return base_1.str; } }));
Object.defineProperty(exports, "arr", ({ enumerable: true, get: function () { return base_1.arr; } }));
Object.defineProperty(exports, "decor", ({ enumerable: true, get: function () { return base_1.decor; } }));
Object.defineProperty(exports, "decorClsHasMeth", ({ enumerable: true, get: function () { return base_1.decorClsHasMeth; } }));
Object.defineProperty(exports, "decorClsNewMeth", ({ enumerable: true, get: function () { return base_1.decorClsNewMeth; } }));
Object.defineProperty(exports, "decorClsSetMeth", ({ enumerable: true, get: function () { return base_1.decorClsSetMeth; } }));
Object.defineProperty(exports, "decorClsApplyParam", ({ enumerable: true, get: function () { return base_1.decorClsApplyParam; } }));
Object.defineProperty(exports, "decorClsApplyMeth", ({ enumerable: true, get: function () { return base_1.decorClsApplyMeth; } }));
Object.defineProperty(exports, "decorClsApplyClass", ({ enumerable: true, get: function () { return base_1.decorClsApplyClass; } }));
Object.defineProperty(exports, "print", ({ enumerable: true, get: function () { return base_1.print; } }));
Object.defineProperty(exports, "err", ({ enumerable: true, get: function () { return base_1.err; } }));
Object.defineProperty(exports, "has", ({ enumerable: true, get: function () { return base_1.has; } }));
Object.defineProperty(exports, "funcHas", ({ enumerable: true, get: function () { return base_1.funcHas; } }));
Object.defineProperty(exports, "objHas", ({ enumerable: true, get: function () { return base_1.objHas; } }));
Object.defineProperty(exports, "map", ({ enumerable: true, get: function () { return base_1.map; } }));
Object.defineProperty(exports, "join", ({ enumerable: true, get: function () { return base_1.join; } }));
Object.defineProperty(exports, "split", ({ enumerable: true, get: function () { return base_1.split; } }));
Object.defineProperty(exports, "line", ({ enumerable: true, get: function () { return base_1.line; } }));
Object.defineProperty(exports, "sugar", ({ enumerable: true, get: function () { return base_1.sugar; } }));
Object.defineProperty(exports, "promisify", ({ enumerable: true, get: function () { return base_1.promisify; } }));
Object.defineProperty(exports, "assert", ({ enumerable: true, get: function () { return base_1.assert; } }));
const container_1 = __webpack_require__(/*! ./container */ "./src/container/index.ts");
Object.defineProperty(exports, "Container", ({ enumerable: true, get: function () { return container_1.Container; } }));
Object.defineProperty(exports, "List", ({ enumerable: true, get: function () { return container_1.List; } }));
Object.defineProperty(exports, "Dict", ({ enumerable: true, get: function () { return container_1.Dict; } }));
Object.defineProperty(exports, "Mass", ({ enumerable: true, get: function () { return container_1.Mass; } }));
const code_1 = __webpack_require__(/*! ./code */ "./src/code/index.ts");
Object.defineProperty(exports, "Code", ({ enumerable: true, get: function () { return code_1.Code; } }));
Object.defineProperty(exports, "CodeClosure", ({ enumerable: true, get: function () { return code_1.CodeClosure; } }));
Object.defineProperty(exports, "CodeBracket", ({ enumerable: true, get: function () { return code_1.CodeBracket; } }));
Object.defineProperty(exports, "CodeBracketRound", ({ enumerable: true, get: function () { return code_1.CodeBracketRound; } }));
Object.defineProperty(exports, "CodeBracketSquare", ({ enumerable: true, get: function () { return code_1.CodeBracketSquare; } }));
Object.defineProperty(exports, "CodeBracketCurly", ({ enumerable: true, get: function () { return code_1.CodeBracketCurly; } }));
Object.defineProperty(exports, "CodeVar", ({ enumerable: true, get: function () { return code_1.CodeVar; } }));
Object.defineProperty(exports, "CodeContainer", ({ enumerable: true, get: function () { return code_1.CodeContainer; } }));
Object.defineProperty(exports, "CodeObj", ({ enumerable: true, get: function () { return code_1.CodeObj; } }));
Object.defineProperty(exports, "CodeArr", ({ enumerable: true, get: function () { return code_1.CodeArr; } }));
Object.defineProperty(exports, "CodeSet", ({ enumerable: true, get: function () { return code_1.CodeSet; } }));
Object.defineProperty(exports, "CodeMap", ({ enumerable: true, get: function () { return code_1.CodeMap; } }));
Object.defineProperty(exports, "CodeList", ({ enumerable: true, get: function () { return code_1.CodeList; } }));
Object.defineProperty(exports, "CodeDict", ({ enumerable: true, get: function () { return code_1.CodeDict; } }));
const Decor_1 = __webpack_require__(/*! ./Decor */ "./src/Decor.ts");
exports.Decor = Decor_1.default;
const Unique_1 = __webpack_require__(/*! ./Unique */ "./src/Unique.ts");
exports.Unique = Unique_1.default;
const evaluate_1 = __webpack_require__(/*! ./evaluate */ "./src/evaluate.ts");
exports.evaluate = evaluate_1.default;


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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