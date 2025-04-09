# 热门经典 JavaScript 面试题 Top 100

## 一、基础题目 (1-30)

### 1. JavaScript 中的基本数据类型有哪些？
**答案**：  
8 种：`undefined`、`null`、`boolean`、`number`、`bigint`、`string`、`symbol`、`object`（`object` 是引用类型，但常列入讨论）。

**解析**：  
基本数据类型存储在栈中，按值传递。`bigint`（ES2020）用于大整数，`symbol`（ES6）用于唯一标识。`typeof null` 返回 `"object"` 是历史遗留问题。常考类型检测和转换。

**示例代码**：
```javascript
console.log(typeof 42n); // "bigint"
console.log(typeof Symbol('id')); // "symbol"
```

---

### 2. `var`、`let` 和 `const` 的区别是什么？
**答案**：  
- `var`：函数作用域，变量提升，可重复声明。  
- `let`：块级作用域，无提升，可重新赋值。  
- `const`：块级作用域，必须初始化，不可重新赋值（对象属性可变）。

**解析**：  
`var` 易导致作用域混乱，`let` 和 `const` 是 ES6 改进，常考暂时性死区（TDZ）和闭包中的表现。

**示例代码**：
```javascript
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0); // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j), 0); // 0 1 2
```

---

### 3. 什么是闭包？闭包有什么用途？
**答案**：  
闭包是函数访问外部作用域变量的能力。  
**用途**：私有数据、状态维持、高阶函数。

**解析**：  
闭包基于词法作用域，常用于模块化和回调。面试常考循环陷阱和内存泄漏。

**示例代码**：
```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter()); // 1
```

---

### 4. `null` 和 `undefined` 的区别是什么？
**答案**：  
- `null`：主动设置的空值。  
- `undefined`：未定义或未赋值。

**解析**：  
`null` 表示“无对象”，`undefined` 表示“未初始化”。常考类型转换和默认值处理。

**示例代码**：
```javascript
console.log(null == undefined); // true
console.log(null === undefined); // false
```

---

### 5. JavaScript 中的 `this` 指向什么？
**答案**：  
- 全局：`window`/`global`。  
- 对象方法：调用对象。  
- 构造函数：实例。  
- 箭头函数：外层 `this`。  
- 显式绑定：`call`/`apply`/`bind`。

**解析**：  
`this` 是动态绑定的，箭头函数是词法绑定。常考复杂场景（如 `setTimeout`）。

**示例代码**：
```javascript
const obj = { name: 'Alice', say: function() { console.log(this.name); } };
obj.say(); // "Alice"
const fn = obj.say;
fn(); // undefined
```

---

### 6. 什么是事件冒泡和事件捕获？
**答案**：  
- 冒泡：由目标向外触发。  
- 捕获：由外向目标触发。

**解析**：  
默认冒泡，可通过 `addEventListener` 的第三个参数切换。常考事件委托。

**示例代码**：
```javascript
document.querySelector('#child').addEventListener('click', () => console.log('Child'), false);
document.querySelector('#parent').addEventListener('click', () => console.log('Parent'), true);
```

---

### 7. 如何实现深拷贝？
**答案**：  
- `JSON.parse(JSON.stringify(obj))`：简单但有限制。  
- 递归：全面但需处理循环引用。  
- 库：如 Lodash `_.cloneDeep`。

**解析**：  
深拷贝复制所有层级，JSON 方法不支持函数和循环引用。常考边界处理。

**示例代码**：
```javascript
function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) copy[key] = deepClone(obj[key]);
  }
  return copy;
}
```

---

### 8. `==` 和 `===` 的区别是什么？
**答案**：  
- `==`：类型转换后比较。  
- `===`：严格比较值和类型。

**解析**：  
`==` 的隐式转换规则复杂（如 `[] == 0`），`===` 更安全。常考转换细节。

**示例代码**：
```javascript
console.log('1' == 1); // true
console.log('1' === 1); // false
```

---

### 9. 什么是原型链？
**答案**：  
原型链是对象通过 `__proto__` 访问原型的链式结构，用于属性查找和继承。

**解析**：  
原型链是 JavaScript 继承的基础，终止于 `null`。常考原型修改和 `instanceof`。

**示例代码**：
```javascript
function Person() {}
Person.prototype.name = 'Alice';
const p = new Person();
console.log(p.name); // "Alice"
```

---

### 10. 如何判断一个变量是数组？
**答案**：  
- `Array.isArray(obj)`：推荐。  
- `obj instanceof Array`：不跨 iframe。  
- `Object.prototype.toString.call(obj)`：通用。

**解析**：  
`Array.isArray` 是最可靠的类型检测方法。常考边界场景。

**示例代码**：
```javascript
console.log(Array.isArray([1, 2])); // true
```

---

### 11. 什么是变量提升？
**答案**：  
变量提升是指 `var` 声明的变量和函数声明在代码执行前被提升到作用域顶部。

**解析**：  
提升只涉及声明，不包括赋值，导致 `undefined` 或意外行为。`let` 和 `const` 无提升。

**示例代码**：
```javascript
console.log(a); // undefined
var a = 1;
console.log(b); // ReferenceError
let b = 2;
```

---

### 12. JavaScript 中的作用域有哪些？
**答案**：  
- 全局作用域。  
- 函数作用域。  
- 块级作用域（ES6，`let` 和 `const`）。  
- 模块作用域（ES Module）。

**解析**：  
作用域决定变量的可见性，闭包和作用域链是延伸概念。常考作用域嵌套。

**示例代码**：
```javascript
if (true) {
  var x = 1;
  let y = 2;
}
console.log(x); // 1
console.log(y); // ReferenceError
```

---

### 13. 如何实现数组去重？
**答案**：  
- `Set`：`[...new Set(arr)]`。  
- `filter` 和 `indexOf`：检查首次出现。  
- 对象键值：利用键唯一性。

**解析**：  
`Set` 是最简洁的方法，但不处理对象引用。常考性能和复杂数据。

**示例代码**：
```javascript
const arr = [1, 2, 2, 3];
console.log([...new Set(arr)]); // [1, 2, 3]
```

---

### 14. 什么是 DOM 和 BOM？
**答案**：  
- **DOM**（Document Object Model）：文档对象模型，表示 HTML 结构。  
- **BOM**（Browser Object Model）：浏览器对象模型，提供浏览器操作（如 `window`、`location`）。

**解析**：  
DOM 是 W3C 标准，BOM 无统一标准。常考 DOM 操作和 `window` 属性。

**示例代码**：
```javascript
document.body.style.background = 'lightblue'; // DOM
console.log(window.location.href); // BOM
```

---

### 15. 如何阻止事件默认行为？
**答案**：  
- `event.preventDefault()`：阻止默认行为。  
- `return false`：在某些场景（如 `onclick`）有效。

**解析**：  
常用于表单提交或链接跳转。`stopPropagation` 只阻止冒泡，不影响默认行为。

**示例代码**：
```javascript
document.querySelector('a').addEventListener('click', e => {
  e.preventDefault();
  console.log('Link clicked, but not navigated');
});
```

---

### 16. `new` 操作符做了什么？
**答案**：  
1. 创建空对象。  
2. 设置原型（`__proto__` 指向构造函数的 `prototype`）。  
3. 执行构造函数，绑定 `this`。  
4. 返回对象（若无显式返回）。

**解析**：  
`new` 是实例化的核心，理解原型链和构造函数行为的关键。常考手写实现。

**示例代码**：
```javascript
function Person(name) {
  this.name = name;
}
const p = new Person('Alice');
console.log(p.name); // "Alice"
```

---

### 17. 什么是 JavaScript 的严格模式？
**答案**：  
严格模式（`"use strict"`）是 ES5 引入的运行模式，消除不安全行为，提升代码规范。

**解析**：  
如禁止未声明变量、限制 `this` 为 `undefined`。常考严格模式的特性。

**示例代码**：
```javascript
"use strict";
x = 1; // ReferenceError
function fn() { console.log(this); }
fn(); // undefined
```

---

### 18. 如何实现函数的重载？
**答案**：  
JavaScript 无原生重载，可通过参数数量或类型判断实现类似效果。

**解析**：  
通过 `arguments` 或条件分支模拟，常考灵活性。

**示例代码**：
```javascript
function greet(name, greeting) {
  if (arguments.length === 1) return `Hello, ${name}`;
  return `${greeting}, ${name}`;
}
console.log(greet('Alice')); // "Hello, Alice"
console.log(greet('Bob', 'Hi')); // "Hi, Bob"
```

---

### 19. `typeof` 和 `instanceof` 的区别？
**答案**：  
- `typeof`：返回变量类型（字符串）。  
- `instanceof`：判断对象是否为某构造函数的实例。

**解析**：  
`typeof` 用于基本类型检测，`instanceof` 用于原型链检查。常考局限性。

**示例代码**：
```javascript
console.log(typeof []); // "object"
console.log([] instanceof Array); // true
```

---

### 20. 如何实现数组的扁平化？
**答案**：  
- `flat(depth)`：ES6 方法。  
- 递归：遍历嵌套数组。  
- `reduce`：累积展开。

**解析**：  
扁平化处理嵌套数组，常考递归实现和性能。

**示例代码**：
```javascript
function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);
}
console.log(flatten([1, [2, [3]]])); // [1, 2, 3]
```

---

### 21. 什么是 JavaScript 的隐式类型转换？
**答案**：  
隐式类型转换是 JavaScript 在运算或比较时自动转换类型，如字符串转数字。

**解析**：  
常见于 `==`、加减运算。规则复杂（如 `[] + {}`），常考边界案例。

**示例代码**：
```javascript
console.log('1' + 2); // "12"
console.log('3' - 1); // 2
console.log([] == 0); // true
```

---

### 22. 如何实现一个简单的继承？
**答案**：  
- 原型链继承：子类原型指向父类实例。  
- 构造函数继承：`call` 调用父类。  
- 组合继承：结合两者。

**解析**：  
组合继承是常用方式，避免原型链和构造函数的缺点。常考 ES6 `class`。

**示例代码**：
```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.say = function() { console.log(this.name); };
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
const child = new Child('Alice', 20);
child.say(); // "Alice"
```

---

### 23. `Array.prototype.slice` 和 `splice` 的区别？
**答案**：  
- `slice`：返回新数组，不修改原数组。  
- `splice`：修改原数组，返回删除元素。

**解析**：  
`slice` 用于复制，`splice` 用于增删。常考参数和返回值。

**示例代码**：
```javascript
const arr = [1, 2, 3];
console.log(arr.slice(1, 2)); // [2]
console.log(arr); // [1, 2, 3]
console.log(arr.splice(1, 1)); // [2]
console.log(arr); // [1, 3]
```

---

### 24. 什么是 JavaScript 的执行上下文？
**答案**：  
执行上下文是代码执行的环境，包括：  
- 变量对象（VO）。  
- 作用域链。  
- `this` 绑定。

**解析**：  
分为全局上下文和函数上下文，执行栈管理调用顺序。常考上下文创建过程。

**示例代码**：
```javascript
function fn() {
  console.log(this);
}
fn(); // window/global
```

---

### 25. 如何实现一个简单的防抖函数？
**答案**：  
防抖延迟执行函数，若重复触发则重置计时。

**解析**：  
防抖优化高频事件（如输入），依赖闭包和定时器。常考与节流的区别。

**示例代码**：
```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

---

### 26. 什么是 JavaScript 的高阶函数？
**答案**：  
高阶函数是接受函数作为参数或返回函数的函数。

**解析**：  
如 `map`、`filter`，体现函数式编程思想。常考自定义实现。

**示例代码**：
```javascript
const wrap = fn => (...args) => {
  console.log('Calling');
  return fn(...args);
};
const add = (a, b) => a + b;
const wrappedAdd = wrap(add);
console.log(wrappedAdd(1, 2)); // "Calling" -> 3
```

---

### 27. 如何实现函数柯里化？
**答案**：  
柯里化将多参数函数转为单参数函数序列。

**解析**：  
利用闭包收集参数，常考参数复用场景。

**示例代码**：
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...next) => curried(...args, ...next);
  };
}
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
```

---

### 28. `setTimeout` 和 `setInterval` 的区别？
**答案**：  
- `setTimeout`：延迟执行一次。  
- `setInterval`：循环执行。

**解析**：  
`setTimeout` 可嵌套实现循环，但 `setInterval` 可能因执行时间叠加失准。常考清除定时器。

**示例代码**：
```javascript
setTimeout(() => console.log('Once'), 1000);
const id = setInterval(() => console.log('Loop'), 1000);
clearInterval(id); // 停止
```

---

### 29. 如何实现一个简单的节流函数？
**答案**：  
节流限制函数在固定时间内的执行频率。

**解析**：  
节流适合滚动、resize 等高频事件，常考时间戳和定时器两种实现。

**示例代码**：
```javascript
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn(...args);
      last = now;
    }
  };
}
```

---

### 30. 什么是 JavaScript 的模块化？
**答案**：  
模块化将代码拆分为独立模块，通过导入导出复用。  
- CommonJS：`require`、`module.exports`。  
- ES Module：`import`、`export`。

**解析**：  
模块化解决全局污染问题，ES Module 支持 tree-shaking。常考加载机制。

**示例代码**：
```javascript
// ES Module
export const add = (a, b) => a + b;
import { add } from './math.js';
```

---

## 二、中级题目 (31-60)

### 31. 什么是事件循环（Event Loop）？
**答案**：  
事件循环协调调用栈、任务队列（宏任务）和微任务队列，处理异步任务。

**解析**：  
宏任务（如 `setTimeout`）和微任务（如 `Promise`）优先级不同，常考执行顺序。

**示例代码**：
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 -> 4 -> 3 -> 2
```

---

### 32. 如何实现一个简单的 Promise？
**答案**：  
实现状态管理、`then` 方法和异步处理。

**解析**：  
手写 `Promise` 考察异步和链式调用，核心是状态不可逆和回调队列。

**示例代码**：
```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = null;
    this.callbacks = [];
    const resolve = val => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = val;
      setTimeout(() => this.callbacks.forEach(cb => cb(val)));
    };
    executor(resolve);
  }
  then(onFulfilled) {
    return new MyPromise(resolve => {
      if (this.state === 'fulfilled') resolve(onFulfilled(this.value));
      else this.callbacks.push(val => resolve(onFulfilled(val)));
    });
  }
}
```

---

### 33. `async/await` 的工作原理是什么？
**答案**：  
`async` 返回 `Promise`，`await` 暂停执行直到 `Promise` 解析。

**解析**：  
基于 Generator 和 Promise，常考错误处理和执行顺序。

**示例代码**：
```javascript
async function fn() {
  const res = await new Promise(r => setTimeout(() => r('Done'), 1000));
  console.log(res);
}
fn(); // 1 秒后输出 "Done"
```

---

### 34. 如何实现一个简单的发布-订阅模式？
**答案**：  
通过事件中心管理订阅和发布。

**解析**：  
与观察者模式类似，常用于组件通信。常考实现细节。

**示例代码**：
```javascript
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, cb) { this.events[event] = this.events[event] || []; this.events[event].push(cb); }
  emit(event, ...args) { this.events[event]?.forEach(cb => cb(...args)); }
}
```

---

### 35. `call`、`apply` 和 `bind` 的区别？
**答案**：  
- `call`：立即调用，逐个传参。  
- `apply`：立即调用，数组传参。  
- `bind`：返回新函数。

**解析**：  
用于改变 `this`，常考手写实现和借用方法。

**示例代码**：
```javascript
function say(greet) { console.log(`${greet}, ${this.name}`); }
const obj = { name: 'Alice' };
say.call(obj, 'Hi'); // "Hi, Alice"
```

---

### 36. 如何处理跨域请求？
**答案**：  
- JSONP：动态脚本加载。  
- CORS：后端设置头。  
- 代理：前端通过服务器转发。

**解析**：  
跨域受同源策略限制，CORS 是主流方案。常考配置和安全性。

**示例代码**：
```javascript
// JSONP
function handleResponse(data) { console.log(data); }
const script = document.createElement('script');
script.src = 'http://example.com/data?callback=handleResponse';
document.body.appendChild(script);
```

---

### 37. 什么是 JavaScript 的函数式编程？
**答案**：  
函数式编程强调纯函数、无副作用和高阶函数。

**解析**：  
如 `map`、`reduce`，提高代码可预测性。常考纯函数实现。

**示例代码**：
```javascript
const add = a => b => a + b; // 柯里化
console.log(add(2)(3)); // 5
```

---

### 38. 如何实现一个简单的模板引擎？
**答案**：  
通过正则替换占位符，或使用 `Function` 构造函数动态生成函数。

**解析**：  
模板引擎解析字符串，常考性能和安全性（防 XSS）。

**示例代码**：
```javascript
function render(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key]);
}
const tmpl = 'Hello, {{name}}!';
console.log(render(tmpl, { name: 'Alice' })); // "Hello, Alice!"
```

---

### 39. `forEach` 和 `map` 的区别是什么？
**答案**：  
- `forEach`：无返回值，遍历执行。  
- `map`：返回新数组，映射转换。

**解析**：  
`map` 适合数据转换，`forEach` 适合副作用。常考返回值处理。

**示例代码**：
```javascript
[1, 2].forEach(x => console.log(x)); // 1 2
const doubled = [1, 2].map(x => x * 2); // [2, 4]
```

---

### 40. 什么是 JavaScript 的 WeakMap 和 WeakSet？
**答案**：  
- `WeakMap`：键为弱引用对象，垃圾回收不阻止。  
- `WeakSet`：元素为弱引用对象，不可迭代。

**解析**：  
用于避免内存泄漏，常考与 `Map`/`Set` 的区别。

**示例代码**：
```javascript
const wm = new WeakMap();
let obj = {};
wm.set(obj, 'data');
obj = null; // 可被回收
```

---

### 41. 如何实现一个简单的状态机？
**答案**：  
使用对象或类定义状态和转换规则。

**解析**：  
状态机管理有限状态，常用于游戏或流程控制。

**示例代码**：
```javascript
const fsm = {
  state: 'off',
  transitions: {
    off: { toggle: 'on' },
    on: { toggle: 'off' }
  },
  transition(action) {
    this.state = this.transitions[this.state][action];
  }
};
fsm.transition('toggle');
console.log(fsm.state); // "on"
```

---

### 42. 什么是 JavaScript 的尾调用优化？
**答案**：  
尾调用优化（TCO）在函数尾部调用时复用栈帧，避免栈溢出。

**解析**：  
ES6 支持，但浏览器实现有限。常考递归优化。

**示例代码**：
```javascript
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc); // 尾调用
}
```

---

### 43. 如何实现一个简单的路由器？
**答案**：  
监听 `hashchange` 或 History API，映射 URL 到处理函数。

**解析**：  
前端路由是 SPA 核心，常考 hash 和 history 模式。

**示例代码**：
```javascript
const routes = {
  '#/home': () => console.log('Home'),
  '#/about': () => console.log('About')
};
window.addEventListener('hashchange', () => routes[location.hash]());
```

---

### 44. `Object.defineProperty` 的作用是什么？
**答案**：  
定义对象的属性特性（如可写、可枚举）。

**解析**：  
是 Vue 双向绑定的基础，常考数据劫持。

**示例代码**：
```javascript
const obj = {};
Object.defineProperty(obj, 'key', {
  get: () => console.log('Get'),
  set: val => console.log('Set:', val)
});
obj.key = 1; // "Set: 1"
```

---

### 45. 什么是 JavaScript 的 Proxy？
**答案**：  
`Proxy` 拦截对象操作（如读写），比 `Object.defineProperty` 更强大。

**解析**：  
用于响应式系统（如 Vue 3），常考拦截实现。

**示例代码**：
```javascript
const obj = new Proxy({}, {
  get: (target, key) => `Got ${key}`,
  set: (target, key, val) => { target[key] = val; return true; }
});
console.log(obj.name); // "Got name"
```

---

### 46. 如何实现一个简单的依赖注入？
**答案**：  
通过容器存储依赖，手动注入到函数。

**解析**：  
提高代码解耦，常考 DI 设计模式。

**示例代码**：
```javascript
const container = new Map();
container.set('log', msg => console.log(msg));
function fn(logger = container.get('log')) {
  logger('Hello');
}
fn();
```

---

### 47. 什么是 JavaScript 的装饰器？
**答案**：  
装饰器是函数，用于修改类或方法的行为（ES 提案）。

**解析**：  
常用于框架（如 TypeScript），常考语法和实现。

**示例代码**：
```javascript
function log(target, name, descriptor) {
  const fn = descriptor.value;
  descriptor.value = (...args) => {
    console.log('Log:', name);
    return fn(...args);
  };
}
class MyClass {
  @log
  say() { console.log('Hello'); }
}
new MyClass().say(); // "Log: say" -> "Hello"
```

---

### 48. 如何实现一个简单的 LRU 缓存？
**答案**：  
使用 `Map` 维护键值对和访问顺序。

**解析**：  
LRU（最近最少使用）是缓存淘汰策略，常考数据结构。

**示例代码**：
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, val) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(key, val);
  }
}
```

---

### 49. `Promise.all` 和 `Promise.race` 的区别？
**答案**：  
- `Promise.all`：所有 Promise 成功时返回结果数组，任一失败则 reject。  
- `Promise.race`：返回最先完成的 Promise 结果。

**解析**：  
`all` 用于并行任务，`race` 用于超时控制。常考实现。

**示例代码**：
```javascript
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(res => console.log(res)); // [1, 2]
Promise.race([new Promise(r => setTimeout(() => r(1), 1000)), Promise.resolve(2)]).then(res => console.log(res)); // 2
```

---

### 50. 什么是 JavaScript 的 Generator 函数？
**答案**：  
Generator 是可暂停和恢复的函数，使用 `function*` 定义，返回迭代器。

**解析**：  
用于异步流程控制和迭代，常考与 `async` 的对比。

**示例代码**：
```javascript
function* gen() {
  yield 1;
  yield 2;
}
const it = gen();
console.log(it.next()); // { value: 1, done: false }
```

---

### 51. 如何实现一个简单的拖放功能？
**答案**：  
使用 `drag` 事件或 `mousedown/move/up` 监听。

**解析**：  
拖放涉及 DOM 事件和坐标计算，常考实现细节。

**示例代码**：
```javascript
const el = document.querySelector('#drag');
el.onmousedown = e => {
  const shiftX = e.clientX - el.offsetLeft;
  const shiftY = e.clientY - el.offsetTop;
  document.onmousemove = e => {
    el.style.left = e.clientX - shiftX + 'px';
    el.style.top = e.clientY - shiftY + 'px';
  };
  document.onmouseup = () => document.onmousemove = null;
};
```

---

### 52. 什么是 JavaScript 的微任务和宏任务？
**答案**：  
- 微任务：`Promise`、`MutationObserver`，优先执行。  
- 宏任务：`setTimeout`、`setInterval`，次优先级。

**解析**：  
事件循环中微任务清空后再执行宏任务，常考顺序。

**示例代码**：
```javascript
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));
// micro -> macro
```

---

### 53. 如何实现一个简单的单元测试框架？
**答案**：  
定义 `assert` 函数，运行测试用例并报告结果。

**解析**：  
测试框架验证代码正确性，常考设计思想。

**示例代码**：
```javascript
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function test(description, fn) {
  try {
    fn();
    console.log(`✓ ${description}`);
  } catch (e) {
    console.error(`✗ ${description}: ${e.message}`);
  }
}
test('add works', () => assert(1 + 1 === 2, 'Addition failed'));
```

---

### 54. 什么是 JavaScript 的垃圾回收机制？
**答案**：  
使用标记清除算法，标记可达对象，清除不可达对象。

**解析**：  
闭包和全局变量可能导致泄漏，常考优化。

**示例代码**：
```javascript
function leak() {
  const data = new Array(1000000);
  window.data = data; // 全局引用，阻止回收
}
```

---

### 55. 如何实现一个简单的 AJAX 请求？
**答案**：  
使用 `XMLHttpRequest` 或 `fetch`。

**解析**：  
AJAX 是异步通信基础，常考封装和错误处理。

**示例代码**：
```javascript
function ajax(url) {
  return fetch(url).then(res => res.json());
}
ajax('https://api.example.com').then(data => console.log(data));
```

---

### 56. 什么是 JavaScript 的虚拟 DOM？
**答案**：  
虚拟 DOM 是 JS 对象树，通过 Diff 更新真实 DOM。

**解析**：  
优化 DOM 操作性能，常考 Diff 算法。

**示例代码**：
```javascript
function h(tag, props, children) {
  return { tag, props, children };
}
function render(vnode) {
  const el = document.createElement(vnode.tag);
  vnode.children.forEach(child => el.appendChild(render(child)));
  return el;
}
```

---

### 57. 如何实现数组的乱序？
**答案**：  
使用 Fisher-Yates（洗牌算法）。

**解析**：  
随机交换元素，时间复杂度 O(n)。常考算法正确性。

**示例代码**：
```javascript
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
console.log(shuffle([1, 2, 3])); // 如 [3, 1, 2]
```

---

### 58. 什么是 JavaScript 的作用域链？
**答案**：  
作用域链是变量查找的路径，从当前作用域向上到全局。

**解析**：  
与闭包密切相关，常考变量解析顺序。

**示例代码**：
```javascript
const global = 'global';
function outer() {
  const outerVar = 'outer';
  function inner() {
    console.log(outerVar); // "outer"
    console.log(global); // "global"
  }
  inner();
}
outer();
```

---

### 59. 如何实现函数的 memoization？
**答案**：  
缓存函数结果，避免重复计算。

**解析**：  
优化递归或高计算量函数，常考缓存设计。

**示例代码**：
```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const fib = memoize(n => n <= 1 ? n : fib(n - 1) + fib(n - 2));
console.log(fib(10)); // 55
```

---

### 60. 如何实现一个简单的防抖和节流组合？
**答案**：  
结合防抖（延迟执行）和节流（频率控制）。

**解析**：  
实际应用中常需组合，常考实现细节。

**示例代码**：
```javascript
function debounceThrottle(fn, delay, throttleDelay) {
  let timer, last = 0;
  return function(...args) {
    const now = Date.now();
    clearTimeout(timer);
    if (now - last >= throttleDelay) {
      fn(...args);
      last = now;
    } else {
      timer = setTimeout(() => {
        fn(...args);
        last = Date.now();
      }, delay);
    }
  };
}
```

---

## 三、高级题目 (61-100)

### 61. 什么是 JavaScript 的单线程模型？
**答案**：  
单线程通过事件循环处理异步任务。

**解析**：  
避免多线程复杂性，常考异步机制。

**示例代码**：
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 1 -> 3 -> 2
```

---

### 62. 如何实现一个 Promise.all？
**答案**：  
等待所有 Promise 完成，返回结果数组。

**解析**：  
并行处理异步任务，常考错误处理。

**示例代码**：
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val;
        if (++count === promises.length) resolve(results);
      }).catch(reject);
    });
  });
}
```

---

### 63. 如何实现一个 Promise.race？
**答案**：  
返回最先完成的 Promise。

**解析**：  
常用于超时控制，常考实现。

**示例代码**：
```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => Promise.resolve(p).then(resolve).catch(reject));
  });
}
```

---

### 64. 什么是 JavaScript 的防抖和节流的区别？
**答案**：  
- 防抖：延迟执行，重置计时。  
- 节流：固定频率执行。

**解析**：  
防抖适合输入，节流适合滚动。常考应用。

**示例代码**：
```javascript
// 见 25 和 29 题
```

---

### 65. 如何实现一个简单的观察者模式？
**答案**：  
定义观察者和被观察者，通过订阅通知更新。

**解析**：  
与发布-订阅类似，常考实现差异。

**示例代码**：
```javascript
class Subject {
  constructor() { this.observers = []; }
  add(observer) { this.observers.push(observer); }
  notify(data) { this.observers.forEach(o => o.update(data)); }
}
class Observer {
  update(data) { console.log(data); }
}
const sub = new Subject();
sub.add(new Observer());
sub.notify('Hello');
```

---

### 66. 什么是 JavaScript 的 Proxy 和 Reflect？
**答案**：  
- `Proxy`：拦截对象操作。  
- `Reflect`：提供默认操作方法。

**解析**：  
Vue 3 使用两者实现响应式，常考配合使用。

**示例代码**：
```javascript
const obj = new Proxy({}, {
  get: (target, key) => Reflect.get(target, key) || 'default'
});
console.log(obj.name); // "default"
```

---

### 67. 如何实现一个简单的响应式系统？
**答案**：  
使用 `Proxy` 或 `Object.defineProperty` 监听数据变化。

**解析**：  
Vue 的核心原理，常考依赖收集。

**示例代码**：
```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log(`Get ${key}`);
      return target[key];
    },
    set(target, key, val) {
      console.log(`Set ${key} to ${val}`);
      target[key] = val;
      return true;
    }
  });
}
const data = reactive({ count: 0 });
data.count = 1; // "Set count to 1"
```

---

### 68. 什么是 JavaScript 的 Tree Shaking？
**答案**：  
Tree Shaking 是打包工具（如 Webpack）移除未使用代码的优化技术。

**解析**：  
依赖 ES Module 的静态分析，常考条件。

**示例代码**：
```javascript
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
// main.js
import { add } from './math.js';
console.log(add(1, 2)); // sub 被移除
```

---

### 69. 如何实现一个简单的 Event Bus？
**答案**：  
使用发布-订阅模式实现全局事件通信。

**解析**：  
Vue 常用的事件总线，常考解耦。

**示例代码**：
```javascript
class EventBus {
  constructor() { this.events = {}; }
  on(event, cb) { (this.events[event] = this.events[event] || []).push(cb); }
  emit(event, ...args) { this.events[event]?.forEach(cb => cb(...args)); }
}
const bus = new EventBus();
bus.on('update', data => console.log(data));
bus.emit('update', 'Hi');
```

---

### 70. 什么是 JavaScript 的 BigInt？
**答案**：  
`BigInt` 是 ES2020 引入的大整数类型，用 `n` 后缀表示。

**解析**：  
解决 `Number` 精度问题，常考运算。

**示例代码**：
```javascript
const big = 12345678901234567890n;
console.log(big + 1n); // 12345678901234567891n
```

---

### 71. 如何实现一个简单的防抖节流组合？
**答案**：  
结合防抖和节流的特性。

**解析**：  
实际应用中灵活调整，常考实现。

**示例代码**：
```javascript
// 见 60 题
```

---

### 72. 什么是 JavaScript 的 Symbol？
**答案**：  
`Symbol` 是 ES6 引入的唯一标识类型。

**解析**：  
用于对象属性键，避免冲突，常考用法。

**示例代码**：
```javascript
const sym = Symbol('id');
const obj = { [sym]: 1 };
console.log(obj[sym]); // 1
```

---

### 73. 如何实现一个简单的深冻结？
**答案**：  
使用递归冻结对象及其嵌套属性。

**解析**：  
防止对象修改，常考边界。

**示例代码**：
```javascript
function deepFreeze(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) deepFreeze(obj[key]);
  });
  return Object.freeze(obj);
}
const o = deepFreeze({ a: { b: 1 } });
// o.a.b = 2; // 报错
```

---

### 74. 什么是 JavaScript 的 Iterator 和 Iterable？
**答案**：  
- `Iterator`：具有 `next()` 方法的对象。  
- `Iterable`：具有 `[Symbol.iterator]` 方法的对象。

**解析**：  
支持 `for...of`，常考自定义迭代器。

**示例代码**：
```javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return { value: i++, done: i > 3 };
      }
    };
  }
};
for (let n of iterable) console.log(n); // 0 1 2
```

---

### 75. 如何实现一个简单的异步队列？
**答案**：  
使用 Promise 链或 async 函数串行执行。

**解析**：  
控制异步任务顺序，常考实现。

**示例代码**：
```javascript
class AsyncQueue {
  constructor() { this.queue = Promise.resolve(); }
  add(task) {
    this.queue = this.queue.then(() => task());
    return this.queue;
  }
}
const q = new AsyncQueue();
q.add(() => new Promise(r => setTimeout(() => { console.log('1'); r(); }, 1000)));
q.add(() => console.log('2'));
```

---

### 76. 什么是 JavaScript 的 Optional Chaining？
**答案**：  
可选链（`?.`）是 ES2020 特性，安全访问嵌套属性。

**解析**：  
避免 `undefined` 错误，常考与 `&&` 的对比。

**示例代码**：
```javascript
const obj = { a: { b: 1 } };
console.log(obj?.a?.b); // 1
console.log(obj?.x?.y); // undefined
```

---

### 77. 如何实现一个简单的防抖 Promise？
**答案**：  
结合防抖和 Promise，返回延迟结果。

**解析**：  
异步场景优化，常考实现。

**示例代码**：
```javascript
function debouncePromise(fn, delay) {
  let timer;
  return (...args) => new Promise(resolve => {
    clearTimeout(timer);
    timer = setTimeout(() => resolve(fn(...args)), delay);
  });
}
```

---

### 78. 什么是 JavaScript 的 Nullish Coalescing？
**答案**：  
空值合并（`??`）是 ES2020 特性，仅在 `null` 或 `undefined` 时取默认值。

**解析**：  
与 `||` 不同，不处理 falsy 值。常考使用。

**示例代码**：
```javascript
console.log(0 || 1); // 1
console.log(0 ?? 1); // 0
```

---

### 79. 如何实现一个简单的对象合并？
**答案**：  
使用 `Object.assign` 或扩展运算符。

**解析**：  
合并配置对象，常考深合并。

**示例代码**：
```javascript
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2 }
```

---

### 80. 什么是 JavaScript 的 Dynamic Import？
**答案**：  
动态导入（`import()`）是 ES2020 特性，按需加载模块。

**解析**：  
支持代码分割，常考使用场景。

**示例代码**：
```javascript
import('module.js').then(mod => console.log(mod));
```

---

### 81. 如何实现一个简单的防抖和节流的高阶版本？
**答案**：  
支持配置立即执行和取消功能。

**解析**：  
高级优化，常考灵活性。

**示例代码**：
```javascript
function debounce(fn, delay, immediate = false) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    if (immediate && !timer) fn(...args);
    timer = setTimeout(() => fn(...args), delay);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
```

---

### 82. 什么是 JavaScript 的 Atomics？
**答案**：  
`Atomics` 是 ES2017 引入的 API，用于多线程操作共享内存。

**解析**：  
配合 `SharedArrayBuffer`，常考并发。

**示例代码**：
```javascript
const buffer = new SharedArrayBuffer(16);
const arr = new Int32Array(buffer);
Atomics.add(arr, 0, 1);
```

---

### 83. 如何实现一个简单的对象序列化？
**答案**：  
将对象转为字符串（如 JSON），处理特殊类型。

**解析**：  
常用于数据传输，常考边界。

**示例代码**：
```javascript
function serialize(obj) {
  return JSON.stringify(obj, (key, val) =>
    typeof val === 'function' ? val.toString() : val
  );
}
```

---

### 84. 什么是 JavaScript 的 Intl？
**答案**：  
`Intl` 是国际化 API，支持日期、数字和字符串格式化。

**解析**：  
处理多语言，常考使用。

**示例代码**：
```javascript
const date = new Intl.DateTimeFormat('zh-CN').format(new Date());
console.log(date); // "2025/4/8"
```

---

### 85. 如何实现一个简单的防抖和节流的混合？
**答案**：  
结合两者特性，支持首次执行和频率控制。

**解析**：  
高级场景，常考实现。

**示例代码**：
```javascript
// 见 60 题
```

---

### 86. 什么是 JavaScript 的 Temporal？
**答案**：  
`Temporal` 是提案中的日期时间 API，改进 `Date`。

**解析**：  
解决 `Date` 问题，常考未来趋势。

**示例代码**：
```javascript
// Temporal 未正式发布，示例待定
```

---

### 87. 如何实现一个简单的对象深比较？
**答案**：  
递归比较对象属性和值。

**解析**：  
判断对象相等，常考边界。

**示例代码**：
```javascript
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => deepEqual(a[key], b[key]));
}
```

---

### 88. 什么是 JavaScript 的 Web Workers？
**答案**：  
Web Workers 在后台线程运行脚本，不阻塞主线程。

**解析**：  
处理复杂计算，常考通信。

**示例代码**：
```javascript
// worker.js
self.onmessage = e => self.postMessage(e.data * 2);
// main.js
const worker = new Worker('worker.js');
worker.onmessage = e => console.log(e.data);
worker.postMessage(5); // 10
```

---

### 89. 如何实现一个简单的防抖 Promise 队列？
**答案**：  
结合防抖和 Promise 队列。

**解析**：  
异步任务控制，常考实现。

**示例代码**：
```javascript
function debounceQueue(fn, delay) {
  let queue = Promise.resolve(), timer;
  return (...args) => {
    clearTimeout(timer);
    return new Promise(resolve => {
      timer = setTimeout(() => {
        queue = queue.then(() => fn(...args).then(resolve));
      }, delay);
    });
  };
}
```

---

### 90. 什么是 JavaScript 的 Service Workers？
**答案**：  
Service Workers 是代理脚本，支持离线和推送。

**解析**：  
PWA 核心，常考注册和缓存。

**示例代码**：
```javascript
navigator.serviceWorker.register('sw.js');
```

---

### 91. 如何实现一个简单的对象克隆？
**答案**：  
使用 `structuredClone` 或递归深拷贝。

**解析**：  
ES2022 新增 `structuredClone`，常考兼容性。

**示例代码**：
```javascript
const obj = { a: { b: 1 } };
const clone = structuredClone(obj); // 或 deepClone
```

---

### 92. 什么是 JavaScript 的 WebAssembly？
**答案**：  
WebAssembly（Wasm）是高效的二进制格式，与 JS 互操作。

**解析**：  
提升性能，常考调用方式。

**示例代码**：
```javascript
fetch('module.wasm').then(res => res.arrayBuffer()).then(buf => WebAssembly.instantiate(buf));
```

---

### 93. 如何实现一个简单的防抖和节流的高级版本？
**答案**：  
支持取消、立即执行和动态调整。

**解析**：  
复杂场景优化，常考实现。

**示例代码**：
```javascript
// 见 81 题
```

---

### 94. 什么是 JavaScript 的 Shadow DOM？
**答案**：  
Shadow DOM 是封装 DOM 和样式的 Web 组件技术。

**解析**：  
隔离组件，常考使用。

**示例代码**：
```javascript
const el = document.createElement('div');
const shadow = el.attachShadow({ mode: 'open' });
shadow.innerHTML = '<p>Shadow Content</p>';
```

---

### 95. 如何实现一个简单的对象路径访问？
**答案**：  
解析字符串路径访问嵌套属性。

**解析**：  
如 lodash `get`，常考实现。

**示例代码**：
```javascript
function get(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
const obj = { a: { b: 1 } };
console.log(get(obj, 'a.b')); // 1
```

---

### 96. 什么是 JavaScript 的 Custom Elements？
**答案**：  
Custom Elements 允许定义自定义 HTML 标签。

**解析**：  
Web 组件的一部分，常考注册。

**示例代码**：
```javascript
class MyElement extends HTMLElement {
  connectedCallback() { this.innerHTML = 'Hello'; }
}
customElements.define('my-element', MyElement);
```

---

### 97. 如何实现一个简单的对象观察？
**答案**：  
使用 `Proxy` 或 `Object.defineProperty` 监听变化。

**解析**：  
响应式基础，常考实现。

**示例代码**：
```javascript
// 见 67 题
```

---

### 98. 什么是 JavaScript 的 Intersection Observer？
**答案**：  
Intersection Observer 监听元素是否进入视口。

**解析**：  
优化懒加载，常考使用。

**示例代码**：
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) console.log('Visible');
  });
});
observer.observe(document.querySelector('#target'));
```

---

### 99. 如何实现一个简单的防抖和节流的高级组合？
**答案**：  
支持多种模式切换。

**解析**：  
复杂优化，常考实现。

**示例代码**：
```javascript
// 见 60 题
```

---

### 100. 什么是 JavaScript 的模块联邦？
**答案**：  
模块联邦（Module Federation）是 Webpack 5 的特性，支持微前端模块共享。

**解析**：  
实现跨应用复用，常考配置。

**示例代码**：
```javascript
// Webpack 配置示例
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      exposes: { './Module': './src/Module' }
    })
  ]
};
```





### **一、JavaScript 基础**

#### 1. `undefined` 和 `null` 的区别是什么？
- **答案**：`undefined` 表示变量声明但未赋值，或函数无返回值；`null` 表示“无对象”，由开发者主动赋值。
- **解析**：
  - `undefined`：自动分配，如 `let a; console.log(a); // undefined`。
  - `null`：手动设置，如 `let obj = null;`。
  - 示例：`function foo() {} console.log(foo()); // undefined`。
- **原理**：`undefined` 是全局对象属性，`null` 是对象类型的特殊值，历史遗留设计。

#### 2. `==` 和 `===` 的区别？
- **答案**：`==` 是宽松相等，会类型转换；`===` 是严格相等，要求值和类型相同。
- **解析**：
  - `==`：`5 == "5" // true`，因字符串转为数字。
  - `===`：`5 === "5" // false`，类型不同。
  - 特殊：`null == undefined // true`，但 `null === undefined // false`。
- **原理**：`==` 调用 `ToPrimitive` 转换，`===` 直接比较内存值和类型。

#### 3. 解释 JavaScript 中的执行上下文和作用域链。
- **答案**：执行上下文是代码执行环境，包含变量对象、作用域链和 `this`；作用域链是变量查找的层级结构。
- **解析**：
  - 执行上下文分全局、函数、Eval 三种，创建时初始化 VO、作用域链和 `this`。
  - 作用域链基于词法作用域，示例：
    ```javascript
    var a = 1;
    function outer() {
      var b = 2;
      function inner() { console.log(a, b); } // 1, 2
      inner();
    }
    ```
- **原理**：由调用栈管理，作用域链在代码定义时静态确定。

#### 4. JavaScript 中的闭包（closure）是什么？有什么应用场景？
- **答案**：闭包是函数与其词法环境的组合，能访问外部作用域变量。应用场景包括数据隐私、回调函数等。
- **解析**：
  - 示例：
    ```javascript
    function outer() {
      let count = 0;
      return function() { return count++; };
    }
    const inc = outer();
    console.log(inc(), inc()); // 0, 1
    ```
  - 应用：计数器、模块化、私有变量。
- **原理**：闭包保留外部作用域引用，防止垃圾回收。

#### 5. 变量提升（Hoisting）是什么？`let`、`const` 和 `var` 的区别？
- **答案**：变量提升是将变量声明提升到作用域顶部。`var` 有提升，`let` 和 `const` 无提升且有块级作用域。
- **解析**：
  - `var`：`console.log(x); var x = 1; // undefined`。
  - `let`：`console.log(y); let y = 1; // ReferenceError`（TDZ）。
  - `const`：不可重新赋值，但对象属性可变。
- **原理**：`var` 绑定到函数作用域，`let/const` 使用块级词法环境。

#### 6. `typeof`、`instanceof` 和 `Object.prototype.toString.call()` 的区别？
- **答案**：
  - `typeof`：返回基本类型字符串。
  - `instanceof`：检测对象是否是某构造函数的实例。
  - `Object.prototype.toString.call()`：返回精确类型字符串。
- **解析**：
  - `typeof null // "object"`（历史遗留）。
  - `[] instanceof Array // true`。
  - `Object.prototype.toString.call([]) // "[object Array]"`。
- **原理**：`typeof` 检查原始类型，`instanceof` 检查原型链，`toString` 调用对象的内部 `[[Class]]`。

#### 7. 事件循环（Event Loop）是如何工作的？
- **答案**：事件循环协调单线程执行同步代码、微任务和宏任务。
- **解析**：
  - 流程：同步代码 -> 清空微任务 -> 执行一个宏任务 -> 重复。
  - 示例：`setTimeout(() => console.log("timeout"), 0); Promise.resolve().then(() => console.log("promise")); // promise -> timeout`。
- **原理**：由浏览器或 Node.js 运行时实现，依赖任务队列。

#### 8. 什么是 `this`？不同情况下 `this` 指向什么？
- **答案**：`this` 是函数执行时的上下文，取决于调用方式。
- **解析**：
  - 全局：`this // window`。
  - 对象方法：`obj.method() // obj`。
  - 箭头函数：继承外层 `this`。
  - `call/apply`：显式绑定。
- **原理**：由调用栈中的执行上下文决定。

#### 9. 什么是原型链（Prototype Chain）？
- **答案**：原型链是对象继承属性的查找机制。
- **解析**：
  - 示例：`obj.__proto__ -> Object.prototype -> null`。
  - 访问属性时，沿原型链向上查找。
- **原理**：基于构造函数的 `prototype` 属性和实例的 `__proto__`。

#### 10. `call`、`apply` 和 `bind` 的区别？
- **答案**：
  - `call`：立即调用，参数逐个传递。
  - `apply`：立即调用，参数为数组。
  - `bind`：返回新函数，不立即调用。
- **解析**：
  - `fn.call(obj, 1, 2)` vs `fn.apply(obj, [1, 2])` vs `fn.bind(obj)(1, 2)`。
- **原理**：修改函数的 `this` 绑定，底层依赖上下文切换。

#### 11. 深拷贝和浅拷贝的区别？如何实现深拷贝？
- **答案**：
  - 浅拷贝：只复制一层引用。
  - 深拷贝：递归复制所有层级。
- **解析**：
  - 浅拷贝：`let a = {x: 1}; let b = Object.assign({}, a); b.x = 2; // a.x unchanged`。
  - 深拷贝实现：
    ```javascript
    function deepClone(obj) {
      if (obj === null || typeof obj !== "object") return obj;
      let copy = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) copy[key] = deepClone(obj[key]);
      }
      return copy;
    }
    ```
- **原理**：深拷贝需处理循环引用（如用 `WeakMap`）。

#### 12. 什么是柯里化（Currying）？如何实现？
- **答案**：柯里化是将多参数函数转为单参数函数序列。
- **解析**：
  - 示例：
    ```javascript
    function curry(fn) {
      return function curried(...args) {
        if (args.length >= fn.length) return fn(...args);
        return function(...moreArgs) { return curried(...args, ...moreArgs); };
      };
    }
    const add = curry((a, b, c) => a + b + c);
    console.log(add(1)(2)(3)); // 6
    ```
- **原理**：利用闭包保存参数，逐步收集。

#### 13. 解释 JavaScript 中的垃圾回收机制（GC）。
- **答案**：垃圾回收通过标记清除（Mark-and-Sweep）回收无引用对象。
- **解析**：
  - 过程：标记活动对象 -> 清除未标记对象。
  - 示例：`let obj = {}; obj = null; // obj 可被回收`。
- **原理**：引擎周期性扫描内存，依赖引用计数和可达性分析。

#### 14. `new` 关键字的实现原理？
- **答案**：`new` 创建实例，绑定原型，执行构造函数，返回对象。
- **解析**：
  - 实现：
    ```javascript
    function myNew(Constructor, ...args) {
      let obj = Object.create(Constructor.prototype);
      let result = Constructor.apply(obj, args);
      return result instanceof Object ? result : obj;
    }
    ```
- **原理**：原型链连接 + 上下文绑定。

#### 15. `Object.create()` 和 `class` 继承的区别？
- **答案**：
  - `Object.create()`：创建对象，指定原型。
  - `class`：基于构造函数和原型实现继承。
- **解析**：
  - `Object.create(Parent.prototype)` vs `class Child extends Parent {}`。
  - 示例：`let obj = Object.create({x: 1}); console.log(obj.x); // 1`。
- **原理**：`Object.create` 直接操作原型，`class` 是语法糖。

---

### **二、ES6+ 语法**

#### 16. `let` 和 `const` 为什么比 `var` 更推荐？
- **答案**：`let/const` 有块级作用域，无提升，`const` 提供不可变性。
- **解析**：
  - `var`：`if (true) { var x = 1; } console.log(x); // 1`。
  - `let`：块级，TDZ。
  - `const`：不可重新赋值。
- **原理**：词法环境管理，避免全局污染。

#### 17. `Symbol` 类型的作用是什么？
- **答案**：`Symbol` 创建唯一标识符，用于对象属性键。
- **解析**：
  - `const s1 = Symbol("id"); const s2 = Symbol("id"); s1 !== s2`。
  - 应用：私有属性、`Symbol.iterator`。
- **原理**：全局注册表生成唯一值。

#### 18. `Set` 和 `Map` 的区别？
- **答案**：
  - `Set`：存储唯一值集合。
  - `Map`：键值对集合，键可以是任意类型。
- **解析**：
  - `Set`：`let s = new Set([1, 1]); // {1}`。
  - `Map`：`let m = new Map([[{}, 1]]);`。
- **原理**：基于哈希表实现，`Map` 支持复杂键。

#### 19. `Promise` 的状态变化过程？
- **答案**：`Promise` 有三种状态：`pending` -> `fulfilled` 或 `rejected`，不可逆。
- **解析**：
  - 示例：`new Promise((resolve, reject) => resolve(1))`。
  - 状态一旦改变，不可再变。
- **原理**：内部状态机管理异步结果。

#### 20. `async/await` 的工作原理？相较于 `Promise.then` 有何优势？
- **答案**：`async/await` 是 `Promise` 的语法糖，暂停函数执行等待结果。优势是代码更简洁、可读性强。
- **解析**：
  - 示例：`async function fn() { let res = await Promise.resolve(1); return res; }`。
  - 对比：`Promise.then(res => ...)`。
- **原理**：基于 Generator 和 Promise 实现。

#### 21. `rest` 参数和 `spread` 操作符的区别？
- **答案**：
  - `rest`：收集剩余参数为数组。
  - `spread`：展开数组或对象为单独元素。
- **解析**：
  - `rest`：`function sum(...args) { return args.reduce((a, b) => a + b); } // sum(1, 2, 3) -> 6`。
  - `spread`：`let arr = [1, 2]; console.log(...arr); // 1 2`。
- **原理**：`rest` 是参数聚合，`spread` 是解构赋值，基于 ES6 迭代器。

#### 22. `Object.assign()` 和展开运算符 `{ ...obj }` 的区别？
- **答案**：
  - `Object.assign()`：合并对象到目标对象，修改原对象。
  - `{ ...obj }`：创建新对象，浅拷贝。
- **解析**：
  - `Object.assign(target, source)`：`let t = {a: 1}; Object.assign(t, {b: 2}); // t = {a: 1, b: 2}`。
  - `{ ...obj }`：`let o = {a: 1}; let n = {...o, b: 2}; // n = {a: 1, b: 2}, o unchanged`。
- **原理**：两者都是浅拷贝，`assign` 是函数调用，`spread` 是语法糖。

#### 23. 什么是 `Proxy`？和 `Object.defineProperty()` 的区别？
- **答案**：
  - `Proxy`：代理对象，提供更强大的拦截功能。
  - `Object.defineProperty()`：定义单个属性特性。
- **解析**：
  - `Proxy`：`let p = new Proxy({}, { get: (obj, key) => key }); console.log(p.x); // "x"`。
  - `Object.defineProperty()`：`Object.defineProperty(obj, "x", { value: 1 })`。
  - 区别：`Proxy` 支持动态拦截，`defineProperty` 只对已定义属性有效。
- **原理**：`Proxy` 是元编程，拦截底层操作；`defineProperty` 是属性描述符。

#### 24. `Reflect` API 是什么？
- **答案**：`Reflect` 是 ES6 提供的内置对象，提供对象操作的函数式方法。
- **解析**：
  - 示例：`Reflect.get(obj, "key")` 等价于 `obj.key`。
  - 作用：替代 `Object` 的老方法，如 `Reflect.defineProperty`。
- **原理**：规范化对象操作，与 `Proxy` 配合使用，提供一致性。

#### 25. `for...of` 和 `for...in` 的区别？
- **答案**：
  - `for...of`：遍历可迭代对象的值。
  - `for...in`：遍历对象可枚举属性的键。
- **解析**：
  - `for...of`：`let arr = [1, 2]; for (let v of arr) { console.log(v); } // 1, 2`。
  - `for...in`：`let obj = {a: 1}; for (let k in obj) { console.log(k); } // "a"`。
- **原理**：`for...of` 依赖 `Symbol.iterator`，`for...in` 基于属性枚举。

#### 26. ES6 的解构赋值如何应用？
- **答案**：解构赋值从数组或对象中提取值并赋值给变量。
- **解析**：
  - 数组：`let [a, b] = [1, 2]; // a = 1, b = 2`。
  - 对象：`let {x, y} = {x: 1, y: 2}; // x = 1, y = 2`。
  - 应用：函数参数默认值、交换变量。
- **原理**：基于模式匹配和迭代器协议。

#### 27. 模块化 `import/export` 和 `CommonJS` `require/module.exports` 的区别？
- **答案**：
  - `import/export`：ES6 静态模块，编译时确定。
  - `require/module.exports`：CommonJS 动态模块，运行时加载。
- **解析**：
  - ES6：`export const x = 1; import { x } from './mod';`。
  - CommonJS：`module.exports = { x: 1 }; const { x } = require('./mod');`。
  - 区别：ES6 支持 tree-shaking，CommonJS 更灵活。
- **原理**：ES6 是语言规范，CommonJS 是 Node.js 实现。

#### 28. `WeakMap` 和 `WeakSet` 的应用场景？
- **答案**：
  - `WeakMap`：弱引用键值对，键必须是对象。
  - `WeakSet`：弱引用集合，值必须是对象。
- **解析**：
  - `WeakMap`：`let wm = new WeakMap(); let obj = {}; wm.set(obj, 1); obj = null; // 可被回收`。
  - `WeakSet`：缓存对象，避免内存泄漏。
  - 场景：DOM 节点元数据、私有数据存储。
- **原理**：弱引用不阻止垃圾回收。

#### 29. `BigInt` 是什么？适用于什么场景？
- **答案**：`BigInt` 是大整数类型，用于精确计算超大数字。
- **解析**：
  - 示例：`let big = 12345678901234567890n; console.log(big + 1n);`。
  - 场景：金融计算、ID 生成。
- **原理**：扩展 Number 类型，支持任意精度。

#### 30. 如何使用 ES6+ 语法优化代码？
- **答案**：使用箭头函数、解构、模板字符串、`Promise` 等简化代码。
- **解析**：
  - 老代码：`function add(a, b) { return a + b; }`。
  - 新代码：`const add = (a, b) => a + b; let [x, y] = [1, 2];`。
- **原理**：语法糖提升可读性和性能。

---

### **三、异步编程**

#### 31. 解释 JavaScript 事件循环（Event Loop）及宏任务、微任务的区别？
- **答案**：
  - 事件循环：单线程处理同步和异步任务。
  - 宏任务：`setTimeout` 等，延迟执行。
  - 微任务：`Promise.then` 等，优先执行。
- **解析**：
  - 流程：同步 -> 微任务 -> 宏任务。
  - 示例：`setTimeout(() => console.log("timeout")); Promise.resolve().then(() => console.log("promise")); // promise -> timeout`。
- **原理**：浏览器和 Node.js 实现不同，依赖任务队列。

#### 32. `setTimeout` 和 `setImmediate` 有什么不同？
- **答案**：
  - `setTimeout`：延迟执行（浏览器/Node.js）。
  - `setImmediate`：立即执行（仅 Node.js）。
- **解析**：
  - `setTimeout(fn, 0)`：放入宏任务队列。
  - `setImmediate(fn)`：在 I/O 后执行。
- **原理**：`setImmediate` 是 Node.js libuv 特性。

#### 33. 如何使用 `Promise.all()` 和 `Promise.race()`？
- **答案**：
  - `Promise.all()`：所有 Promise 成功时返回结果数组。
  - `Promise.race()`：返回最先完成的 Promise 结果。
- **解析**：
  - `Promise.all([Promise.resolve(1), Promise.resolve(2)]) // [1, 2]`。
  - `Promise.race([new Promise(() => {}), Promise.resolve(1)]) // 1`。
- **原理**：并发管理，依赖状态监听。

#### 34. `async/await` 如何处理错误？
- **答案**：使用 `try/catch` 捕获错误。
- **解析**：
  - 示例：
    ```javascript
    async function fn() {
      try {
        await Promise.reject("error");
      } catch (e) {
        console.log(e); // "error"
      }
    }
    ```
- **原理**：`await` 将 `Promise` 拒绝转为异常。

#### 35. 如何实现一个 `sleep` 函数？
- **答案**：使用 `Promise` 和 `setTimeout`。
- **解析**：
  - 实现：
    ```javascript
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function test() { await sleep(1000); console.log("done"); }
    ```
- **原理**：异步延迟基于事件循环。

#### 36. `requestAnimationFrame` 和 `setTimeout` 的区别？
- **答案**：
  - `requestAnimationFrame`：浏览器重绘前执行，约 16ms。
  - `setTimeout`：指定延迟执行。
- **解析**：
  - `requestAnimationFrame(fn)`：适合动画。
  - `setTimeout(fn, 16)`：手动控制。
- **原理**：RAF 与浏览器渲染同步。

#### 37. `Promise.resolve()` 和 `Promise.reject()` 什么时候使用？
- **答案**：
  - `Promise.resolve()`：返回已解决的 Promise。
  - `Promise.reject()`：返回已拒绝的 Promise。
- **解析**：
  - `Promise.resolve(1).then(v => console.log(v)); // 1`。
  - `Promise.reject("err").catch(e => console.log(e)); // "err"`。
- **原理**：快速创建 Promise 实例。

#### 38. 如何实现 `Promise` 并发控制？
- **答案**：限制并发数量，分批执行。
- **解析**：
  - 实现：
    ```javascript
    async function limitConcurrency(tasks, limit) {
      const pool = [];
      for (let task of tasks) {
        const p = task().then(res => pool.splice(pool.indexOf(p), 1, res));
        pool.push(p);
        if (pool.length >= limit) await Promise.race(pool);
      }
      return Promise.all(pool);
    }
    ```
- **原理**：动态管理任务队列。

#### 39. `await` 关键字后面可以跟普通值吗？
- **答案**：可以，普通值会被转为已解决的 Promise。
- **解析**：
  - `async function fn() { let x = await 42; console.log(x); } // 42`。
- **原理**：`await` 调用 `Promise.resolve()` 处理。

#### 40. 如何使用 `AbortController` 取消异步请求？
- **答案**：使用 `AbortController` 的 `abort()` 方法。
- **解析**：
  - 示例：
    ```javascript
    const controller = new AbortController();
    fetch("url", { signal: controller.signal }).catch(e => console.log(e.name)); // "AbortError"
    controller.abort();
    ```
- **原理**：信号机制中断 fetch 或其他异步操作。

### **四、DOM 和 BOM 操作**

#### 41. `DOMContentLoaded` 和 `load` 事件的区别？
- **答案**：
  - `DOMContentLoaded`：DOM 解析完成时触发，不等待资源加载。
  - `load`：页面所有资源（图片、样式等）加载完成时触发。
- **解析**：
  - `document.addEventListener("DOMContentLoaded", () => console.log("DOM ready"));`。
  - `window.addEventListener("load", () => console.log("All loaded"));`。
  - 示例：`<img>` 加载前触发 `DOMContentLoaded`，加载后触发 `load`。
- **原理**：浏览器渲染流程分阶段，`DOMContentLoaded` 在 DOM 树构建后，`load` 在完整渲染后。

#### 42. 如何使用 JavaScript 操作 DOM 元素？
- **答案**：通过选择、修改属性、添加/删除节点等操作 DOM。
- **解析**：
  - 选择：`document.querySelector(".class")`。
  - 修改：`element.style.color = "red"; element.textContent = "text";`。
  - 添加：`document.body.appendChild(newDiv);`。
- **原理**：DOM 是树形结构，JavaScript 通过 DOM API 访问和修改。

#### 43. `innerHTML` 和 `textContent` 的区别？
- **答案**：
  - `innerHTML`：获取或设置元素的 HTML 内容（包括标签）。
  - `textContent`：获取或设置纯文本内容（无标签）。
- **解析**：
  - `div.innerHTML = "<p>Hi</p>"; // 解析为 <p>`。
  - `div.textContent = "<p>Hi</p>"; // 文本 "<p>Hi</p>"`。
- **原理**：`innerHTML` 涉及 HTML 解析，`textContent` 仅操作文本节点。

#### 44. 如何动态创建、修改和删除 DOM 节点？
- **答案**：
  - 创建：`document.createElement("div")`。
  - 修改：`node.textContent = "new";`。
  - 删除：`node.remove()` 或 `parent.removeChild(node)`。
- **解析**：
  - 示例：
    ```javascript
    let div = document.createElement("div");
    div.textContent = "Hello";
    document.body.appendChild(div);
    div.remove();
    ```
- **原理**：DOM 树动态更新，触发重绘或回流。

#### 45. `addEventListener` 如何解绑事件？
- **答案**：使用 `removeEventListener`，需传入相同的事件类型和函数引用。
- **解析**：
  - 示例：
    ```javascript
    function handleClick() { console.log("click"); }
    button.addEventListener("click", handleClick);
    button.removeEventListener("click", handleClick);
    ```
  - 注意：匿名函数无法移除。
- **原理**：事件监听器存储在元素的事件表中，需精确匹配移除。

#### 46. `event.preventDefault()` 和 `event.stopPropagation()` 的区别？
- **答案**：
  - `preventDefault()`：阻止默认行为（如表单提交）。
  - `stopPropagation()`：阻止事件冒泡或捕获。
- **解析**：
  - `form.addEventListener("submit", e => e.preventDefault());`。
  - `div.addEventListener("click", e => e.stopPropagation()); // 阻止向上冒泡`。
- **原理**：事件模型中控制事件流和默认动作。

#### 47. `dataset` 是什么？如何使用？
- **答案**：`dataset` 是元素上 `data-*` 属性的集合。
- **解析**：
  - 示例：`<div data-id="1"></div>` -> `div.dataset.id // "1"`。
  - 设置：`div.dataset.name = "test";`。
- **原理**：HTML5 特性，提供自定义数据的标准接口。

#### 48. 什么是事件代理（事件委托）？
- **答案**：将事件监听器绑定到父元素，利用冒泡处理子元素事件。
- **解析**：
  - 示例：
    ```javascript
    document.querySelector("ul").addEventListener("click", e => {
      if (e.target.tagName === "LI") console.log(e.target.textContent);
    });
    ```
  - 优点：减少监听器，提高性能。
- **原理**：基于事件冒泡机制。

#### 49. `localStorage`、`sessionStorage` 和 `cookies` 的区别？
- **答案**：
  - `localStorage`：持久存储，无过期。
  - `sessionStorage`：会话存储，关闭标签失效。
  - `cookies`：小型数据，随请求发送，有过期时间。
- **解析**：
  - `localStorage.setItem("key", "value");`。
  - `sessionStorage` 同上，但限当前会话。
  - `document.cookie = "key=value; expires=...";`。
- **原理**：浏览器存储机制，`cookies` 与服务器交互。

#### 50. 如何检测用户滚动到底部？
- **答案**：比较 `scrollHeight`、`scrollTop` 和 `clientHeight`。
- **解析**：
  - 示例：
    ```javascript
    window.addEventListener("scroll", () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        console.log("Bottom!");
      }
    });
    ```
- **原理**：基于滚动位置和视口高度计算。

---

### **五、JavaScript 性能优化**

#### 51. 什么是防抖（debounce）和节流（throttle）？如何实现？
- **答案**：
  - 防抖：延迟执行，短时间内只执行最后一次。
  - 节流：限制频率，固定间隔执行。
- **解析**：
  - 防抖：
    ```javascript
    function debounce(fn, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    }
    ```
  - 节流：
    ```javascript
    function throttle(fn, delay) {
      let last = 0;
      return function(...args) {
        const now = Date.now();
        if (now - last >= delay) {
          fn.apply(this, args);
          last = now;
        }
      };
    }
    ```
- **原理**：控制函数调用频率，减少性能开销。

#### 52. 如何优化大规模数据渲染（如虚拟列表）？
- **答案**：使用虚拟列表，仅渲染可视区域。
- **解析**：
  - 实现：计算可视范围，动态更新 DOM。
  - 示例：React 的 `react-virtualized` 或手写逻辑。
- **原理**：减少 DOM 节点数量，优化内存和渲染。

#### 53. 如何减少 DOM 回流（Reflow）和重绘（Repaint）？
- **答案**：批量操作 DOM，使用 CSS 替代 JS 动画。
- **解析**：
  - 减少：`document.createDocumentFragment()` 批量添加。
  - 示例：`element.style.cssText = "width: 100px; height: 100px;"`。
- **原理**：回流重算布局，重绘更新样式，尽量合并操作。

#### 54. 浏览器的回流（Reflow）和重绘（Repaint）是什么？
- **答案**：
  - 回流：布局改变时重新计算位置和大小。
  - 重绘：样式改变时重新绘制。
- **解析**：
  - 回流触发：`offsetWidth`、`display: none`。
  - 重绘触发：`color`、`background`。
- **原理**：浏览器渲染管线，布局 -> 绘制 -> 合成。

#### 55. `requestIdleCallback` 的作用？
- **答案**：在浏览器空闲时执行低优先级任务。
- **解析**：
  - 示例：`requestIdleCallback(() => console.log("idle"));`。
  - 用途：延迟非紧急任务。
- **原理**：浏览器调度机制，优化主线程。

#### 56. JavaScript 如何进行内存优化？
- **答案**：避免全局变量、及时解绑引用、使用 WeakMap。
- **解析**：
  - 示例：`let obj = null;` 释放内存。
  - 避免闭包陷阱。
- **原理**：协助垃圾回收，减少内存泄漏。

#### 57. 如何优化 JavaScript 代码执行效率？
- **答案**：减少循环复杂度、缓存变量、避免重复计算。
- **解析**：
  - 示例：`let len = arr.length; for (let i = 0; i < len; i++) {}`。
- **原理**：减少运行时开销，提升 V8 引擎优化。

#### 58. 如何减少首屏加载时间？
- **答案**：代码分割、懒加载、压缩资源。
- **解析**：
  - 示例：`import(/* webpackChunkName: "lazy" */ "./module")`。
  - 使用 CDN 加速。
- **原理**：减少初始加载量，优化关键渲染路径。

#### 59. Web Worker 如何提高性能？
- **答案**：将耗时任务移到独立线程执行。
- **解析**：
  - 示例：`let worker = new Worker("worker.js"); worker.postMessage(data);`。
  - 用途：计算密集型任务。
- **原理**：多线程并行，避免阻塞主线程。

#### 60. 如何优化大量图片加载？
- **答案**：懒加载、预加载、使用 WebP 格式。
- **解析**：
  - 懒加载：`<img loading="lazy" src="img.jpg">`。
  - 预加载：`<link rel="preload" href="img.jpg">`。
- **原理**：减少初始请求，优化带宽。

### **六、手写代码**

#### 61. 手写 `call` 方法
- **答案**：
  
  ```javascript
  Function.prototype.myCall = function(context, ...args) {
    context = context || window; // 默认上下文为 window
    const fn = Symbol(); // 唯一键，避免冲突
    context[fn] = this; // 将函数绑定到上下文
    const result = context[fn](...args); // 执行函数
    delete context[fn]; // 清理临时属性
    return result;
  };
  // 测试
  function greet(name) { console.log(`Hello, ${name}! This is ${this.title}`); }
  const obj = { title: "World" };
  greet.myCall(obj, "Alice"); // "Hello, Alice! This is World"
  ```
- **解析**：模拟 `call`，将函数的 `this` 绑定到指定对象并立即执行。
- **原理**：利用对象属性调用函数，改变 `this` 指向。

#### 62. 手写 `apply` 方法
- **答案**：
  ```javascript
  Function.prototype.myApply = function(context, args) {
    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args); // args 是数组，展开传入
    delete context[fn];
    return result;
  };
  // 测试
  function sum(a, b) { return a + b; }
  console.log(sum.myApply(null, [1, 2])); // 3
  ```
- **解析**：与 `call` 类似，但参数以数组形式传递。
- **原理**：同 `call`，区别在于参数处理方式。

#### 63. 手写 `bind` 方法
- **答案**：
  ```javascript
  Function.prototype.myBind = function(context, ...initialArgs) {
    const self = this;
    return function(...laterArgs) {
      return self.apply(context, initialArgs.concat(laterArgs));
    };
  };
  // 测试
  function greet(greeting, name) { console.log(`${greeting}, ${name}!`); }
  const bound = greet.myBind(null, "Hello");
  bound("Alice"); // "Hello, Alice!"
  ```
- **解析**：返回新函数，预设 `this` 和部分参数。
- **原理**：闭包保存上下文，利用 `apply` 执行。

#### 64. 手写 `new` 操作符
- **答案**：
  ```javascript
  function myNew(Constructor, ...args) {
    const obj = Object.create(Constructor.prototype); // 创建对象，继承原型
    const result = Constructor.apply(obj, args); // 执行构造函数
    return result instanceof Object ? result : obj; // 返回结果或新对象
  };
  // 测试
  function Person(name) { this.name = name; }
  const p = myNew(Person, "Alice");
  console.log(p.name); // "Alice"
  ```
- **解析**：模拟 `new`，创建实例并绑定原型。
- **原理**：原型链 + 构造函数调用。

#### 65. 手写 `instanceof`
- **答案**：
  ```javascript
  function myInstanceof(target, constructor) {
    let proto = Object.getPrototypeOf(target);
    while (proto) {
      if (proto === constructor.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
    return false;
  };
  // 测试
  console.log(myInstanceof([], Array)); // true
  console.log(myInstanceof({}, Array)); // false
  ```
- **解析**：检查目标对象的原型链是否包含构造函数的 `prototype`。
- **原理**：遍历原型链，比较引用。

#### 66. 手写 `Object.create()` 方法
- **答案**：
  ```javascript
  function myObjectCreate(proto) {
    if (proto === null || typeof proto !== "object") throw new TypeError("Invalid prototype");
    function F() {}
    F.prototype = proto;
    return new F();
  };
  // 测试
  const parent = { x: 1 };
  const child = myObjectCreate(parent);
  console.log(child.x); // 1
  ```
- **解析**：创建新对象，指定原型。
- **原理**：利用构造函数和原型链。

#### 67. 手写深拷贝（考虑 `Symbol` 和循环引用）
- **答案**：
  ```javascript
  function deepClone(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== "object") return obj;
    if (map.has(obj)) return map.get(obj); // 处理循环引用
    const copy = Array.isArray(obj) ? [] : {};
    map.set(obj, copy); // 记录已拷贝对象
    for (let key of [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)]) {
      copy[key] = deepClone(obj[key], map);
    }
    return copy;
  };
  // 测试
  const obj = { a: 1, [Symbol("b")]: 2 };
  obj.self = obj;
  const clone = deepClone(obj);
  console.log(clone); // { a: 1, [Symbol("b")]: 2, self: [circular] }
  ```
- **解析**：递归拷贝，处理 `Symbol` 和循环引用。
- **原理**：`WeakMap` 避免无限递归。

#### 68. 手写 `Promise` 的 `then` 方法
- **答案**：
  
  ```javascript
  class MyPromise {
    constructor(executor) {
      this.state = "pending";
      this.value = undefined;
      this.callbacks = [];
      executor(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(value) {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.callbacks.forEach(cb => cb.onFulfilled(value));
    }
    reject(reason) { /* 类似 resolve */ }
    then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v;
      onRejected = typeof onRejected === "function" ? onRejected : e => { throw e; };
      return new MyPromise((resolve, reject) => {
        const cb = {
          onFulfilled: value => {
            try { resolve(onFulfilled(value)); } catch (e) { reject(e); }
          },
          onRejected: reason => { /* 类似 */ }
        };
        if (this.state === "pending") this.callbacks.push(cb);
        else if (this.state === "fulfilled") cb.onFulfilled(this.value);
      });
    }
  }
  ```
- **解析**：实现状态管理和链式调用。
- **原理**：基于发布-订阅和异步队列。

#### 69. 手写 `Promise.all()`
- **答案**：
  ```javascript
  function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let count = 0;
      promises.forEach((p, i) => {
        Promise.resolve(p).then(value => {
          results[i] = value;
          if (++count === promises.length) resolve(results);
        }).catch(reject);
      });
    });
  };
  // 测试
  myPromiseAll([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1, 2]
  ```
- **解析**：等待所有 Promise 完成，返回结果数组。
- **原理**：计数器 + 错误处理。

#### 70. 手写 `Promise.race()`
- **答案**：
  ```javascript
  function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach(p => Promise.resolve(p).then(resolve).catch(reject));
    });
  };
  // 测试
  myPromiseRace([Promise.resolve(1), new Promise(() => {})]).then(console.log); // 1
  ```
- **解析**：返回最先完成的 Promise。
- **原理**：竞速机制，监听首个状态变化。

#### 71. 手写 `Promise.any()`
- **答案**：
  ```javascript
  function myPromiseAny(promises) {
    return new Promise((resolve, reject) => {
      let errors = [];
      let count = 0;
      promises.forEach((p, i) => {
        Promise.resolve(p).then(resolve).catch(e => {
          errors[i] = e;
          if (++count === promises.length) reject(new AggregateError(errors));
        });
      });
    });
  };
  ```
- **解析**：返回首个成功的 Promise，若全失败则抛出错误集合。
- **原理**：计数器 + 错误聚合。

#### 72. 手写 `Promise.finally()`
- **答案**：
  ```javascript
  Promise.prototype.myFinally = function(callback) {
    return this.then(
      value => Promise.resolve(callback()).then(() => value),
      reason => Promise.resolve(callback()).then(() => { throw reason; })
    );
  };
  ```
- **解析**：无论成功或失败都执行回调，保持原值。
- **原理**：基于 `then` 链式调用。

#### 73. 手写防抖函数（`debounce`）
- **答案**：
  ```javascript
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };
  ```
- **解析**：延迟执行，清除前次定时器。
- **原理**：事件合并，优化频繁调用。

#### 74. 手写节流函数（`throttle`）
- **答案**：
  ```javascript
  function throttle(fn, delay) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= delay) {
        fn.apply(this, args);
        last = now;
      }
    };
  };
  ```
- **解析**：限制执行频率。
- **原理**：时间戳控制间隔。

#### 75. 手写 `LRU Cache`
- **答案**：
  ```javascript
  class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.map = new Map();
    }
    get(key) {
      if (!this.map.has(key)) return -1;
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
    put(key, value) {
      if (this.map.has(key)) this.map.delete(key);
      else if (this.map.size >= this.capacity) this.map.delete(this.map.keys().next().value);
      this.map.set(key, value);
    }
  };
  ```
- **解析**：最近最少使用缓存，超出容量删除最旧项。
- **原理**：`Map` 维护顺序，键值对存储。

#### 76. 手写 `JSON.stringify`
- **答案**：
  ```javascript
  function myStringify(obj) {
    if (obj === null) return "null";
    if (typeof obj === "undefined" || typeof obj === "function") return undefined;
    if (typeof obj !== "object") return typeof obj === "string" ? `"${obj}"` : String(obj);
    if (Array.isArray(obj)) return "[" + obj.map(myStringify).join(",") + "]";
    return "{" + Object.keys(obj).map(key => `"${key}":${myStringify(obj[key])}`).join(",") + "}";
  };
  ```
- **解析**：递归序列化，处理基本类型和对象。
- **原理**：字符串拼接，模拟 JSON 格式。

#### 77. 手写 `JSON.parse`
- **答案**：
  ```javascript
  function myParse(str) {
    return new Function(`return ${str}`)(); // 简单实现
  };
  // 测试
  console.log(myParse('{"a": 1, "b": [2, 3]}')); // { a: 1, b: [2, 3] }
  ```
- **解析**：利用 `Function` 执行字符串代码。
- **原理**：动态解析，注意安全问题（生产中用 parser）。

#### 78. 手写 `EventEmitter`（发布-订阅模式）
- **答案**：
  ```javascript
  class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(event, listener) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(listener);
    }
    emit(event, ...args) {
      if (this.events[event]) this.events[event].forEach(listener => listener(...args));
    }
    off(event, listener) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(l => l !== listener);
      }
    }
  };
  ```
- **解析**：实现事件订阅和触发。
- **原理**：数组存储回调，遍历执行。

#### 79. 手写深度优先遍历（DFS）
- **答案**：
  ```javascript
  function dfs(node) {
    if (!node) return;
    console.log(node.value); // 前序遍历
    dfs(node.left);
    dfs(node.right);
  };
  ```
- **解析**：递归遍历树，先访问根节点。
- **原理**：栈式递归，深度优先。

#### 80. 手写广度优先遍历（BFS）
- **答案**：
  ```javascript
  function bfs(root) {
    if (!root) return;
    const queue = [root];
    while (queue.length) {
      const node = queue.shift();
      console.log(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  };
  ```
- **解析**：队列实现，逐层遍历。
- **原理**：先进先出，广度优先。

### **七、前端安全**

#### 81. 什么是 XSS（跨站脚本攻击）？如何防御？
- **答案**：
  - XSS：攻击者注入恶意脚本到网页，窃取用户数据或执行恶意操作。
  - 防御：转义输入、Content Security Policy (CSP)、避免 `eval`。
- **解析**：
  - 类型：反射型、存储型、DOM 型。
  - 示例：`<script>alert("XSS")</script>` -> 转义为 `&lt;script&gt;`。
- **原理**：利用用户输入未过滤执行代码，防御通过输入验证和输出编码。

#### 82. 什么是 CSRF（跨站请求伪造）？如何防御？
- **答案**：
  - CSRF：伪造用户身份发起请求。
  - 防御：CSRF Token、同源检测、双重 Cookie 验证。
- **解析**：
  - 示例：用户登录后，恶意站点发请求更改密码。
  - Token：`<form><input type="hidden" name="token" value="xxx"></form>`。
- **原理**：利用 Cookie 自动发送，防御通过验证请求来源。

#### 83. `CORS` 是什么？如何解决跨域问题？
- **答案**：
  - CORS：跨源资源共享，浏览器机制允许跨域请求。
  - 解决：后端设置 `Access-Control-Allow-Origin`。
- **解析**：
  - 简单请求：`GET/POST`，后端返回头。
  - 预检请求：`OPTIONS`，检查权限。
- **原理**：基于 HTTP 头控制跨域访问。

#### 84. `HttpOnly` Cookie 有什么作用？
- **答案**：`HttpOnly` 阻止 JavaScript 访问 Cookie，防止 XSS 窃取。
- **解析**：
  - 设置：`Set-Cookie: key=value; HttpOnly`。
  - `document.cookie` 无法读取。
- **原理**：限制客户端脚本访问，提升安全性。

#### 85. `Content Security Policy (CSP)` 是什么？
- **答案**：CSP 是浏览器策略，限制资源加载和脚本执行。
- **解析**：
  - 示例：`<meta http-equiv="Content-Security-Policy" content="script-src 'self'">`。
  - 阻止内联脚本和未授权源。
- **原理**：通过 HTTP 头或 meta 标签白名单控制。

#### 86. 如何防止 SQL 注入？
- **答案**：使用参数化查询、ORM、输入验证。
- **解析**：
  - 危险：`"SELECT * FROM users WHERE id = " + userInput`。
  - 安全：`db.query("SELECT * FROM users WHERE id = ?", [userInput])`。
- **原理**：避免直接拼接 SQL，预编译分离数据和代码。

#### 87. 什么是 `SameSite` 属性？
- **答案**：`SameSite` 是 Cookie 属性，限制跨站请求携带。
- **解析**：
  - 值：`Strict`（仅同站）、`Lax`（部分跨站）、`None`（需 HTTPS）。
  - 示例：`Set-Cookie: key=value; SameSite=Strict`。
- **原理**：防御 CSRF，控制 Cookie 发送范围。

#### 88. `JWT` 是什么？如何实现安全传输？
- **答案**：
  - JWT：JSON Web Token，用于身份验证。
  - 安全传输：HTTPS、使用签名验证。
- **解析**：
  - 结构：`Header.Payload.Signature`。
  - 示例：`eyJhbGciOiJIUzI1NiJ9...`。
- **原理**：基于 HMAC 或 RSA 签名，确保完整性。

#### 89. 为什么不要直接在前端存储敏感信息？
- **答案**：前端代码可被查看，易被窃取。
- **解析**：
  - 危险：`localStorage.setItem("token", "secret")` 可被脚本读取。
  - 替代：后端存储，使用短生命周期 Token。
- **原理**：浏览器环境不可信，需依赖服务端安全。

#### 90. 为什么 HTTPS 比 HTTP 安全？
- **答案**：HTTPS 使用 TLS/SSL 加密传输，防止窃听和篡改。
- **解析**：
  - HTTP：明文传输。
  - HTTPS：加密通信，证书验证身份。
- **原理**：对称 + 非对称加密，保障数据安全。

---

### **八、设计模式**

#### 91. 单例模式（Singleton）如何实现？
- **答案**：
  ```javascript
  class Singleton {
    static instance = null;
    constructor() {
      if (Singleton.instance) return Singleton.instance;
      Singleton.instance = this;
    }
  };
  // 测试
  const s1 = new Singleton();
  const s2 = new Singleton();
  console.log(s1 === s2); // true
  ```
- **解析**：确保类只有一个实例。
- **原理**：静态属性控制实例化。

#### 92. 观察者模式（Observer）如何实现？
- **答案**：
  ```javascript
  class Subject {
    constructor() { this.observers = []; }
    addObserver(observer) { this.observers.push(observer); }
    notify(data) { this.observers.forEach(o => o.update(data)); }
  }
  class Observer {
    update(data) { console.log(`Updated with: ${data}`); }
  };
  ```
- **解析**：主体通知观察者状态变化。
- **原理**：一对多依赖，松耦合。

#### 93. 发布-订阅模式（Pub-Sub）和观察者模式的区别？
- **答案**：
  - Pub-Sub：通过事件通道解耦发布者和订阅者。
  - Observer：主体直接通知观察者。
- **解析**：
  - Pub-Sub 示例：`eventBus.on("event", fn); eventBus.emit("event", data);`。
  - Observer：直接调用 `notify`。
- **原理**：Pub-Sub 中介化，Observer 直接依赖。

#### 94. 工厂模式（Factory）如何实现？
- **答案**：
  ```javascript
  class Product {
    constructor(name) { this.name = name; }
  }
  class Factory {
    static create(type) {
      switch (type) {
        case "A": return new Product("A");
        case "B": return new Product("B");
      }
    }
  };
  ```
- **解析**：封装对象创建逻辑。
- **原理**：统一接口，隐藏细节。

#### 95. 适配器模式（Adapter）如何实现？
- **答案**：
  ```javascript
  class OldAPI { oldMethod() { return "old"; } }
  class Adapter {
    constructor() { this.old = new OldAPI(); }
    newMethod() { return this.old.oldMethod().toUpperCase(); }
  };
  ```
- **解析**：将旧接口适配到新接口。
- **原理**：兼容性转换，桥接设计。

#### 96. 代理模式（Proxy）如何实现？
- **答案**：
  ```javascript
  class Subject { request() { return "real"; } }
  class Proxy {
    constructor() { this.subject = new Subject(); }
    request() { console.log("Proxying"); return this.subject.request(); }
  };
  ```
- **解析**：代理控制对主体的访问。
- **原理**：拦截和增强，访问控制。

#### 97. 装饰器模式（Decorator）如何使用？
- **答案**：
  ```javascript
  class Coffee { cost() { return 5; } }
  class MilkDecorator {
    constructor(coffee) { this.coffee = coffee; }
    cost() { return this.coffee.cost() + 2; }
  };
  ```
- **解析**：动态扩展功能。
- **原理**：包装对象，职责分离。

#### 98. 享元模式（Flyweight）如何优化性能？
- **答案**：
  ```javascript
  class Flyweight {
    constructor(state) { this.state = state; }
  }
  class Factory {
    static pool = new Map();
    static get(state) {
      if (!this.pool.has(state)) this.pool.set(state, new Flyweight(state));
      return this.pool.get(state);
    }
  };
  ```
- **解析**：共享对象，减少内存。
- **原理**：复用不变状态。

#### 99. 职责链模式（Chain of Responsibility）如何实现？
- **答案**：
  ```javascript
  class Handler {
    constructor(next) { this.next = next; }
    handle(request) { if (this.next) this.next.handle(request); }
  }
  class ConcreteHandler extends Handler {
    handle(request) { if (request < 10) console.log("Handled"); else super.handle(request); }
  };
  ```
- **解析**：请求沿链传递。
- **原理**：解耦发送者和处理者。

#### 100. MVVM 和 MVC 的区别是什么？
- **答案**：
  - MVVM：Model-View-ViewModel，双向绑定。
  - MVC：Model-View-Controller，单向数据流。
- **解析**：
  - MVVM：Vue/React，ViewModel 自动更新视图。
  - MVC：传统 Web，Controller 处理逻辑。
- **原理**：MVVM 注重数据绑定，MVC 注重职责分离。
