# 热门经典 Vue 3 面试题 Top 100

## 一、Vue 3 核心 (1-25)

### 1. Vue 2 和 Vue 3 的核心区别是什么？
**答案**：  
Vue 3 在架构、API、性能和生态支持上全面升级：  

1. **响应式系统**：从 Object.defineProperty 改为 Proxy，支持动态属性和数组监听。  
2. **API 设计**：新增 Composition API，提供更灵活的逻辑复用，保留 Options API。  
3. **新特性**：引入 Teleport、Fragments、Suspense，支持多根节点和异步组件。  
4. **性能优化**：编译时优化（如静态提升、Patch Flags）、Tree-Shaking，渲染速度提升 55%，更新速度提升 133%，内存减少 54%。  
5. **生态支持**：更好的 TypeScript 支持，Vite 集成更高效。

**解析**：  
Vue 2 的 defineProperty 需递归遍历对象，无法监听数组索引变化（如 push），Vue 3 的 Proxy 直接代理对象，拦截所有操作，解决这些问题。Composition API 通过函数式编程解决 Options API 的逻辑分散问题，新特性如 Teleport（跨组件 DOM 渲染）和 Suspense（异步加载）提升开发体验。性能优化源于编译器重写，静态节点提升至顶层，减少运行时开销。TypeScript 支持让 Vue 3 更适合现代大型项目。

**示例代码**：
```javascript
// Vue 2 Options API
export default {
  data() { return { count: 0 }; },
  methods: { increment() { this.count++; } }
};

// Vue 3 Composition API
import { ref } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
};
```

---

### 2. Composition API 和 Options API 的区别及使用场景？
**答案**：  
- **Composition API**：通过 setup 函数或 `<script setup>` 组织逻辑，按功能聚合，支持逻辑复用和 TypeScript。  
- **Options API**：按选项（data、methods、computed）组织逻辑，结构固定，适合简单组件。  
- **使用场景**：Composition API 适用于复杂组件和逻辑复用（如 hooks），Options API 适合简单、直观的组件。

**解析**：  
Options API 在 Vue 2 中广泛使用，但随着组件复杂度增加，data 和 methods 分散导致维护困难。Composition API 将相关逻辑聚合（如状态和操作），通过自定义 hooks 实现复用。setup 函数运行于 beforeCreate 后，无 this 绑定，需手动导入 API（如 ref、computed）。`<script setup>` 是其语法糖，进一步简化代码。TypeScript 支持让 Composition API 在类型推导上更优。面试常考如何将 Options API 转为 Composition API。

**示例代码**：
```javascript
// Options API
export default {
  data: () => ({ count: 0, name: '' }),
  methods: { increment() { this.count++; } },
  computed: { fullName() { return `${this.name} ${this.count}`; } }
};

// Composition API
import { ref, computed } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const name = ref('');
    const increment = () => count.value++;
    const fullName = computed(() => `${name.value} ${count.value}`);
    return { count, name, increment, fullName };
  }
};

// <script setup>
<script setup>
import { ref, computed } from 'vue';
const count = ref(0);
const name = ref('');
const increment = () => count.value++;
const fullName = computed(() => `${name.value} ${count.value}`);
</script>
```

---

### 3. Vue 3 为什么用 Proxy 替代 defineProperty？
**答案**：  
Vue 3 使用 Proxy 替代 defineProperty 的原因：  
1. **性能提升**：Proxy 无需递归遍历对象，直接代理整个对象，减少初始化开销。  
2. **功能增强**：支持数组变化（如 push、pop）监听和动态属性添加/删除。  
3. **局限性解决**：defineProperty 无法监听未定义属性，Proxy 无此限制。

**解析**：  
Vue 2 的 defineProperty 需为每个属性定义 getter/setter，对象嵌套时递归遍历导致性能瓶颈，且无法监听数组索引变化（需通过 Vue.set 补救）。Proxy 通过拦截 get/set 操作，直接监听对象所有属性和方法调用，支持数组原生方法（如 splice）和动态键（如 obj.newKey）。其缺点是浏览器兼容性稍差（不支持 IE），但现代项目多采用 Polyfill 或放弃旧浏览器支持。面试常考 Proxy 的实现细节和优缺点。

**示例代码**：
```javascript
// Vue 2 defineProperty
const obj = {};
Object.defineProperty(obj, 'key', {
  get: () => console.log('get'),
  set: (val) => console.log('set', val)
});
obj.key = 1; // 触发 set
obj.newKey = 2; // 无响应

// Vue 3 Proxy
import { reactive } from 'vue';
const obj2 = reactive({ key: 0 });
obj2.key = 1; // 触发更新
obj2.newKey = 2; // 触发更新
obj2.arr = []; // 数组可监听
obj2.arr.push(1); // 触发更新
```

---

### 4. Vue 3 的 setup 函数如何工作？
**答案**：  
setup 是 Composition API 的核心入口：  
1. **执行时机**：在 beforeCreate 和 created 之间运行，无 this 绑定。  
2. **参数**：接收 props（只读）和 context（包含 attrs、slots、emit）。  
3. **返回值**：暴露给模板的响应式数据、方法或渲染函数。  
4. **使用方式**：需导入 ref、reactive 等 API，手动管理逻辑。

**解析**：  
setup 替代了 Vue 2 的 data 和 methods，提供统一逻辑入口。props 是响应式的，但不可修改，context 提供组件运行时信息（如 emit 用于事件触发）。返回值自动绑定到模板，渲染函数可替代 template。面试常考 setup 的参数解析和生命周期钩子整合。

**示例代码**：
```javascript
import { ref, onMounted } from 'vue';
export default {
  props: { msg: String },
  setup(props, { emit, attrs, slots }) {
    const count = ref(0);
    const increment = () => {
      count.value++;
      emit('update', count.value); // 触发事件
    };
    onMounted(() => console.log(`Mounted with ${props.msg}`));
    console.log(attrs.id, slots.default); // 访问属性和插槽
    return { count, increment };
  }
};
```

---

### 5. ref 和 reactive 的区别及使用场景？
**答案**：  
- **ref**：包装任意类型（基本类型或对象），通过 .value 访问和修改，提供响应式。  
- **reactive**：仅适用于对象，使用 Proxy 深度监听，直接访问属性。  
- **使用场景**：ref 适合简单值或独立状态，reactive 适合复杂对象和嵌套数据。

**解析**：  
ref 内部通过 Object.defineProperty 包装 value 属性，适合单个状态管理（如计数器）。reactive 使用 Proxy 代理整个对象，深度监听所有属性变化，性能上优于 ref（无需 .value）。但 reactive 不支持基本类型，且解构会丢失响应式（需用 toRefs）。面试常考两者的实现原理和边界场景。

**示例代码**：
```javascript
import { ref, reactive, toRefs } from 'vue';
export default {
  setup() {
    const count = ref(0); // 基本类型
    const obj = ref({ name: 'Alice' }); // 对象
    const state = reactive({ count: 0, nested: { name: 'Bob' } });
    
    count.value++; // 修改 ref
    state.count++; // 修改 reactive
    state.nested.name = 'Charlie'; // 深度响应
    
    const { count: stateCount } = toRefs(state); // 解构保持响应式
    return { count, obj, state, stateCount };
  }
};
```

---

### 6. Vue 3 如何处理生命周期钩子？
**答案**：  
Vue 3 在 Composition API 中通过 onXXX 函数处理生命周期，如 onMounted、onUnmounted 等，需从 'vue' 导入，在 setup 中调用。

**解析**：  
Vue 2 的生命周期钩子（如 mounted）直接写在组件对象中，Vue 3 将其转为函数形式，支持在 setup 中按需使用。每个钩子对应特定阶段（如 onBeforeMount 在挂载前），可多次调用，逻辑更灵活。面试常考如何转换 Vue 2 代码和钩子执行顺序。

**示例代码**：
```javascript
import { ref, onMounted, onUnmounted, onBeforeUpdate } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onMounted(() => console.log('Mounted'));
    onBeforeUpdate(() => console.log('Before update'));
    onUnmounted(() => console.log('Unmounted'));
    return { count };
  }
};
```

---

### 7. watch 和 watchEffect 的区别及使用场景？
**答案**：  
- **watch**：显式监听指定数据源，需定义依赖和回调，支持旧值和新值对比。  
- **watchEffect**：自动追踪依赖，立即执行，适合副作用处理。  
- **使用场景**：watch 用于精确监听（如表单提交），watchEffect 用于动态依赖（如日志）。

**解析**：  
watch 提供细粒度控制，可指定 immediate 和 deep 选项，适合特定场景。watchEffect 无需手动指定依赖，运行时收集，性能优但可能执行不必要的副作用。面试常考两者的依赖追踪原理和性能差异。

**示例代码**：
```javascript
import { ref, watch, watchEffect } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const name = ref('Alice');
    
    watch(count, (newVal, oldVal) => {
      console.log(`Count changed from ${oldVal} to ${newVal}`);
    }, { immediate: true });
    
    watchEffect(() => {
      console.log(`Effect ran with count: ${count.value}, name: ${name.value}`);
    });
    
    return { count, name };
  }
};
```

---

### 8. Vue 3 如何实现双向绑定？
**答案**：  
Vue 3 通过 v-model 实现双向绑定，底层基于 ref/reactive，组件需接收 modelValue prop 并触发 update:modelValue 事件。

**解析**：  
v-model 是 :value 和 @input 的语法糖，Vue 3 支持多个 v-model（如 v-model:foo），组件需遵循规范。自定义修饰符通过 props.modelModifiers 传递。面试常考自定义组件的双向绑定实现和原理。

**示例代码**：
```vue
<!-- 父组件 -->
<template>
  <CustomInput v-model="text" v-model:extra="extra" />
</template>
<script setup>
import { ref } from 'vue';
const text = ref('');
const extra = ref('');
</script>

<!-- 子组件 CustomInput.vue -->
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script setup>
defineProps(['modelValue', 'extra']);
defineEmits(['update:modelValue', 'update:extra']);
</script>
```

---

### 9. Vue 3 的 Teleport 组件有什么作用？
**答案**：  
Teleport 将子节点渲染到指定 DOM 位置，保留组件上下文，适合模态框、通知等全局组件。

**解析**：  
通过 to 属性指定目标（如 'body' 或 '#modal'），解决层级问题（如 z-index）和样式隔离。Teleport 子树仍保留响应式和事件绑定。面试常考其实现原理和与普通 DOM 操作的区别。

**示例代码**：
```vue
<template>
  <button @click="show = true">Open Modal</button>
  <Teleport to="body" v-if="show">
    <div class="modal" @click="show = false">
      <p>Modal Content</p>
    </div>
  </Teleport>
</template>
<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>
<style>
.modal { position: fixed; top: 0; left: 0; }
</style>
```

---

### 10. Vue 3 的 Suspense 组件如何使用？
**答案**：  
Suspense 处理异步组件或数据加载，提供 #default 和 #fallback 插槽，显示加载状态。

**解析**：  
结合 defineAsyncComponent 或 Promise，Suspense 捕获子组件的异步操作，渲染 fallback 直到完成。支持嵌套，面试常考其与异步组件的协作和错误处理。

**示例代码**：
```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
const AsyncComponent = defineAsyncComponent({
  loader: () => new Promise((resolve) => {
    setTimeout(() => resolve(import('./Async.vue')), 1000);
  }),
  errorComponent: ErrorComp,
  timeout: 2000
});
</script>
```

---

### 11. Vue 3 的 v-model 有哪些变化？
**答案**：  
Vue 3 的 v-model 支持多绑定，组件使用 modelValue/update:modelValue 替代 value/input，移除 .sync 修饰符。

**解析**：  
Vue 2 的 v-model 单一绑定，Vue 3 允许多个（如 v-model:foo），通过 props 和 emits 实现。修饰符通过 modelModifiers 传递，增强灵活性。面试常考多 v-model 的实现和向下兼容。

**示例代码**：
```vue
<!-- 父组件 -->
<CustomInput v-model:title="title" v-model:content="content" />
<script setup>
import { ref } from 'vue';
const title = ref('');
const content = ref('');
</script>

<!-- 子组件 -->
<template>
  <input :value="title" @input="$emit('update:title', $event.target.value)" />
</template>
<script setup>
defineProps(['title', 'content']);
defineEmits(['update:title', 'update:content']);
</script>
```

---

### 12. 如何在 Vue 3 中创建自定义指令？
**答案**：  
通过 app.directive 或组件 directive 选项定义，包含钩子（如 mounted、updated）。

**解析**：  
自定义指令操作 DOM 或绑定逻辑，Vue 3 提供 el、binding 等参数。钩子与生命周期对应，面试常考权限控制或聚焦的实现。

**示例代码**：
```javascript
import { createApp } from 'vue';
const app = createApp({});
app.directive('focus', {
  mounted(el, binding) {
    el.focus();
    if (binding.value) console.log(binding.value); // 参数
  },
  updated(el) { el.focus(); }
});

// 使用
<input v-focus="true" />;
```

---

### 13. provide 和 inject 在 Vue 3 中的作用？
**答案**：  
provide 在父组件提供数据，inject 在子组件注入，实现跨层级通信，支持响应式。

**解析**：  
Vue 2 的 provide/inject 是静态的，Vue 3 支持 ref/reactive，数据变更可触发更新。适合配置共享（如主题），面试常考其与 props 的区别和响应式实现。

**示例代码**：
```vue
<!-- 父组件 -->
<script setup>
import { ref, provide } from 'vue';
const theme = ref('light');
provide('theme', theme);
const toggle = () => theme.value = theme.value === 'light' ? 'dark' : 'light';
</script>

<!-- 子组件 -->
<script setup>
import { inject } from 'vue';
const theme = inject('theme');
</script>
<template>
  <div :class="theme">Content</div>
</template>
```

---

### 14. shallowRef 和 shallowReactive 的使用场景？
**答案**：  
- **shallowRef**：只监听 .value 变化，嵌套对象非响应式。  
- **shallowReactive**：只监听第一层属性，深层非响应式。  
- **场景**：优化性能，处理大数据或第三方库对象。

**解析**：  
shallowRef/shallowReactive 减少深层 Proxy 开销，适用于不需响应式嵌套的场景。面试常考其与 ref/reactive 的性能对比和边界处理。

**示例代码**：
```javascript
import { shallowRef, shallowReactive } from 'vue';
const obj = shallowRef({ nested: { count: 0 } });
obj.value.nested.count = 1; // 不触发

const state = shallowReactive({ nested: { count: 0 } });
state.nested.count = 1; // 不触发
state.nested = { count: 1 }; // 触发
```

---

### 15. 如何在 Vue 3 中处理错误？
**答案**：  
- **异步错误**：使用 try/catch 或 Promise.catch。  
- **组件错误**：通过 onErrorCaptured 捕获子组件异常。  
- **全局错误**：配置 app.config.errorHandler。

**解析**：  
Vue 3 提供多层次错误处理，onErrorCaptured 返回 true 可阻止传播，errorHandler 捕获未处理错误。面试常考错误管理的完整链路。

**示例代码**：
```javascript
import { onErrorCaptured } from 'vue';
export default {
  setup() {
    onErrorCaptured((err, instance, info) => {
      console.error(`Error in ${info}:`, err);
      return true; // 阻止传播
    });
    const fetchData = async () => {
      try {
        await fetch('/api');
      } catch (e) {
        console.error(e);
      }
    };
    return { fetchData };
  }
};

// 全局
app.config.errorHandler = (err) => console.error('Global:', err);
```

---

### 16. Vue 3 的响应式系统原理是什么？
**答案**：  
Vue 3 的响应式基于 Proxy 和 Effect：  
1. **Proxy**：拦截 get/set 操作，监听对象变化。  
2. **Effect**：收集依赖（get 时记录），触发更新（set 时执行）。  
3. **调度**：通过调度器（如 queueJob）管理更新队列。

**解析**：  
Proxy 在 get 时将副作用函数存入依赖表（WeakMap），set 时遍历执行。Effect 是响应式核心，调度器避免重复更新。相比 Vue 2 的 defineProperty，Proxy 无需递归，效率更高。面试常考依赖收集和触发流程。

**示例代码**：
```javascript
import { reactive, effect } from 'vue';
const state = reactive({ count: 0 });
effect(() => console.log(state.count)); // 收集依赖
state.count++; // 触发更新
```

---

### 17. 如何使用 markRaw 和 toRaw？
**答案**：  
- **markRaw**：标记对象为非响应式，跳过 Proxy 包装。  
- **toRaw**：从响应式对象获取原始对象，去除 Proxy。

**解析**：  
markRaw 用于性能优化（如第三方库对象），toRaw 用于调试或需要原始数据的场景。两者都不影响原始对象，面试常考其在复杂对象中的应用。

**示例代码**：
```javascript
import { reactive, markRaw, toRaw } from 'vue';
const raw = { data: 1 };
const marked = markRaw(raw);
const state = reactive(marked); // 不响应
state.data = 2; // 无更新

const obj = reactive({ count: 0 });
const rawObj = toRaw(obj); // { count: 0 }
rawObj.count = 1; // 不影响 obj
```

---

### 18. Vue 3 的 script setup 语法如何使用？
**答案**：  
`<script setup>` 是 Composition API 的语法糖，自动导入 API，顶层变量和函数直接暴露，无需显式 return。

**解析**：  
相比传统 setup，它简化代码，props 和 emits 通过 defineProps/defineEmits 定义。编译时转为标准 setup 代码，性能一致。面试常考其与传统 setup 的转换。

**示例代码**：
```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
defineProps(['msg']);
defineEmits(['update']);
</script>
<template>
  <div>{{ count }} {{ msg }}</div>
  <button @click="increment">Add</button>
</template>
```

---

### 19. defineExpose 在 script setup 中的作用？
**答案**：  
defineExpose 暴露组件实例的属性或方法，供父组件通过 ref 调用，解决 `<script setup>` 默认私有问题。

**解析**：  
`<script setup>` 不自动暴露内部状态，defineExpose 提供显式接口。面试常考父子通信的高级用法。

**示例代码**：
```vue
<!-- 子组件 -->
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
defineExpose({ count, increment });
</script>

<!-- 父组件 -->
<template>
  <Child ref="childRef" />
  <button @click="childRef.increment()">Add</button>
</template>
<script setup>
import { ref } from 'vue';
import Child from './Child.vue';
const childRef = ref(null);
</script>
```

---

### 20. 如何实现 Vue 3 的自定义渲染函数？
**答案**：  
使用 h 函数创建 VNode，替代 template，手动控制渲染逻辑。

**解析**：  
h 函数接收标签、属性和子节点，适合动态渲染或无模板场景。Vue 3 的编译器将 template 转为 h 调用，面试常考其底层原理。

**示例代码**：
```javascript
import { h } from 'vue';
export default {
  props: ['items'],
  render() {
    return h('ul', this.items.map(item =>
      h('li', { class: 'item' }, item)
    ));
  }
};
```

---

### 21. Vue 3 的虚拟 DOM 如何优化性能？
**答案**：  
Vue 3 通过以下方式优化虚拟 DOM：  
1. **静态提升**：编译时将静态节点提升至顶层，避免重复创建。  
2. **Patch Flags**：标记动态节点，缩小 Diff 范围。  
3. **高效 Diff**：优化算法，仅对比标记节点。

**解析**：  
静态提升减少运行时 VNode 创建，Patch Flags（如 TEXT、CLASS）标识变化类型，Diff 算法跳过静态部分，提升更新效率。面试常考编译器优化细节。

**示例代码**：
```vue
<template>
  <div static>Static</div>
  <div>{{ dynamic }}</div> <!-- Patch Flag: TEXT -->
</template>
<!-- 编译后 -->
render() {
  return [h('div', 'Static'), h('div', {}, this.dynamic)];
}
```

---

### 22. 如何在 Vue 3 中处理异步组件？
**答案**：  
使用 defineAsyncComponent 定义异步组件，支持 loader、loadingComponent 和 errorComponent，结合 Suspense 使用。

**解析**：  
异步组件延迟加载，优化首屏速度。defineAsyncComponent 返回 Promise，Suspense 提供加载和错误状态。面试常考其与懒加载的结合。

**示例代码**：
```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComp />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent({
  loader: () => import('./Async.vue'),
  loadingComponent: { template: '<div>Loading...</div>' },
  errorComponent: { template: '<div>Error</div>' },
  delay: 200,
  timeout: 3000
});
</script>
```

---

### 23. Vue 3 的编译时优化有哪些？
**答案**：  
1. **静态提升**：静态节点提升至顶层。  
2. **Patch Flags**：标记动态节点类型。  
3. **Tree-Shaking**：移除未用代码。  
4. **块级追踪**：将模板分为动态块，优化更新。

**解析**：  
编译器分析模板，生成高效渲染函数。静态提升避免重复创建 VNode，Patch Flags 减少 Diff 开销，Tree-Shaking 依赖 ESM，块级追踪将动态部分分组。面试常考优化原理和效果。

**示例代码**：
```vue
<template>
  <div class="static">Hello</div>
  <div>{{ count }}</div>
</template>
<!-- 编译后 -->
const _hoisted_1 = h('div', { class: 'static' }, 'Hello');
render() { return [_hoisted_1, h('div', this.count)]; }
```

---

### 24. 如何在 Vue 3 中实现组件通信？
**答案**：  
1. **Props/Events**：父子通信。  
2. **Provide/Inject**：跨层级通信。  
3. **Pinia**：全局状态管理。  
4. **Event Bus**：自定义事件总线（不推荐）。

**解析**：  
Props 向下传递，events 向上触发，适合简单场景。Provide/Inject 支持响应式，适合深层组件。Pinia 是官方推荐的状态管理，Event Bus 在 Vue 3 中因移除 $emit 已不推荐。面试常考通信方式的选择和实现。

**示例代码**：
```javascript
// Props/Events
<Child :data="parentData" @update="handleUpdate" />
const handleUpdate = (val) => parentData.value = val;

// Provide/Inject
provide('config', ref('value'));
const config = inject('config');
```

---

### 25. Vue 3 的 slots 和 scoped slots 如何使用？
**答案**：  
- **Slots**：通过 <slot> 传递内容，支持具名插槽。  
- **Scoped Slots**：通过 v-slot 传递子组件数据，增强复用性。

**解析**：  
Slots 提供内容插槽，具名插槽（如 v-slot:header）区分多个插槽。Scoped Slots 通过绑定数据（如 :data）实现动态渲染。面试常考其与 props 的区别和复杂场景。

**示例代码**：
```vue
<!-- 父组件 -->
<Child>
  <template v-slot:header="{ item }">
    <h1>{{ item.name }}</h1>
  </template>
</Child>

<!-- 子组件 -->
<template>
  <slot name="header" :item="data" />
</template>
<script setup>
import { ref } from 'vue';
const data = ref({ name: 'Alice' });
</script>
```

---

## 二、Vite 相关 (26-40)

### 26. Vite 是什么？它与 Vue 3 的关系？
**答案**：  
Vite 是基于 ES Modules 的现代构建工具，提供快速开发和构建体验，与 Vue 3 的现代特性（如 ESM、Tree-Shaking）高度契合，是 Vue 3 的推荐工具。

**解析**：  
Vite 利用浏览器原生 ESM 支持，开发时无需打包，启动速度秒级，HMR（热模块替换）效率高。生产环境使用 Rollup 打包，支持 Vue 3 的编译时优化（如静态提升）。相比 Webpack，Vite 配置简单，生态与 Vue 3 无缝衔接。面试常考其工作原理和优势。

**示例代码**：
```bash
npm create vite@latest my-vue-app --template vue
cd my-vue-app
npm install
npm run dev
```

---

### 27. Vite 如何提升开发体验？
**答案**：  
1. **即时启动**：基于 ESM，无需打包整个项目。  
2. **高效 HMR**：只更新修改模块，速度快。  
3. **预构建依赖**：将 CommonJS 转为 ESM，缓存优化。  
4. **轻量配置**：默认支持 Vue、TS，无需复杂 loader。

**解析**：  
Vite 的 dev server 通过 HTTP 请求加载模块，浏览器解析 ESM，启动时间从 Webpack 的秒级降至毫秒级。HMR 通过 WebSocket 推送更新，仅重载变更部分。预构建解决依赖兼容性问题，缓存到 node_modules/.vite。面试常考其与传统工具的对比。

**示例代码**：
```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');
```

---

### 28. 如何在 Vite 中配置 Vue 3 项目？
**答案**：  
创建 vite.config.js，添加 @vitejs/plugin-vue，配置路径别名、端口、优化选项等。

**解析**：  
Vite 默认支持 Vue 文件，插件提供编译支持。配置项包括 resolve.alias（路径别名）、server.port（开发端口）、build.rollupOptions（生产优化）。面试常考配置文件的结构和作用。

**示例代码**：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': '/src' }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

---

### 29. Vite 的预构建依赖是什么？
**答案**：  
Vite 在首次启动时将 CommonJS 或 UMD 依赖转为 ESM，缓存到 node_modules/.vite，提升加载速度。

**解析**：  
浏览器不支持 CommonJS，Vite 通过 esbuild 预构建依赖（如 lodash），生成 ESM 格式，缓存避免重复编译。修改依赖需 --force 重新构建。面试常考其作用和实现。

**示例代码**：
```bash
npm run dev -- --force # 强制预构建
```

---

### 30. Vite 和 Webpack 的区别？
**答案**：  
- **开发模式**：Vite 使用 ESM，无需打包；Webpack 打包整个项目。  
- **启动速度**：Vite 秒级启动，Webpack 较慢。  
- **HMR**：Vite 更快，Webpack 需配置。  
- **生产构建**：Vite 用 Rollup，Webpack 自带打包。  
- **配置**：Vite 简单，Webpack 复杂但功能全面。

**解析**：  
Vite 的 ESM 策略适合现代浏览器，开发体验优于 Webpack。但 Webpack 的生态更成熟，支持复杂场景（如 SSR）。面试常考选择依据和优缺点。

---

### 31. 如何在 Vite 中实现代码分割？
**答案**：  
使用动态 import，Vite 自动分割 chunk，支持路由懒加载和组件按需加载。

**解析**：  
动态 import 返回 Promise，Vite 在生产构建时生成单独 chunk，减少首屏加载。Rollup 的 manualChunks 可自定义分割。面试常考代码分割的实现和效果。

**示例代码**：
```javascript
// main.js
const Home = () => import('./Home.vue');
const routes = [{ path: '/', component: Home }];

// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ['vue'] } }
    }
  }
};
```

---

### 32. Vite 的 HMR 如何工作？
**答案**：  
Vite 通过 WebSocket 建立客户端-服务端连接，监听文件变化，推送更新模块，浏览器重新加载。

**解析**：  
HMR 只更新修改的 ESM 模块（如 .vue 文件），无需刷新页面。Vue 插件处理组件更新，效率高于 Webpack 的全量重载。面试常考其原理和性能优势。

**示例代码**：
```javascript
// 文件变更后自动触发
import.meta.hot.accept(() => console.log('HMR updated'));
```

---

### 33. 如何在 Vite 中配置 TypeScript？
**答案**：  
创建 tsconfig.json，Vite 内置支持 TS，添加 vue-tsc 检查类型。

**解析**：  
Vite 使用 esbuild 编译 TS，速度快，tsconfig 配置 target、module 等选项。vue-tsc 提供 Vue 文件类型检查。面试常考 TS 配置和错误排查。

**示例代码**：
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve"
  },
  "include": ["src/**/*"]
}
```

---

### 34. Vite 如何处理 CSS？
**答案**：  
支持原生 CSS、CSS Modules、PostCSS 和预处理器（如 SCSS），无需额外 loader。

**解析**：  
Vite 将 CSS 注入 <style> 标签，支持 ?inline 和 ?raw 导入。CSS Modules 自动生成唯一类名，预处理器需安装（如 sass）。面试常考样式管理的实现。

**示例代码**：
```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: { additionalData: '$color: #fff;' }
    }
  }
};

// main.js
import './style.css'; // 普通 CSS
import styles from './style.module.css'; // CSS Modules
```

---

### 35. 如何在 Vite 中优化生产构建？
**答案**：  
1. **压缩**：启用 minify（如 terser）。  
2. **分割**：配置 rollupOptions.output.manualChunks。  
3. **CDN**：external 排除依赖。  
4. **分析**：使用 rollup-plugin-visualizer。

**解析**：  
Terser 压缩 JS，manualChunks 分割 vendor 和 app，external 配合 CDN 减少体积，visualizer 分析 bundle 结构。面试常考生产环境的完整优化流程。

**示例代码**：
```javascript
import { visualizer } from 'rollup-plugin-visualizer';
export default {
  build: {
    minify: 'terser',
    rollupOptions: {
      external: ['vue'],
      output: { manualChunks: { vendor: ['vue'] } }
    },
    plugins: [visualizer()]
  }
};
```

---

### 36. Vite 的环境变量如何使用？
**答案**：  
通过 .env 文件定义，使用 import.meta.env 访问，支持模式（如 .env.development）。

**解析**：  
Vite 默认只暴露 VITE_ 前缀变量，mode 切换环境（如 dev/production）。面试常考变量管理和安全性。

**示例代码**：
```bash
# .env.development
VITE_API_URL=http://localhost:3000
# .env.production
VITE_API_URL=https://api.example.com
```

```javascript
// main.js
console.log(import.meta.env.VITE_API_URL);
```

---

### 37. 如何在 Vite 中集成 Vue Router？
**答案**：  
安装 vue-router@4，创建路由配置，在 main.js 挂载到 app。

**解析**：  
Vite 无需额外配置，路由懒加载通过动态 import 实现。面试常考路由与 Vite 的协作。

**示例代码**：
```javascript
// router.js
import { createRouter, createWebHistory } from 'vue-router';
const routes = [{ path: '/', component: () => import('./Home.vue') }];
export default createRouter({ history: createWebHistory(), routes });

// main.js
import router from './router';
app.use(router);
```

---

### 38. Vite 如何支持 Vue 3 的 JSX？
**答案**：  
安装 @vitejs/plugin-vue-jsx，配置 vite.config.js，支持 JSX 语法。

**解析**：  
JSX 在函数式组件或复杂渲染中更灵活，Vite 通过插件编译为 h 函数调用。面试常考 JSX 与 template 的对比。

**示例代码**：
```javascript
// vite.config.js
import vueJsx from '@vitejs/plugin-vue-jsx';
export default { plugins: [vue(), vueJsx()] };

// App.jsx
export default {
  render() { return <div>Hello JSX</div>; }
};
```

---

### 39. Vite 的插件机制如何工作？
**答案**：  
通过钩子（如 resolveId、transform）扩展功能，返回插件对象。

**解析**：  
Vite 插件基于 Rollup 插件系统，支持开发和构建阶段的自定义逻辑。面试常考插件开发和调试。

**示例代码**：
```javascript
const myPlugin = () => ({
  name: 'my-plugin',
  resolveId(id) { if (id === 'virtual') return 'virtual-module'; },
  load(id) { if (id === 'virtual-module') return 'export default "Hello"'; },
  transform(code) { return code.replace('foo', 'bar'); }
});
export default { plugins: [myPlugin()] };
```

---

### 40. Vite 如何与 Vue 3 的 Tree-Shaking 配合？
**答案**：  
Vite 使用 Rollup 构建，结合 Vue 3 的 ESM 模块化和 sideEffects 配置，实现 Tree-Shaking。

**解析**：  
Vue 3 的 API（如 ref）按需导入，Rollup 移除未用代码，sideEffects 标记副作用文件。面试常考 Tree-Shaking 的条件和效果。

**示例代码**：
```javascript
// 只导入 ref，未打包 reactive
import { ref } from 'vue';
const count = ref(0);

// package.json
{
  "sideEffects": ["*.css"]
}
```

---

## 三、Pinia 相关 (41-50)

### 41. Pinia 是什么？与 Vuex 的区别？
**答案**：  
- **Pinia**：Vue 3 的状态管理库，轻量、无 mutations，支持 Composition API 和 TypeScript。  
- **Vuex**：Vue 2/3 通用的状态管理，包含 mutations，结构较复杂。  
- **区别**：Pinia 无 mutations，直接修改 state，API 更简洁，性能优于 Vuex。

**解析**：  
Pinia 是 Vue 3 官方推荐的状态管理工具，移除 Vuex 的 mutations 和模块嵌套复杂度，通过 defineStore 定义 store，state 是响应式的。Vuex 的严格模式和繁琐配置在 Pinia 中简化，TypeScript 支持更自然。面试常考两者的设计理念和迁移。

**示例代码**：
```javascript
// Pinia
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: { increment() { this.count++; } }
});

// Vuex
export default {
  state: { count: 0 },
  mutations: { increment(state) { state.count++; } },
  actions: { increment({ commit }) { commit('increment'); } }
};
```

---

### 42. 如何在 Vue 3 中集成 Pinia？
**答案**：  
安装 pinia，创建 store 文件，在 main.js 使用 createPinia 挂载到 app。

**解析**：  
Pinia 提供模块化 store 定义，挂载后全局可用，Vue Devtools 自动支持。面试常考其初始化流程和基本使用。

**示例代码**：
```bash
npm install pinia
```

```javascript
// stores/main.js
import { defineStore } from 'pinia';
export const useMainStore = defineStore('main', {
  state: () => ({ count: 0 })
});

// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

---

### 43. Pinia 的 state 如何定义和访问？
**答案**：  
通过 state 函数返回初始状态，使用 store 实例直接访问或修改，支持响应式。

**解析**：  
state 返回的对象被 reactive 包装，修改触发更新。相比 Vuex 的 mutations，Pinia 直接操作更直观。面试常考 state 的响应式原理。

**示例代码**：
```javascript
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0, user: { name: 'Alice' } }),
  actions: { increment() { this.count++; } }
});

// 使用
import { useStore } from './stores/main';
const store = useStore();
console.log(store.count); // 0
store.increment(); // 1
store.user.name = 'Bob'; // 响应式更新
```

---

### 44. Pinia 的 actions 和 getters 如何使用？
**答案**：  
- **actions**：定义方法，直接修改 state，支持异步。  
- **getters**：定义计算属性，缓存结果，访问如普通属性。

**解析**：  
actions 是普通函数，可调用其他 actions 或异步操作，getters 类似 computed，依赖 state 自动更新。面试常考两者的实现和性能优化。

**示例代码**：
```javascript
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: {
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.count++;
    }
  },
  getters: {
    double: (state) => state.count * 2,
    triple() { return this.count * 3; } // 可访问其他 getters
  }
});

// 使用
const store = useStore();
store.incrementAsync();
console.log(store.double); // 缓存结果
```

---

### 45. 如何在 Pinia 中处理异步操作？
**答案**：  
在 actions 中使用 async/await 或 Promise 调用 API，更新 state。

**解析**：  
Pinia 的 actions 支持异步逻辑，state 修改触发视图更新。相比 Vuex 的 dispatch，Pinia 更直观。面试常考异步数据流的实现。

**示例代码**：
```javascript
export const useStore = defineStore('main', {
  state: () => ({ data: null, loading: false }),
  actions: {
    async fetchData() {
      this.loading = true;
      try {
        const res = await fetch('/api/data');
        this.data = await res.json();
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    }
  }
});

// 使用
const store = useStore();
store.fetchData();
```

---

### 46. Pinia 如何实现模块化？
**答案**：  
通过多个 defineStore 创建独立 store，按功能划分，无需嵌套。

**解析**：  
Pinia 摒弃 Vuex 的模块嵌套，每个 store 是独立的，通过导入实现协作。面试常考大型项目中的状态管理。

**示例代码**：
```javascript
// stores/user.js
export const useUserStore = defineStore('user', {
  state: () => ({ name: 'Alice' })
});

// stores/cart.js
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] })
});

// 使用
const userStore = useUserStore();
const cartStore = useCartStore();
cartStore.items.push(userStore.name);
```

---

### 47. Pinia 的 $subscribe 如何使用？
**答案**：  
$subscribe 监听 state 变化，接收 mutation 和 state 参数，执行回调。

**解析**：  
类似 Vuex 的 subscribe，用于副作用处理（如持久化）。回调在每次 state 变更后触发，面试常考其与 watch 的区别。

**示例代码**：
```javascript
const store = useStore();
store.$subscribe((mutation, state) => {
  console.log(`Count changed to ${state.count}`);
  localStorage.setItem('count', state.count);
});
store.count++;
```

---

### 48. Pinia 的 $patch 如何批量更新？
**答案**：  
$patch 接收对象或函数，批量修改 state，触发一次更新。

**解析**：  
相比逐个修改，$patch 优化性能，适合多属性更新。函数形式支持复杂逻辑。面试常考其性能优势。

**示例代码**：
```javascript
const store = useStore();
// 对象形式
store.$patch({ count: 1, name: 'Alice' });
// 函数形式
store.$patch((state) => {
  state.count++;
  state.name = 'Bob';
});
```

---

### 49. 如何在 Pinia 中集成 TypeScript？
**答案**：  
使用类型声明定义 state、getters 和 actions，支持接口和类型推导。

**解析**：  
Pinia 内置 TS 支持，state 可定义接口，getters/actions 可指定返回类型。面试常考类型安全的实现。

**示例代码**：
```typescript
interface State { count: number; name: string }
export const useStore = defineStore('main', {
  state: () => ({ count: 0, name: 'Alice' } as State),
  getters: {
    double: (state): number => state.count * 2
  },
  actions: {
    increment(): void { this.count++; }
  }
});
```

---

### 50. Pinia 的 devtools 支持如何实现？
**答案**：  
Pinia 自动集成 Vue Devtools，显示 store 列表、状态变化和时间线，无需额外配置。

**解析**：  
通过 Pinia 插件机制，开发时自动注入调试信息，支持检查和修改 state。面试常考调试工具的实际应用。

**示例代码**：
```javascript
// 无需额外代码，安装 Pinia 后自动生效
const store = useStore();
store.count++; // Devtools 显示变化
```

## 四、Vue Router 相关 (51-75)

### 51. Vue Router 4 有哪些新特性？
**答案**：  
Vue Router 4 是 Vue 3 专用的路由库，主要新特性包括：  

1. **Vue 3 兼容**：完全支持 Vue 3 的响应式系统和 Composition API。  
2. **Composition API 集成**：提供 useRouter 和 useRoute 函数。  
3. **动态路由优化**：支持更灵活的动态添加和移除路由。  
4. **TypeScript 支持**：内置类型定义，增强类型安全。  
5. **history 模式增强**：更简洁的 createWebHistory 配置。

**解析**：  
Vue Router 4 移除 Vue 2 的依赖（如 this.$router），通过 Composition API 提供函数式访问（如 useRouter()），动态路由通过 router.addRoute/removeRoute 实现。TypeScript 支持让路由配置更严谨，history 模式基于 HTML5 History API，简化了配置。面试常考其与 Vue Router 3 的迁移和 Composition API 的应用。

**示例代码**：
```javascript
// router.js
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: () => import('./Home.vue') }]
});

// 使用 Composition API
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goHome = () => router.push('/');
    console.log(route.path); // 当前路径
    return { goHome };
  }
};
```

---

### 52. 如何在 Vue 3 中配置 Vue Router？
**答案**：  
安装 vue-router@4，创建路由配置文件，在 main.js 挂载到 Vue 应用，支持 history 或 hash 模式。

**解析**：  
Vue Router 4 需要独立配置路由表，createRouter 接收 history 和 routes 参数。history 模式（如 createWebHistory）适合现代应用，hash 模式（如 createWebHashHistory）兼容性更好。挂载后通过 <router-view> 渲染组件。面试常考路由配置的完整流程和模式选择。

**示例代码**：
```bash
npm install vue-router@4
```

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/about', component: () => import('../views/About.vue') }
];
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const app = createApp(App);
app.use(router);
app.mount('#app');

// App.vue
<router-view />
```

---

### 53. Vue Router 的 history 和 hash 模式的区别？
**答案**：  
- **History 模式**：使用 HTML5 History API，URL 无 #，如 /home，需服务端支持。  
- **Hash 模式**：使用 URL 的 # 部分，如 /#/home，浏览器直接处理，兼容性好。  
- **区别**：History 模式更自然，SEO 友好；Hash 模式无需后端配置。

**解析**：  
History 模式通过 pushState/replaceState 修改 URL，需服务端重定向所有路由到 index.html，否则刷新会 404。Hash 模式通过 hashchange 事件监听，适合静态部署。面试常考两者的实现原理和部署注意事项。

**示例代码**：
```javascript
// History 模式
import { createWebHistory } from 'vue-router';
const router = createRouter({ history: createWebHistory() });

// Hash 模式
import { createWebHashHistory } from 'vue-router';
const router = createRouter({ history: createWebHashHistory() });

// 服务端配置（Nginx 示例）
server {
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

### 54. 如何在 Vue Router 中实现路由懒加载？
**答案**：  
使用动态 import 定义路由组件，Vite/Rollup 自动分割代码。

**解析**：  
动态 import 返回 Promise，构建工具生成单独 chunk，延迟加载组件，减少首屏 JS 体积。Vue 3 和 Vite 原生支持，面试常考其与性能优化的关系。

**示例代码**：
```javascript
const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/about', component: () => import('../views/About.vue') }
];

// 构建后生成单独文件，如 Home.[hash].js
```

---

### 55. Vue Router 的导航守卫如何使用？
**答案**：  
提供全局守卫（beforeEach、afterEach）、路由独享守卫（beforeEnter）和组件内守卫（beforeRouteEnter 等）。

**解析**：  
beforeEach 在导航前执行，适合权限校验；afterEach 在导航后执行，适合埋点；beforeRouteEnter 在组件渲染前调用，访问不到 this。守卫通过 next() 控制导航流程。面试常考守卫的执行顺序和应用场景。

**示例代码**：
```javascript
// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});

// 路由独享守卫
const routes = [{
  path: '/admin',
  component: Admin,
  beforeEnter: (to, from, next) => {
    next(localStorage.getItem('role') === 'admin');
  }
}];

// 组件内守卫
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => vm.initData());
  }
};
```

---

### 56. 如何在 Vue Router 中处理动态路由？
**答案**：  
使用 :param 定义动态参数，通过 route.params 访问，支持正则匹配。

**解析**：  
动态路由如 /user/:id 匹配任意 ID，params 是响应式的。正则（如 :id(\\d+)）限制参数类型，面试常考参数处理和动态添加路由。

**示例代码**：
```javascript
const routes = [
  { path: '/user/:id', component: User },
  { path: '/post/:id(\\d+)', component: Post } // 只匹配数字
];

// 使用
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    console.log(route.params.id); // 动态参数
  }
};

// 动态添加
router.addRoute({ path: '/new/:id', component: New });
```

---

### 57. Vue Router 的 meta 字段有什么作用？
**答案**：  
meta 字段存储路由元信息，如权限、标题、缓存配置，供守卫或组件使用。

**解析**：  
meta 是自定义对象，导航守卫可根据其值控制逻辑，组件可动态读取。面试常考 meta 在权限管理和 SEO 中的应用。

**示例代码**：
```javascript
const routes = [{
  path: '/dashboard',
  component: Dashboard,
  meta: { auth: true, title: 'Dashboard' }
}];

router.beforeEach((to) => {
  document.title = to.meta.title || 'Default';
  return to.meta.auth ? checkAuth() : true;
});
```

---

### 58. 如何在 Vue Router 中实现路由动画？
**答案**：  
使用 <transition> 包裹 <router-view>，定义 CSS 或 JS 动画。

**解析**：  
Vue 的 transition 组件支持 enter/leave 钩子，结合路由 meta 可实现条件动画。面试常考动画实现和性能考虑。

**示例代码**：
```vue
<template>
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>
<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
```

---

### 59. Vue Router 的 useRoute 和 useRouter 区别？
**答案**：  
- **useRoute**：返回当前路由对象（响应式），访问 path、params 等。  
- **useRouter**：返回路由实例，调用 push、replace 等方法。

**解析**：  
useRoute 用于读取路由信息，useRouter 用于导航操作，两者是 Composition API 的核心。面试常考其在 setup 中的使用。

**示例代码**：
```javascript
import { useRoute, useRouter } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id; // 获取参数
    const goBack = () => router.back(); // 返回
    return { id, goBack };
  }
};
```

---

### 60. 如何在 Vue Router 中处理 404？
**答案**：  
添加通配符路由 { path: '/:pathMatch(.*)*' }，渲染 NotFound 组件。

**解析**：  
Vue Router 4 使用 :pathMatch(.*)* 替代 Vue 3 的 *，捕获所有未匹配路径。面试常考 404 路由的配置和优先级。

**示例代码**：
```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];
```

---

### 61. Vue Router 如何与 Pinia 协作？
**答案**：  
在守卫或组件中访问 Pinia store，同步路由和状态。

**解析**：  
路由守卫可根据 store 状态控制导航，组件可根据路由更新 store。面试常考状态与路由的联动。

**示例代码**：
```javascript
import { useAuthStore } from './stores/auth';
router.beforeEach((to) => {
  const authStore = useAuthStore();
  return to.meta.auth && !authStore.isLoggedIn ? '/login' : true;
});

// 组件
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useAuthStore();
store.userId = route.params.id;
```

---

### 62. 如何在 Vue Router 中实现嵌套路由？
**答案**：  
在 routes 中定义 children 属性，使用嵌套 <router-view>。

**解析**：  
嵌套路由支持层级页面，children 的 path 是相对父路由的。面试常考嵌套结构的配置和渲染。

**示例代码**：
```javascript
const routes = [{
  path: '/user',
  component: User,
  children: [
    { path: 'profile', component: Profile },
    { path: 'settings', component: Settings }
  ]
}];

// User.vue
<router-view />
```

---

### 63. Vue Router 的 scrollBehavior 如何使用？
**答案**：  
定义 scrollBehavior 函数，返回滚动位置（如 { top: 0 }）。

**解析**：  
scrollBehavior 控制导航后的滚动行为，支持保存位置或自定义逻辑。面试常考其与 SPA 体验的关系。

**示例代码**：
```javascript
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition; // 恢复位置
    if (to.hash) return { el: to.hash }; // 锚点
    return { top: 0 }; // 默认顶部
  }
});
```

---

### 64. 如何在 Vue Router 中实现路由预加载？
**答案**：  
在守卫或组件中提前 import 组件，配合 Promise 加载。

**解析**：  
预加载减少用户等待时间，适合关键页面。面试常考预加载策略和性能权衡。

**示例代码**：
```javascript
router.beforeEach(async (to, from, next) => {
  if (to.path === '/important') {
    await import('../views/Important.vue');
  }
  next();
});
```

---

### 65. Vue Router 如何处理路由参数变化？
**答案**：  
使用 watch 监听 route.params 或 onBeforeRouteUpdate 钩子。

**解析**：  
路由参数变化不触发组件重渲染，需手动响应。onBeforeRouteUpdate 在组件内监听，watch 更灵活。面试常考参数更新的处理。

**示例代码**：
```javascript
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    
    onBeforeRouteUpdate((to) => {
      id.value = to.params.id;
    });
    
    watch(() => route.params.id, (newId) => {
      id.value = newId;
    });
    
    return { id };
  }
};
```

---

## 五、性能优化 (66-90)

### 66. Vue 3 项目常见的性能瓶颈有哪些？
**答案**：  
1. **大型列表渲染**：过多 DOM 节点导致卡顿。  
2. **频繁更新**：响应式数据滥用触发不必要渲染。  
3. **未优化 API 请求**：阻塞首屏加载。  
4. **过大 bundle**：未分割代码或未压缩资源。  
5. **复杂组件逻辑**：计算属性或事件处理耗时。

**解析**：  
性能瓶颈源于渲染、计算和网络开销。大型列表可用虚拟滚动，频繁更新需控制依赖，未优化请求需异步加载，bundle 过大需 Tree-Shaking 和懒加载。面试常考瓶颈定位和优化思路。

---

### 67. 如何优化 Vue 3 项目的大型列表？
**答案**：  
1. **虚拟列表**：使用 vue-virtual-scroller，仅渲染可视区域。  
2. **分页加载**：分批请求数据。  
3. **key 优化**：为 v-for 添加唯一 key。

**解析**：  
虚拟列表通过计算可视区域渲染少量 DOM，分页减少初次加载量，key 确保 Diff 算法高效。面试常考虚拟列表的实现原理和配置。

**示例代码**：
```vue
<template>
  <virtual-scroller :items="items" :item-height="30">
    <template v-slot="{ item }">
      <div>{{ item.name }}</div>
    </template>
  </virtual-scroller>
</template>
<script setup>
import VirtualScroller from 'vue-virtual-scroller';
const items = ref(Array(10000).fill().map((_, i) => ({ id: i, name: `Item ${i}` })));
</script>
```

---

### 68. 如何在 Vue 3 中实现懒加载？
**答案**：  
1. **路由懒加载**：动态 import 路由组件。  
2. **组件懒加载**：defineAsyncComponent。  
3. **图片懒加载**：使用 loading="lazy" 或 IntersectionObserver。

**解析**：  
懒加载延迟加载非关键资源，路由和组件通过 Promise 分割代码，图片使用浏览器原生支持或自定义逻辑。面试常考懒加载的实现和首屏优化。

**示例代码**：
```javascript
// 路由懒加载
const routes = [{ path: '/', component: () => import('./Home.vue') }];

// 组件懒加载
const LazyComp = defineAsyncComponent(() => import('./Comp.vue'));

// 图片懒加载
<img src="large.jpg" loading="lazy" />;
```

---

### 69. 如何在 Vue 3 中使用代码分割？
**答案**：  
结合 Vite/Rollup，使用动态 import 分割路由、组件或库。

**解析**：  
动态 import 生成单独 chunk，Vite 的 rollupOptions.manualChunks 自定义分割策略，减少首屏 JS 体积。面试常考代码分割的配置和效果。

**示例代码**：
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['vue', 'vue-router'] }
      }
    }
  }
};

// 路由
const Home = () => import('./Home.vue');
```

---

### 70. keep-alive 在 Vue 3 中的性能优化作用？
**答案**：  
keep-alive 缓存组件实例，避免重复渲染，支持 include/exclude/max 配置。

**解析**：  
缓存 DOM 和状态，切换时直接复用，减少创建/销毁开销。max 限制缓存数量，面试常考其与路由的结合。

**示例代码**：
```vue
<keep-alive include="Home,About" max="10">
  <router-view />
</keep-alive>
```

---

### 71. 如何优化 Vue 3 的首屏加载速度？
**答案**：  
1. **路由懒加载**：延迟加载非首屏组件。  
2. **预渲染/SSR**：生成静态 HTML。  
3. **CDN 加速**：托管静态资源。  
4. **Tree-Shaking**：移除未用代码。  
5. **异步组件**：分担首屏压力。

**解析**：  
首屏速度影响用户体验，懒加载和异步组件减少 JS 体积，SSR/预渲染提供初始内容，CDN 降低延迟。面试常考优化组合和实施。

**示例代码**：
```javascript
// 预渲染（Vite 插件）
import vuePrerender from 'vite-plugin-prerender';
export default { plugins: [vuePrerender({ routes: ['/'] })] };
```

---

### 72. v-once 和 v-memo 在 Vue 3 中的作用？
**答案**：  
- **v-once**：组件或元素只渲染一次，不随数据更新。  
- **v-memo**：缓存条件渲染，仅依赖变化时更新。

**解析**：  
v-once 适合静态内容，v-memo 类似 React.memo，优化动态但不频繁更新的部分。面试常考其与渲染优化的关系。

**示例代码**：
```vue
<div v-once>{{ staticData }}</div>
<div v-memo="[value1, value2]">{{ computedData }}</div>
```

---

### 73. 如何优化 Vue 3 的计算属性？
**答案**：  
1. **明确依赖**：仅依赖必要数据。  
2. **避免复杂计算**：拆分或移到方法。  
3. **缓存利用**：依赖不变时复用结果。

**解析**：  
计算属性自动缓存，优于方法调用，但复杂逻辑可能阻塞渲染。面试常考其与 watch 的性能对比。

**示例代码**：
```javascript
import { computed } from 'vue';
const count = ref(0);
const double = computed(() => count.value * 2); // 缓存
```

---

### 74. 如何在 Vue 3 中实现按需加载？
**答案**：  
1. **组件**：defineAsyncComponent。  
2. **库**：按需导入（如 Element Plus）。  
3. **路由**：动态 import。

**解析**：  
按需加载减少初始加载量，需配合构建工具配置（如 Vite 的 import）。面试常考第三方库的按需引入。

**示例代码**：
```javascript
// Element Plus 按需加载
import { ElButton } from 'element-plus';
app.component(ElButton.name, ElButton);
```

---

### 75. 如何优化 Vue 3 项目中的图片资源？
**答案**：  
1. **格式优化**：使用 WebP/AVIF。  
2. **懒加载**：loading="lazy" 或 IntersectionObserver。  
3. **CDN 托管**：加速加载。  
4. **压缩**：构建时处理（如 vite-plugin-imagemin）。

**解析**：  
图片占资源大头，WebP 体积小，懒加载延迟非首屏图片，CDN 减少延迟。面试常考图片优化的完整流程。

**示例代码**：
```vue
<img src="image.webp" loading="lazy" />
```

```javascript
// vite.config.js
import imagemin from 'vite-plugin-imagemin';
export default { plugins: [imagemin()] };
```

---

### 76. 如何在 Vue 3 中减少不必要的重新渲染？
**答案**：  
1. **v-once/v-memo**：限制更新范围。  
2. **shallowRef**：减少深层响应。  
3. **shouldComponentUpdate**：自定义更新逻辑。  
4. **key**：优化 v-for Diff。

**解析**：  
Vue 3 的响应式可能触发多余渲染，v-once/v-memo 控制静态部分，shallowRef 限制深度，key 确保高效更新。面试常考渲染优化的细节。

**示例代码**：
```javascript
const data = shallowRef({ nested: { count: 0 } });
data.value.nested.count = 1; // 不触发
```

---

### 77. Vue 3 的 SSR 如何提升性能？
**答案**：  
1. **预取数据**：asyncData 或 fetch 提前加载。  
2. **缓存**：页面级或组件级缓存。  
3. **静态生成**：nuxt generate 替代动态 SSR。

**解析**：  
SSR 提升首屏速度和 SEO，预取减少客户端请求，缓存（如 redis）降低服务端压力，静态生成适合内容不变的页面。面试常考 SSR 的实现和优化。

**示例代码**：
```javascript
export default {
  asyncData() {
    return fetch('/api').then(res => res.json());
  }
};
```

---

### 78. 如何在 Vue 3 中优化事件监听？
**答案**：  
1. **防抖/节流**：减少高频触发（如 lodash）。  
2. **移除监听**：onUnmounted 清理。  
3. **事件委托**：绑定到父元素。

**解析**：  
高频事件（如 scroll）影响性能，防抖/节流控制频率，清理避免内存泄漏，委托减少监听器数量。面试常考事件管理的实现。

**示例代码**：
```javascript
import { onMounted, onUnmounted } from 'vue';
import { debounce } from 'lodash';
export default {
  setup() {
    const handleScroll = debounce(() => console.log('scroll'), 200);
    onMounted(() => window.addEventListener('scroll', handleScroll));
    onUnmounted(() => window.removeEventListener('scroll', handleScroll));
  }
};
```

---

### 79. 如何在 Vue 3 项目中使用 CDN？
**答案**：  
1. **HTML 引入**：index.html 添加 CDN 链接。  
2. **Vite 配置**：external 排除依赖。  
3. **动态加载**：script 标签注入。

**解析**：  
CDN 减少本地 bundle 体积，需确保版本兼容和回退机制。面试常考 CDN 配置和部署。

**示例代码**：
```html
<!-- index.html -->
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
```

```javascript
// vite.config.js
export default {
  build: { rollupOptions: { external: ['vue'] } }
};
```

---

### 80. 如何分析和优化 Vue 3 项目的打包体积？
**答案**：  
1. **分析工具**：vite-bundle-analyzer 或 rollup-plugin-visualizer。  
2. **Tree-Shaking**：移除未用代码。  
3. **按需加载**：动态 import 和库按需引入。  
4. **压缩**：terser 和 imagemin。

**解析**：  
分析工具生成可视化报告，定位大文件；Tree-Shaking 依赖 ESM，按需加载分割代码，压缩减少体积。面试常考体积优化的完整流程。

**示例代码**：
```javascript
import { visualizer } from 'rollup-plugin-visualizer';
export default {
  plugins: [visualizer({ open: true })],
  build: { minify: 'terser' }
};
```

---

### 81. 如何在 Vue 3 中优化表单性能？
**答案**：  
1. **懒绑定**：v-model.lazy 减少更新。  
2. **防抖**：输入事件延迟处理。  
3. **分片渲染**：复杂表单分组件加载。

**解析**：  
表单频繁输入触发渲染，懒绑定和防抖降低频率，分片减少单次渲染开销。面试常考表单优化的实现。

**示例代码**：
```vue
<input v-model.lazy="form.name" @input="debounce(save, 300)" />
<script setup>
import { ref } from 'vue';
import { debounce } from 'lodash';
const form = ref({ name: '' });
const save = debounce(() => console.log(form.value), 300);
</script>
```

---

### 82. 如何在 Vue 3 中优化组件加载？
**答案**：  
1. **异步组件**：defineAsyncComponent 延迟加载。  
2. **Suspense**：提供加载状态。  
3. **条件渲染**：v-if 控制加载时机。

**解析**：  
异步组件分割代码，Suspense 提升体验，条件渲染避免不必要加载。面试常考组件优化的策略。

**示例代码**：
```vue
<Suspense>
  <template #default>
    <AsyncComp v-if="ready" />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
<script setup>
const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'));
const ready = ref(false);
setTimeout(() => ready.value = true, 1000);
</script>
```

---

### 83. 如何在 Vue 3 中优化大型项目的构建时间？
**答案**：  
1. **并行构建**：Vite 的 esbuild 加速。  
2. **缓存**：利用 Vite 依赖缓存。  
3. **分割模块**：manualChunks 和懒加载。  
4. **移除冗余**：Tree-Shaking 和 dead code elimination。

**解析**：  
构建时间影响开发效率，esbuild 比 tsc 快 10-100 倍，缓存复用预构建结果，分割减少单次编译量。面试常考构建优化的工具和配置。

**示例代码**：
```javascript
export default {
  build: {
    rollupOptions: { output: { manualChunks: { vendor: ['vue'] } } }
  }
};
```

---

### 84. 如何在 Vue 3 中优化内存使用？
**答案**：  
1. **清理监听**：onUnmounted 移除事件。  
2. **浅层响应**：shallowRef/shallowReactive。  
3. **销毁组件**：v-if 替代 v-show。  
4. **避免泄漏**：检查闭包和全局变量。

**解析**：  
内存泄漏源于未清理的监听或冗余对象，浅层响应减少 Proxy 开销，v-if 销毁组件释放内存。面试常考内存管理的实践。

**示例代码**：
```javascript
import { shallowRef, onUnmounted } from 'vue';
const data = shallowRef({ large: new Array(10000) });
const listener = () => {};
onMounted(() => window.addEventListener('click', listener));
onUnmounted(() => window.removeEventListener('click', listener));
```

---

### 85. 如何在 Vue 3 中使用性能分析工具？
**答案**：  
1. **Vue Devtools**：检查组件渲染和状态。  
2. **Lighthouse**：分析首屏性能和 SEO。  
3. **Browser Profiler**：定位 JS 执行瓶颈。  
4. **vite-bundle-analyzer**：分析打包体积。

**解析**：  
Vue Devtools 显示渲染时间，Lighthouse 提供优化建议，Profiler 定位慢函数，analyzer 检查 bundle 结构。面试常考工具的实际应用。

**示例代码**：
```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';
export default { plugins: [visualizer()] };
```

---

## 六、安全防护 (86-100)

### 86. Vue 3 项目中常见的 XSS 攻击有哪些？
**答案**：  
1. **v-html 注入**：用户输入直接渲染为 HTML。  
2. **URL 参数**：未过滤的查询参数执行脚本。  
3. **表单输入**：未验证的输入触发恶意代码。

**解析**：  
XSS（跨站脚本攻击）通过注入脚本窃取数据或执行恶意操作，v-html 是主要风险点，URL 和表单需严格校验。面试常考 XSS 的场景和防护。

**示例代码**：
```vue
<!-- 易受攻击 -->
<div v-html="userInput"></div> <!-- 输入 <script>alert('XSS')</script> -->
```

---

### 87. 如何在 Vue 3 中防止 XSS 攻击？
**答案**：  
1. **避免 v-html**：使用插值 {{}} 或组件渲染。  
2. **过滤输入**：使用 DOMPurify 或 sanitize-html。  
3. **编码输出**：转义特殊字符。

**解析**：  
v-html 直接解析 HTML，易被注入，插值自动转义。DOMPurify 清理恶意代码，编码（如 &lt;）防止脚本执行。面试常考过滤的实现和配置。

**示例代码**：
```javascript
import DOMPurify from 'dompurify';
export default {
  setup() {
    const userInput = ref('<script>alert("XSS")</script>');
    const safeHtml = computed(() => DOMPurify.sanitize(userInput.value));
    return { safeHtml };
  }
};
<template>
  <div v-html="safeHtml"></div>
</template>
```

---

### 88. 如何在 Vue 3 中保护 API 请求？
**答案**：  
1. **HTTPS**：加密传输数据。  
2. **CSRF Token**：防止跨站请求伪造。  
3. **身份验证**：JWT 或 OAuth 校验用户。  
4. **请求头**：设置 X-Requested-With。

**解析**：  
HTTPS 防止拦截，CSRF Token 验证请求来源，JWT 确保用户身份，X-Requested-With 区分合法请求。面试常考 API 安全的完整防护。

**示例代码**：
```javascript
import axios from 'axios';
axios.defaults.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf');
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.get('/api/data', { headers: { Authorization: `Bearer ${token}` } });
```

---

### 89. Vue 3 项目如何处理敏感数据？
**答案**：  
1. **加密存储**：使用 crypto-js 加密本地数据。  
2. **环境变量**：Vite 的 .env 存储密钥。  
3. **避免暴露**：不在前端硬编码敏感信息。  
4. **后端处理**：敏感逻辑移至服务端。

**解析**：  
敏感数据（如 API 密钥）需加密，.env 隔离配置，硬编码易被逆向工程，后端处理更安全。面试常考数据安全的实践。

**示例代码**：
```javascript
// .env
VITE_API_KEY=secret123

// main.js
import CryptoJS from 'crypto-js';
const encrypted = CryptoJS.AES.encrypt('data', import.meta.env.VITE_API_KEY).toString();
```

---

### 90. 如何在 Vue 3 中实现权限控制？
**答案**：  
1. **路由守卫**：beforeEach 检查权限。  
2. **指令**：v-permission 控制元素显示。  
3. **Pinia**：存储用户角色。

**解析**：  
守卫拦截未授权导航，自定义指令动态渲染，Pinia 管理权限状态。面试常考权限管理的多层次实现。

**示例代码**：
```javascript
// router.js
router.beforeEach((to) => {
  const store = useAuthStore();
  return to.meta.role && store.role !== to.meta.role ? '/403' : true;
});

// directive.js
app.directive('permission', {
  mounted(el, binding) {
    const store = useAuthStore();
    if (!store.permissions.includes(binding.value)) el.style.display = 'none';
  }
});

// 使用
<div v-permission="'admin'">Admin Content</div>
```

---

### 91. Vue 3 项目如何防止 CSRF 攻击？
**答案**：  
1. **CSRF Token**：请求携带唯一令牌。  
2. **SameSite Cookie**：限制跨站 Cookie。  
3. **验证 Origin**：服务端检查请求来源。

**解析**：  
CSRF（跨站请求伪造）利用用户身份发请求，Token 验证请求合法性，SameSite Cookie 限制第三方使用，Origin 检查来源域名。面试常考 CSRF 的防护机制。

**示例代码**：
```javascript
axios.post('/api', { data }, {
  headers: { 'X-CSRF-TOKEN': localStorage.getItem('csrf') }
});
```

---

### 92. 如何在 Vue 3 中防止点击劫持？
**答案**：  
1. **X-Frame-Options**：服务端设置 DENY 或 SAMEORIGIN。  
2. **CSP**：Content-Security-Policy 限制 frame-ancestors。  
3. **JS 检测**：检查 window.top。

**解析**：  
点击劫持通过 iframe 诱导点击，X-Frame-Options 禁止嵌入，CSP 提供细粒度控制，JS 检测可作为补充。面试常考服务端和前端的协同防护。

**示例代码**：
```html
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self'">
```

```javascript
if (window.top !== window.self) window.location = '/';
```

---

### 93. Vue 3 项目如何避免代码注入？
**答案**：  
1. **验证输入**：过滤用户数据。  
2. **避免 eval**：不执行动态代码。  
3. **安全库**：使用最新版本依赖。

**解析**：  
代码注入通过 eval 或 Function 执行恶意代码，输入验证是第一道防线，避免动态执行是关键，依赖更新防止已知漏洞。面试常考注入的防范。

**示例代码**：
```javascript
// 避免
eval(userInput);

// 安全
const safeData = JSON.parse(userInput); // 只解析 JSON
```

---

### 94. 如何在 Vue 3 中实现安全的表单验证？
**答案**：  
1. **前端校验**：使用 Vuelidate 或 VeeValidate。  
2. **后端验证**：二次校验输入。  
3. **防篡改**：加密提交数据。

**解析**：  
前端校验提升体验，后端验证确保安全，加密防止拦截篡改。面试常考表单验证的双重机制。

**示例代码**：
```vue
<template>
  <input v-model="form.name" />
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
const form = ref({ name: '' });
const rules = { name: { required, minLength: minLength(3) } };
const v$ = useVuelidate(rules, form);
</script>
```

---

### 95. Vue 3 项目部署时的安全注意事项？
**答案**：  
1. **HTTPS**：启用 SSL/TLS。  
2. **隐藏头信息**：移除 X-Powered-By 等。  
3. **更新依赖**：修复已知漏洞。  
4. **防火墙**：限制访问端口。

**解析**：  
HTTPS 加密通信，隐藏头减少暴露，定期 npm audit 修复依赖，防火墙防止未授权访问。面试常考部署安全的全面性。

**示例代码**：
```nginx
server {
  listen 443 ssl;
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  add_header X-Powered-By "";
}
```

---

### 96. 如何在 Vue 3 中防止数据泄露？
**答案**：  
1. **最小权限**：只暴露必要数据。  
2. **加密传输**：HTTPS 和后端加密。  
3. **日志脱敏**：敏感信息不记录。

**解析**：  
数据泄露源于前端暴露或传输拦截，最小权限减少风险，加密保护传输，脱敏避免日志泄漏。面试常考数据保护的实践。

**示例代码**：
```javascript
// 脱敏
const logData = { ...user, password: '***' };
console.log(logData);
```

---

### 97. Vue 3 如何处理第三方库的安全性？
**答案**：  
1. **版本检查**：使用最新稳定版。  
2. **依赖审计**：npm audit 扫描漏洞。  
3. **隔离执行**：沙箱化运行。

**解析**：  
第三方库可能含漏洞，定期更新和审计是基础，沙箱（如 iframe）隔离风险代码。面试常考依赖管理的策略。

**示例代码**：
```bash
npm audit fix
```

---

### 98. 如何在 Vue 3 中防止 SQL 注入？
**答案**：  
1. **前端校验**：限制输入格式。  
2. **后端参数化**：使用 ORM 或预编译查询。  
3. **避免拼接**：不直接拼接 SQL。

**解析**：  
SQL 注入需后端防护，前端可初步过滤，参数化查询（如 ?）防止恶意输入。面试常考前后端协作。

**示例代码**：
```javascript
// 前端
const safeInput = input.replace(/[^a-zA-Z0-9]/g, '');

// 后端（Node.js 示例）
db.query('SELECT * FROM users WHERE id = ?', [userId]);
```

---

### 99. Vue 3 如何实现安全的文件上传？
**答案**：  
1. **限制类型**：检查文件扩展名和 MIME。  
2. **大小限制**：控制上传体积。  
3. **服务端验证**：二次检查文件。

**解析**：  
文件上传可能上传恶意脚本，客户端限制类型和大小，服务端验证确保安全。面试常考上传安全的实现。

**示例代码**：
```vue
<input type="file" @change="upload" accept=".jpg,.png" />
<script setup>
const upload = (e) => {
  const file = e.target.files[0];
  if (file.size > 2 * 1024 * 1024) alert('File too large');
  if (!['image/jpeg', 'image/png'].includes(file.type)) alert('Invalid type');
};
</script>
```

---

### 100. Vue 3 如何防范中间人攻击？
**答案**：  
1. **HTTPS**：加密通信。  
2. **HSTS**：强制 HTTPS。  
3. **证书校验**：确保证书有效。  
4. **内容完整性**：Subresource Integrity (SRI)。

**解析**：  
中间人攻击拦截通信，HTTPS 和 HSTS 加密并强制安全连接，SRI 验证 CDN 资源完整性。面试常考网络安全的综合防护。

**示例代码**：
```html
<script src="https://cdn.example.com/vue.js" integrity="sha256-xxx" crossorigin="anonymous"></script>
```

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```







### **一、Vue 3 核心基础（20 题）**

#### **1. Vue 3 与 Vue 2 的主要区别有哪些？**
**详细答案：**
Vue 3 是 Vue.js 的重大升级版本，相较于 Vue 2 在性能、API 设计、开发者体验和生态支持方面有显著改进。主要区别如下：

- **1. 响应式系统升级**：
  - **Vue 2**：使用 `Object.defineProperty` 实现响应式，只能监听已有属性的变化。
  - **Vue 3**：使用 ES6 的 `Proxy`，支持动态属性监听。
- **2. Composition API 的引入**：
  - **Vue 2**：仅支持 Options API。
  - **Vue 3**：新增 `Composition API`。
- **3. 性能优化**：
  - 编译器优化（静态节点提升、事件监听缓存、块级更新）。
  - Proxy 提升运行时效率。
- **4. Tree-Shaking 支持**：
  - **Vue 3**：按需引入，减少打包体积。
- **5. 新特性**：
  - Fragments、Teleport、Suspense。
- **6. TypeScript 支持**：
  - **Vue 3**：完全用 TypeScript 重写。
- **7. API 移除与调整**：
  - 移除 `filter`、`$set`、`$delete`、`.native`。
- **8. 构建工具升级**：
  - 推荐 Vite。

**代码示例**：
```javascript
// Vue 3 Composition API
import { ref } from 'vue';
export default { setup() { const count = ref(0); return { count }; } };
```

**应用场景**：
- 小型项目用 Vue 2，大型项目用 Vue 3。

**原理解析**：
- **响应式系统**：Vue 2 的 `Object.defineProperty` 通过定义 getter/setter 拦截属性访问，但无法监听新增属性（需 `$set`）。Vue 3 的 `Proxy` 拦截整个对象操作，支持动态属性和删除，底层基于 ES6 Reflect API 实现更高效的反射操作。
- **编译器优化**：静态节点提升将不变的 DOM 结构提取为常量，避免重复创建 VNode；Block Tree 通过标记动态节点，减少 diff 范围。
- **Tree-Shaking**：依赖 ES Modules 的静态分析，构建工具（如 Vite）识别未使用的导入并剔除。

---

#### **2. Vue 3 的 `Composition API` 有哪些核心 API？**
**详细答案：**
核心 API 包括：
- **生命周期钩子**：`onMounted`、`onUnmounted` 等。
- **响应式 API**：
  - `ref`：单一值响应式。
  - `reactive`：对象响应式。
  - `computed`：计算属性。
  - `readonly`：只读代理。
- **工具函数**：`toRef`、`toRefs`。
- **侦听器**：`watch`、`watchEffect`。
- **其他**：`provide`/`inject`、`nextTick`。

**代码示例**：
```javascript
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onMounted(() => console.log('Mounted'));
    return { count };
  },
};
```

**应用场景**：
- `ref`：计数器。
- `reactive`：表单数据。

**原理解析**：
- **响应式实现**：`ref` 内部是一个 `{ value }` 的 `reactive` 对象，`.value` 的 getter/setter 通过 `Proxy` 触发依赖收集和更新。`reactive` 直接用 `Proxy` 代理对象，拦截所有属性操作。
- **生命周期钩子**：通过全局 `effect` 系统注册，组件创建时绑定到实例，特定阶段（如 `mounted`）触发回调。
- **watch/watchEffect**：基于 `effect`（Vue 的响应式副作用单元），`watch` 显式指定依赖，`watchEffect` 动态收集依赖并立即运行。

---

#### **3. `setup()` 函数的作用是什么？它的执行时机是？**
**详细答案：**
- **作用**：`setup()` 是 Composition API 的入口，定义响应式数据、方法和生命周期，返回值暴露给模板。
- **执行时机**：在 `beforeCreate` 和 `created` 之间。

**代码示例**：
```javascript
import { ref, onMounted } from 'vue';
export default {
  props: { msg: String },
  setup(props, { emit }) {
    const count = ref(0);
    onMounted(() => console.log(props.msg));
    return { count };
  },
};
```

**应用场景**：
- 初始化数据、注册生命周期。

**原理解析**：
- **执行时机**：Vue 3 的组件初始化流程中，`setup()` 被设计为在解析 `props` 后、创建实例前调用，确保数据和逻辑提前准备。源码中由 `setupComponent` 函数触发。
- **无 `this`**：`setup()` 是纯函数，避免依赖组件实例，减少上下文绑定开销。
- **返回值处理**：返回的对象被代理到组件实例的 `proxy` 上，供模板访问。

---

#### **4. `ref` 和 `reactive` 有什么区别？**
**详细答案：**
- **`ref`**：单一值响应式，`.value` 访问。
- **`reactive`**：对象响应式，直接访问属性。

**代码示例**：
```javascript
import { ref, reactive } from 'vue';
export default {
  setup() {
    const count = ref(0); // .value
    const state = reactive({ count: 0 }); // 直接访问
    return { count, state };
  },
};
```

**区别对比**：
| 特性     | `ref`         | `reactive`   |
| -------- | ------------- | ------------ |
| 数据类型 | 基本类型/对象 | 仅对象       |
| 访问方式 | `.value`      | 属性直接访问 |

**应用场景**：
- `ref`：独立状态。
- `reactive`：复杂对象。

**原理解析**：
- **`ref`**：内部创建 `{ value }` 对象，用 `reactive` 包装，`.value` 的 getter/setter 调用 `track`（依赖收集）和 `trigger`（更新触发）。
- **`reactive`**：直接用 `Proxy` 代理对象，拦截 `get`、`set` 等操作，递归代理嵌套对象（深响应式）。
- **模板解包**：Vue 编译器识别 `ref` 类型，自动插入 `.value` 访问。

---

#### **5. `toRef` 和 `toRefs` 有什么作用？**
**详细答案：**
- **`toRef`**：将 `reactive` 的属性转为 `ref`。
- **`toRefs`**：将 `reactive` 对象转为多个 `ref`。

**代码示例**：
```javascript
const state = reactive({ count: 0 });
const countRef = toRef(state, 'count'); // 单属性
const { count } = toRefs(state); // 所有属性
```

**应用场景**：
- `toRef`：传递单个属性。
- `toRefs`：解构使用。

**原理解析**：
- **`toRef`**：返回一个 `Ref` 对象，内部通过 getter/setter 绑定到 `reactive` 的原始属性，保持双向响应。
- **`toRefs`**：遍历 `reactive` 对象，调用 `toRef` 为每个属性创建 `ref`，返回普通对象。源码中基于 `Object.keys` 实现。

---

#### **6. 如何在 `setup` 中获取 `props` 和 `emit`？**
**详细答案：**
- **`props`**：`setup()` 第一个参数。
- **`emit`**：从 `context` 获取。

**代码示例**：
```javascript
export default {
  props: { msg: String },
  emits: ['update'],
  setup(props, { emit }) {
    console.log(props.msg);
    emit('update', '新值');
  },
};
```

**应用场景**：
- `props`：接收数据。
- `emit`：触发事件。

**原理解析**：
- **`props`**：由 Vue 的组件实例化流程传入，代理为响应式对象（`reactive`），只读通过 `Proxy` 的 `set` 拦截实现。
- **`emit`**：`context.emit` 是组件实例的 `_emit` 方法封装，底层调用事件触发器，通知父组件监听器。

---

#### **7. Vue 3 中 `watch` 和 `watchEffect` 的区别是什么？**
**详细答案：**
- **`watch`**：显式监听，指定目标。
- **`watchEffect`**：自动追踪依赖。

**代码示例**：
```javascript
const count = ref(0);
watch(count, (newVal, oldVal) => console.log(newVal, oldVal));
watchEffect(() => console.log(count.value));
```

**区别对比**：
| 特性     | `watch`  | `watchEffect` |
| -------- | -------- | ------------- |
| 监听目标 | 显式指定 | 自动追踪      |
| 执行时机 | 变化时   | 立即 + 变化时 |

**应用场景**：
- `watch`：精确监听。
- `watchEffect`：动态副作用。

**原理解析**：
- **`watch`**：基于 `effect` 创建侦听器，手动传入依赖，变化时调用 `trigger` 执行回调。
- **`watchEffect`**：创建自执行 `effect`，运行时通过 `track` 动态收集依赖，依赖变化时重新运行。

---

#### **8. `computed` 是如何工作的？和 `watch` 有什么区别？**
**详细答案：**
- **`computed`**：生成缓存的衍生数据。
- **与 `watch` 的区别**：`computed` 返回值，`watch` 执行副作用。

**代码示例**：
```javascript
const count = ref(1);
const double = computed(() => count.value * 2);
watch(count, (val) => console.log(val * 2));
```

**应用场景**：
- `computed`：计算结果。
- `watch`：监听变化。

**原理解析**：
- **`computed`**：基于 `effect` 实现，内部维护 `dirty` 标志，依赖不变时返回缓存值，变化时重新计算。
- **`watch`**：不缓存，依赖变化时直接执行回调，适合异步操作。

---

#### **9. Vue 3 的 `Teleport` 是什么？应用场景有哪些？**
**详细答案：**
- **定义**：将内容渲染到指定 DOM。
- **用法**：
  ```vue
  <Teleport to="body"><div>模态框</div></Teleport>
  ```

**应用场景**：
- 模态框、通知。

**原理解析**：
- **实现**：Vue 3 在渲染时识别 `Teleport`，通过 `createPortal` 将 VNode 挂载到目标 DOM，跳过默认父容器渲染。

---

#### **10. Vue 3 的 `Suspense` 组件的作用是什么？如何使用？**
**详细答案：**
- **作用**：处理异步加载。
- **用法**：
  ```vue
  <Suspense>
    <template #default><AsyncComponent /></template>
    <template #fallback>Loading...</template>
  </Suspense>
  ```

**应用场景**：
- 异步组件、数据加载。

**原理解析**：
- **实现**：`Suspense` 跟踪子组件的 `pending` 状态，若未完成则渲染 `fallback`，完成后切换到 `default`。

---

#### **11. Vue 3 的 `Fragments` 是什么？解决了什么问题？**
**详细答案：**
- **定义**：支持多根节点。
- **示例**：
  ```vue
  <template><h1>Title</h1><p>Content</p></template>
  ```

**解决问题**：
- 减少无意义 DOM。

**原理解析**：
- **实现**：Vue 3 编译器生成数组型 VNode，渲染时直接处理多个根节点。

---

#### **12. Vue 3 中如何优雅地实现全局状态管理？**
**详细答案：**
- **Pinia**：
  ```javascript
  import { defineStore } from 'pinia';
  export const useStore = defineStore('main', { state: () => ({ count: 0 }) });
  ```

**原理解析**：
- **Pinia**：基于 `reactive` 实现状态，`actions` 通过普通函数调用更新。

---

#### **13. Vue 3 的 `emits` 选项的作用是什么？**
**详细答案：**
- **作用**：声明事件。
- **用法**：
  ```javascript
  exports default { emits: ['update'] };
  ```

**原理解析**：
- **实现**：编译时校验，运行时绑定到组件实例的事件系统中。

---

#### **14. Vue 3 中如何自定义指令？与 Vue 2 有什么不同？**
**详细答案：**
- **定义**：
  ```javascript
  app.directive('my-dir', { mounted(el) { el.focus(); } });
  ```

**原理解析**：
- **实现**：指令对象绑定到 VNode，生命周期钩子在渲染时调用。

---

#### **15. `readonly` 和 `shallowReadonly` 有什么区别？**
**详细答案：**
- **`readonly`**：深只读。
- **`shallowReadonly`**：浅只读。

**原理解析**：
- **实现**：`Proxy` 的 `set` 拦截，`shallowReadonly` 只代理顶层。

---

#### **16. `shallowReactive` 和 `reactive` 有什么区别？**
**详细答案：**
- **`shallowReactive`**：浅响应式。
- **`reactive`**：深响应式。

**原理解析**：
- **实现**：`reactive` 递归代理，`shallowReactive` 仅代理顶层。

---

#### **17. 如何在 Vue 3 中实现双向绑定？**
**详细答案：**
- **用法**：
  ```vue
  <input v-model="text" />
  ```

**原理解析**：
- **实现**：编译为 `:value` 和 `@input`，底层依赖 `ref` 的响应式。

---

#### **18. `provide` 和 `inject` 的作用是什么？使用场景有哪些？**
**详细答案：**
- **作用**：跨层级通信。

**原理解析**：
- **实现**：通过组件实例的 `provides` 属性链传递。

---

#### **19. Vue 3 组件如何实现 `v-model` 双向绑定？**
**详细答案：**
- **用法**：
  ```vue
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  ```

**原理解析**：
- **实现**：事件和属性约定，依赖父组件响应式更新。

---

#### **20. Vue 3 如何在 `setup` 之外使用 `Composition API`？**
**详细答案：**
- **用法**：
  ```javascript
  export function useCounter() { const count = ref(0); return { count }; }
  ```

**原理解析**：
- **实现**：纯函数封装，依赖 Vue 的模块化导入。

### **二、Vue 组件与状态管理（15 题）**

#### **21. Vue 3 组件通信方式有哪些？**
**详细答案：**
Vue 3 提供了多种组件通信方式，适用于不同场景：

- **1. Props 和 Emit**：
  - 父传子通过 `props`，子传父通过 `$emit`。
- **2. Provide 和 Inject**：
  - 跨层级传递数据。
- **3. Slots（插槽）**：
  - 父组件向子组件传递内容。
- **4. Ref 和 $refs**：
  - 父组件直接操作子组件实例。
- **5. Event Bus（事件总线）**：
  - 通过自定义事件实现兄弟组件通信（不推荐，建议用状态管理）。
- **6. Pinia 或 Vuex**：
  - 全局状态管理。
- **7. $parent 和 $children**（不推荐）**：
  - 直接访问父子组件实例。

**代码示例**：
```javascript
// Props 和 Emit
// 父组件
<Child :msg="parentMsg" @update="handleUpdate" />
<script>
import { ref } from 'vue';
export default {
  setup() {
    const parentMsg = ref('Hello');
    const handleUpdate = (val) => (parentMsg.value = val);
    return { parentMsg, handleUpdate };
  },
};
</script>

// 子组件
export default {
  props: ['msg'],
  emits: ['update'],
  setup(props, { emit }) {
    const update = () => emit('update', 'New Value');
    return { update };
  },
};
```

**应用场景**：
- `Props/Emit`：父子组件简单通信。
- `Provide/Inject`：深层嵌套组件共享配置。
- `Pinia`：复杂项目全局状态。

**原理解析**：
- **Props**：Vue 将 `props` 代理为响应式对象，底层通过 `reactive` 实现。
- **Emit**：基于组件实例的事件系统，调用父组件绑定的事件监听器。
- **Provide/Inject**：通过组件实例的 `provides` 属性链实现依赖注入，查找最近的提供者。

---

#### **22. Vue 3 的 `defineProps` 和 `defineEmits` 有什么作用？**
**详细答案：**
- **`defineProps`**：
  - 在 `<script setup>` 中声明组件接收的 `props`，无需显式 `props` 选项。
- **`defineEmits`**：
  - 在 `<script setup>` 中声明组件触发的事件，替代 `emits` 选项。

**代码示例**：
```vue
<script setup>
const props = defineProps(['msg']); // 定义 props
const emit = defineEmits(['update']); // 定义 emits

console.log(props.msg);
const update = () => emit('update', 'New Value');
</script>
```

**应用场景**：
- 简化 `<script setup>` 语法，提升代码简洁性。

**原理解析**：
- **实现**：`defineProps` 和 `defineEmits` 是编译时宏，由 Vue 编译器转换为运行时代码。`defineProps` 生成对组件实例 `props` 的引用，`defineEmits` 返回触发事件的函数，底层调用组件实例的 `_emit` 方法。

---

#### **23. `defineExpose` 的作用是什么？**
**详细答案：**
- **作用**：
  - 在 `<script setup>` 中显式暴露子组件的属性或方法给父组件，解决 `setup` 默认不暴露内部状态的问题。

**代码示例**：
```vue
<!-- 子组件 -->
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
defineExpose({ count, increment });
</script>

<!-- 父组件 -->
<template>
  <Child ref="childRef" />
  <button @click="$refs.childRef.increment()">加1</button>
</template>
```

**应用场景**：
- 父组件需要直接调用子组件方法或访问状态。

**原理解析**：
- **实现**：`<script setup>` 默认封闭组件实例，`defineExpose` 在编译时将指定内容添加到组件的 `expose` 属性，运行时通过 `ref` 访问。

---

#### **24. `setup` 中 `this` 的指向是什么？为什么？**
**详细答案：**
- **指向**：在 `setup` 中，`this` 是 `undefined`。
- **原因**：
  - `setup` 是一个纯函数，不绑定组件实例，旨在避免对 `this` 的依赖，提升代码独立性。

**代码示例**：
```javascript
export default {
  setup() {
    console.log(this); // undefined
    return {};
  },
};
```

**应用场景**：
- 无需关心 `this`，专注于函数式逻辑。

**原理解析**：
- **实现**：Vue 3 在调用 `setup` 时不绑定上下文，源码中 `callWithErrorHandling` 直接执行 `setup` 函数，确保其与组件实例解耦。

---

#### **25. Vue 3 组件如何监听 `props` 的变化？**
**详细答案：**
- **方法**：
  - 使用 `watch` 监听 `props`。
- **注意**：`props` 是响应式的，但建议监听具体属性。

**代码示例**：
```javascript
export default {
  props: ['msg'],
  setup(props) {
    watch(() => props.msg, (newVal, oldVal) => {
      console.log(`msg 从 ${oldVal} 变为 ${newVal}`);
    });
  },
};
```

**应用场景**：
- 根据 `props` 变化触发副作用，如请求数据。

**原理解析**：
- **实现**：`props` 被 `reactive` 代理，`watch` 利用 `effect` 机制收集依赖，变化时触发回调。

---

#### **26. Vue 组件中 `slots` 是如何工作的？**
**详细答案：**
- **作用**：
  - 插槽允许父组件向子组件传递内容，支持默认插槽、具名插槽和作用域插槽。

**代码示例**：
```vue
<!-- 子组件 -->
<template>
  <slot name="header" :data="data">默认内容</slot>
</template>
<script setup>
import { ref } from 'vue';
const data = ref('Hello');
</script>

<!-- 父组件 -->
<Child>
  <template #header="{ data }">{{ data }}</template>
</Child>
```

**应用场景**：
- 自定义组件内容，如列表项。

**原理解析**：
- **实现**：编译器将插槽内容转为 VNode，子组件通过 `render` 函数调用 `$slots` 渲染，作用域插槽通过函数传递参数。

---

#### **27. `v-bind="$attrs"` 的作用是什么？**
**详细答案：**
- **作用**：
  - 将父组件传递的未声明属性和事件绑定到子组件的指定元素。

**代码示例**：
```vue
<!-- 子组件 -->
<template>
  <input v-bind="$attrs" />
</template>

<!-- 父组件 -->
<Child type="text" @focus="handleFocus" />
```

**应用场景**：
- 透传属性到原生元素。

**原理解析**：
- **实现**：`$attrs` 是组件实例的属性集合，`v-bind` 将其展开为 DOM 属性和事件绑定。

---

#### **28. Vue 3 如何实现动态组件加载？**
**详细答案：**
- **方法**：
  - 使用 `<component :is>` 和动态导入。

**代码示例**：
```vue
<template>
  <component :is="currentComponent" />
</template>
<script setup>
import { defineAsyncComponent, ref } from 'vue';
const currentComponent = ref(
  defineAsyncComponent(() => import('./MyComponent.vue'))
);
</script>
```

**应用场景**：
- 按需加载组件，提升首屏性能。

**原理解析**：
- **实现**：`defineAsyncComponent` 返回一个异步组件，渲染时触发导入，加载完成后更新 VNode。

---

#### **29. `defineAsyncComponent` 的作用是什么？如何使用？**
**详细答案：**
- **作用**：
  - 定义异步组件，支持懒加载。
- **用法**：
  - 传入加载函数，可配置选项（如 `loadingComponent`）。

**代码示例**：
```javascript
import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: { template: '<div>Loading...</div>' },
});
```

**应用场景**：
- 大型组件延迟加载。

**原理解析**：
- **实现**：返回一个代理组件，初次渲染时调用 `loader`，加载完成后替换为目标组件。

---

#### **30. 组件的 `name` 选项有什么作用？**
**详细答案：**
- **作用**：
  - 指定组件名称，用于调试、递归组件和 `<keep-alive>`。

**代码示例**：
```javascript
export default {
  name: 'MyComponent',
};
```

**应用场景**：
- 递归组件、开发者工具显示。

**原理解析**：
- **实现**：注册到组件实例，供运行时和编译器识别。

---

#### **31. 组件如何使用 `template refs`？**
**详细答案：**
- **方法**：
  - 使用 `ref` 绑定 DOM 或组件。

**代码示例**：
```vue
<template>
  <div ref="myRef">Hello</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const myRef = ref(null);
onMounted(() => console.log(myRef.value));
</script>
```

**应用场景**：
- 操作 DOM 或子组件。

**原理解析**：
- **实现**：编译器将 `ref` 属性转为 `ref` 对象，挂载时绑定到 DOM 或组件实例。

---

#### **32. 组件如何销毁？`onUnmounted` 的作用是什么？**
**详细答案：**
- **销毁**：组件移除时自动销毁。
- **`onUnmounted`**：注册卸载时回调。

**代码示例**：
```javascript
import { onUnmounted } from 'vue';
export default {
  setup() {
    onUnmounted(() => console.log('销毁'));
  },
};
```

**应用场景**：
- 清理定时器、事件监听。

**原理解析**：
- **实现**：组件卸载时触发 `effect` 清理，`onUnmounted` 回调在 `unmount` 阶段执行。

---

#### **33. 组件如何缓存？`KeepAlive` 的作用是什么？**
**详细答案：**
- **作用**：
  - `<KeepAlive>` 缓存组件实例，避免重复渲染。

**代码示例**：
```vue
<KeepAlive>
  <component :is="currentComponent" />
</KeepAlive>
```

**应用场景**：
- 切换组件保留状态。

**原理解析**：
- **实现**：缓存 VNode 和组件实例，重新激活时直接复用。

---

#### **34. Vue 3 如何实现递归组件？**
**详细答案：**
- **方法**：
  - 指定 `name`，在模板中调用自身。

**代码示例**：
```vue
<template>
  <div>
    <TreeNode v-for="child in children" :node="child" />
  </div>
</template>
<script>
export default {
  name: 'TreeNode',
  props: ['node'],
};
</script>
```

**应用场景**：
- 树形结构展示。

**原理解析**：
- **实现**：编译器识别组件名称，运行时递归渲染。

---

#### **35. Vue 3 组件如何处理 `$emit` 事件？**
**详细答案：**
- **方法**：
  - 通过 `emit` 函数触发。

**代码示例**：
```javascript
export default {
  emits: ['update'],
  setup(props, { emit }) {
    emit('update', 'value');
  },
};
```

**应用场景**：
- 子组件通知父组件。

**原理解析**：
- **实现**：`emit` 调用组件实例的 `_emit` 方法，触发父组件的事件监听器。

### **三、Vue 3 事件系统（10 题）**

#### **36. Vue 3 事件绑定的 `.once`、`.capture`、`.self` 有什么作用？**
**详细答案：**
Vue 3 的事件修饰符增强了事件绑定的灵活性，以下是三个常用修饰符的作用：
- **`.once`**：
  - 事件只触发一次，之后自动移除监听。
- **`.capture`**：
  - 使用捕获模式触发事件（从外到内），而不是默认的冒泡模式（从内到外）。
- **`.self`**：
  - 仅当事件的目标是绑定元素本身时触发，避免子元素触发。

**代码示例**：
```vue
<template>
  <div @click.capture="handleCapture">
    <button @click.once="handleOnce" @click.self="handleSelf">点击</button>
  </div>
</template>
<script setup>
const handleOnce = () => console.log('只触发一次');
const handleCapture = () => console.log('捕获阶段触发');
const handleSelf = () => console.log('仅自身触发');
</script>
```

**应用场景**：
- `.once`：一次性操作，如提交表单后移除监听。
- `.capture`：父元素优先处理事件，如拦截点击。
- `.self`：避免子元素干扰，如按钮区域精确控制。

**原理解析**：
- **`.once`**：编译器将事件包装为 `addEventListener` 的 `{ once: true }` 选项，触发后自动移除。
- **`.capture`**：通过 `addEventListener` 的第三个参数设置为 `true`，改变事件传播阶段。
- **`.self`**：在事件处理函数中添加条件 `if (event.target !== event.currentTarget) return`，确保目标匹配。

---

#### **37. 如何在 Vue 3 组件中自定义事件？**
**详细答案：**
- **方法**：
  - 使用 `emit` 方法触发自定义事件，配合 `emits` 选项声明。

**代码示例**：
```vue
<template>
  <button @click="triggerEvent">触发事件</button>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['customEvent']);
const triggerEvent = () => emit('customEvent', '参数');
</script>

<!-- 父组件 -->
<Child @custom-event="handleCustom" />
```

**应用场景**：
- 子组件通知父组件状态变化，如关闭弹窗。

**原理解析**：
- **实现**：`emit` 调用组件实例的 `_emit` 方法，查找父组件绑定的事件监听器并执行。`emits` 选项在编译时记录事件名，用于类型检查和文档化。

---

#### **38. Vue 3 事件修饰符有哪些？**
**详细答案：**
Vue 3 提供以下常用事件修饰符：
- **`.stop`**：阻止事件冒泡。
- **`.prevent`**：阻止默认行为。
- **`.once`**：事件只触发一次。
- **`.capture`**：捕获模式触发。
- **`.self`**：仅自身触发。
- **`.passive`**：提升滚动性能，不阻止默认行为。
- **键修饰符**：如 `.enter`、`.ctrl`。
- **鼠标修饰符**：如 `.left`、`.right`。

**代码示例**：
```vue
<button @click.stop="handleClick" @submit.prevent="handleSubmit">按钮</button>
```

**应用场景**：
- `.stop`：防止点击事件传到父元素。
- `.prevent`：阻止表单提交刷新页面。

**原理解析**：
- **实现**：编译器将修饰符转为原生 DOM 事件选项或条件逻辑，如 `.stop` 插入 `event.stopPropagation()`。

---

#### **39. Vue 3 事件如何防抖和节流？**
**详细答案：**
- **方法**：
  - 手动实现防抖（debounce）和节流（throttle）函数，结合事件绑定使用。

**代码示例**：
```vue
<template>
  <input @input="debouncedInput" />
</template>
<script setup>
import { ref } from 'vue';
const inputValue = ref('');

// 防抖
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// 节流
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const debouncedInput = debounce((e) => {
  inputValue.value = e.target.value;
  console.log('输入:', inputValue.value);
}, 300);
</script>
```

**应用场景**：
- 防抖：搜索输入延迟请求。
- 节流：滚动事件优化性能。

**原理解析**：
- **防抖**：通过定时器延迟执行，最后一次事件生效。
- **节流**：限制时间间隔内的事件频率，依赖闭包控制状态。

---

#### **40. `v-on` 事件如何传递参数？**
**详细答案：**
- **方法**：
  - 使用 `$event` 或直接传入自定义参数。

**代码示例**：
```vue
<template>
  <button @click="handleClick('自定义参数', $event)">点击</button>
</template>
<script setup>
const handleClick = (param, event) => {
  console.log(param, event.target);
};
</script>
```

**应用场景**：
- 传递额外数据，如索引或状态。

**原理解析**：
- **实现**：编译器将事件表达式转为函数调用，`$event` 是原生事件对象的引用。

---

#### **41. Vue 3 事件如何使用 `stopPropagation` 和 `preventDefault`？**
**详细答案：**
- **方法**：
  - 使用 `.stop` 和 `.prevent` 修饰符。

**代码示例**：
```vue
<form @submit.prevent="handleSubmit">
  <div @click.stop="handleClick">点击</div>
</form>
```

**应用场景**：
- `.stop`：阻止冒泡。
- `.prevent`：阻止表单提交。

**原理解析**：
- **实现**：编译器注入 `event.stopPropagation()` 和 `event.preventDefault()`，直接操作原生事件对象。

---

#### **42. 事件如何绑定多个处理函数？**
**详细答案：**
- **方法**：
  - 使用数组或多个 `@` 绑定。

**代码示例**：
```vue
<template>
  <button @click="[handleClick1, handleClick2]">点击</button>
</template>
<script setup>
const handleClick1 = () => console.log('事件1');
const handleClick2 = () => console.log('事件2');
</script>
```

**应用场景**：
- 多个逻辑响应同一事件。

**原理解析**：
- **实现**：编译器将数组转为顺序执行的函数调用，底层通过 `forEach` 遍历执行。

---

#### **43. Vue 3 事件如何在 `setup` 里监听？**
**详细答案：**
- **方法**：
  - 使用 `onMounted` 等生命周期绑定原生事件。

**代码示例**：
```vue
<template>
  <div ref="myDiv">点击</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const myDiv = ref(null);
onMounted(() => {
  myDiv.value.addEventListener('click', () => console.log('点击'));
});
</script>
```

**应用场景**：
- 操作 DOM 原生事件。

**原理解析**：
- **实现**：通过 `ref` 获取 DOM，手动调用 `addEventListener`，与 Vue 的事件系统独立。

---

#### **44. 组件 `emit` 事件时如何携带参数？**
**详细答案：**
- **方法**：
  - `emit` 函数第二个参数及之后为事件参数。

**代码示例**：
```vue
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['update']);
const trigger = () => emit('update', '参数1', '参数2');
</script>
```

**应用场景**：
- 传递多值给父组件。

**原理解析**：
- **实现**：`emit` 将参数传入父组件的事件回调，底层通过数组解构传递。

---

#### **45. Vue 3 事件系统的 `.native` 修饰符为何被移除？如何替代？**
**详细答案：**
- **原因**：
  - Vue 3 中自定义组件的事件直接绑定，无需区分原生事件，`.native` 冗余。
- **替代**：
  - 直接使用 `@click` 或手动绑定原生事件。

**代码示例**：
```vue
<!-- Vue 3 -->
<CustomComp @click="handleClick" />
```

**应用场景**：
- 简化事件绑定。

**原理解析**：
- **实现**：Vue 3 的事件代理统一处理，编译器不再区分 `.native`，直接绑定到组件根元素。

### **四、Vue 3 生命周期（10 题）**

#### **46. Vue 3 生命周期有哪些变化？**
**详细答案：**
Vue 3 的生命周期与 Vue 2 相比，核心阶段保持一致，但在使用方式和命名上有变化：

- **主要生命周期**：
  - `beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeUnmount`（Vue 2 为 `beforeDestroy`）、`unmounted`（Vue 2 为 `destroyed`）。
- **变化**：
  - **命名调整**：`beforeDestroy` 和 `destroyed` 改为 `beforeUnmount` 和 `unmounted`，更贴近“挂载/卸载”概念。
  - **Composition API**：生命周期钩子以函数形式提供（如 `onMounted`），在 `setup` 中使用。
  - **新增钩子**：`onRenderTracked` 和 `onRenderTriggered`，用于调试响应式更新。
- **移除**：无直接移除的生命周期，但 `setup` 取代了部分 `beforeCreate` 和 `created` 的功能。

**代码示例**：
```javascript
import { onMounted, onUnmounted } from 'vue';
export default {
  setup() {
    onMounted(() => console.log('组件挂载'));
    onUnmounted(() => console.log('组件卸载'));
  },
};
```

**应用场景**：
- 使用 `onMounted` 初始化数据，`onUnmounted` 清理资源。

**原理解析**：
- **实现**：Vue 3 的生命周期通过 `effect` 系统管理，`setup` 中的钩子函数注册到组件实例的生命周期队列，特定阶段（如 `mounted`）触发对应回调。命名调整是为了语义更清晰，与挂载流程一致。

---

#### **47. `onMounted` 和 `onBeforeMount` 的执行顺序？**
**详细答案：**
- **`onBeforeMount`**：在组件挂载到 DOM 前执行，此时 DOM 未渲染。
- **`onMounted`**：在组件挂载到 DOM 后执行，此时 DOM 已可用。
- **执行顺序**：`onBeforeMount` 先于 `onMounted`。

**代码示例**：
```javascript
import { onBeforeMount, onMounted } from 'vue';
export default {
  setup() {
    onBeforeMount(() => console.log('Before Mount')); // 先打印
    onMounted(() => console.log('Mounted')); // 后打印
  },
};
```

**应用场景**：
- `onBeforeMount`：准备挂载前的配置。
- `onMounted`：访问 DOM 或发起请求。

**原理解析**：
- **实现**：Vue 的渲染流程中，`beforeMount` 在 VNode 创建后、挂载前触发，`mounted` 在 DOM 挂载完成后触发。源码中由 `mountComponent` 函数按顺序调用。

---

#### **48. `onUpdated` 在什么情况下会触发？**
**详细答案：**
- **触发时机**：
  - 当组件因响应式数据变化而完成 DOM 更新后触发。
- **注意**：不包括手动 DOM 操作或子组件更新。

**代码示例**：
```javascript
import { ref, onUpdated } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onUpdated(() => console.log('DOM 更新完成', count.value));
    return { count };
  },
};
```

**应用场景**：
- 检查更新后的 DOM 状态。

**原理解析**：
- **实现**：响应式数据变化触发 `effect` 更新，DOM 渲染完成后，`patch` 流程结束时调用 `onUpdated` 钩子。

---

#### **49. `onUnmounted` 的应用场景？**
**详细答案：**
- **作用**：
  - 在组件卸载时执行清理操作。

**代码示例**：
```javascript
import { onMounted, onUnmounted } from 'vue';
export default {
  setup() {
    const timer = setInterval(() => console.log('计时'), 1000);
    onUnmounted(() => clearInterval(timer));
  },
};
```

**应用场景**：
- 清理定时器、移除事件监听器。

**原理解析**：
- **实现**：组件卸载时，`unmountComponent` 函数触发 `onUnmounted`，清理 `effect` 和绑定资源。

---

#### **50. `onActivated` 和 `onDeactivated` 适用于什么情况？**
**详细答案：**
- **`onActivated`**：组件被 `<KeepAlive>` 缓存后重新激活时触发。
- **`onDeactivated`**：组件从 DOM 中移除但仍缓存时触发。

**代码示例**：
```vue
<template>
  <KeepAlive>
    <component :is="currentComponent" />
  </KeepAlive>
</template>
<script setup>
import { onActivated, onDeactivated } from 'vue';
onActivated(() => console.log('组件激活'));
onDeactivated(() => console.log('组件停用'));
</script>
```

**应用场景**：
- 缓存组件状态管理，如表单输入保留。

**原理解析**：
- **实现**：`<KeepAlive>` 维护组件实例缓存，激活时触发 `onActivated`，移除时触发 `onDeactivated`，由 `keepAlive` 组件逻辑控制。

---

#### **51. `onBeforeUpdate` 和 `onUpdated` 的区别？**
**详细答案：**
- **`onBeforeUpdate`**：数据变化导致 DOM 更新前触发。
- **`onUpdated`**：DOM 更新完成后触发。

**代码示例**：
```javascript
import { ref, onBeforeUpdate, onUpdated } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onBeforeUpdate(() => console.log('更新前', count.value));
    onUpdated(() => console.log('更新后', count.value));
    return { count };
  },
};
```

**应用场景**：
- `onBeforeUpdate`：调整数据。
- `onUpdated`：检查 DOM。

**原理解析**：
- **实现**：`onBeforeUpdate` 在 `patch` 前触发，`onUpdated` 在 `patch` 后触发，依赖 Vue 的响应式更新流程。

---

#### **52. `onBeforeUnmount` 的作用？**
**详细答案：**
- **作用**：
  - 在组件卸载前执行清理或记录操作。

**代码示例**：
```javascript
import { onBeforeUnmount } from 'vue';
export default {
  setup() {
    onBeforeUnmount(() => console.log('卸载前'));
  },
};
```

**应用场景**：
- 保存状态或警告用户。

**原理解析**：
- **实现**：卸载流程中，`beforeUnmount` 在 DOM 移除前触发，确保清理逻辑优先执行。

---

#### **53. 生命周期 `onRenderTracked` 和 `onRenderTriggered` 作用是什么？**
**详细答案：**
- **`onRenderTracked`**：首次渲染或依赖收集时触发，调试用。
- **`onRenderTriggered`**：响应式依赖变化触发渲染时调用。

**代码示例**：
```javascript
import { ref, onRenderTracked, onRenderTriggered } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onRenderTracked((e) => console.log('依赖收集', e));
    onRenderTriggered((e) => console.log('渲染触发', e));
    return { count };
  },
};
```

**应用场景**：
- 调试响应式系统。

**原理解析**：
- **实现**：绑定到渲染 `effect`，`onRenderTracked` 在依赖收集阶段触发，`onRenderTriggered` 在依赖变化时记录。

---

#### **54. Vue 3 生命周期如何与 `watchEffect` 结合使用？**
**详细答案：**
- **方法**：
  - 在生命周期钩子中使用 `watchEffect` 监听变化。

**代码示例**：
```javascript
import { ref, onMounted, watchEffect } from 'vue';
export default {
  setup() {
    const count = ref(0);
    onMounted(() => {
      watchEffect(() => console.log('count:', count.value));
    });
    return { count };
  },
};
```

**应用场景**：
- 动态监听挂载后的状态。

**原理解析**：
- **实现**：`watchEffect` 创建副作用函数，生命周期钩子控制其注册时机。

---

#### **55. `onErrorCaptured` 如何捕获错误？适用于哪些场景？**
**详细答案：**
- **作用**：
  - 捕获子组件抛出的错误，返回 `false` 可阻止向上传播。

**代码示例**：
```javascript
import { onErrorCaptured } from 'vue';
export default {
  setup() {
    onErrorCaptured((err, vm, info) => {
      console.log('捕获错误:', err);
      return false; // 阻止传播
    });
  },
};
```

**应用场景**：
- 错误日志记录、防止应用崩溃。

**原理解析**：
- **实现**：错误通过组件树向上传播，`onErrorCaptured` 在父组件捕获，底层基于 `try/catch` 和事件机制。

### **五、Vue 3 Router（10 题）**

#### **56. Vue Router 4.0 与 Vue Router 3.x 有什么区别？**
**详细答案：**
Vue Router 4.0 是为 Vue 3 设计的版本，与 Vue Router 3.x 相比有以下主要区别：
- **1. Vue 3 兼容性**：
  - Vue Router 4.0 仅支持 Vue 3，3.x 支持 Vue 2。
- **2. API 调整**：
  - 使用 `createRouter` 创建路由实例，替代 `new VueRouter()`。
- **3. History API**：
  - 提供 `createWebHistory` 和 `createMemoryHistory`，移除 `mode` 选项。
- **4. Composition API 支持**：
  - 新增 `useRouter` 和 `useRoute` 钩子。
- **5. TypeScript 支持**：
  - 4.0 使用 TypeScript 重写，提供更好的类型推导。
- **6. 移除特性**：
  - 移除 `*` 通配符路由，改为 `path: '/:pathMatch(.*)'`。
- **7. 动态路由改进**：
  - 支持更灵活的参数解析。

**代码示例**：
```javascript
// Vue Router 4.0
import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: Home }],
});
```

**应用场景**：
- Vue 3 项目使用 Vue Router 4.0，Vue 2 项目继续使用 3.x。

**原理解析**：
- **实现**：Vue Router 4.0 基于 Vue 3 的响应式系统，`createRouter` 创建一个响应式路由实例，`history` 模式通过 HTML5 History API 或内存实现导航管理。

---

#### **57. `createRouter` 和 `createWebHistory` 如何配合使用？**
**详细答案：**
- **`createRouter`**：创建路由实例，接收路由配置。
- **`createWebHistory`**：启用 HTML5 History 模式，管理浏览器历史记录。

**代码示例**：
```javascript
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';

const routes = [{ path: '/', component: Home }];
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes,
});

export default router;
```

**应用场景**：
- 单页应用（SPA）路由管理。

**原理解析**：
- **实现**：`createWebHistory` 返回一个 History 对象，监听 `popstate` 事件并更新路由状态；`createRouter` 将其与路由表绑定，响应式管理当前路由。

---

#### **58. Vue 3 路由 `beforeEach` 和 `beforeResolve` 的区别？**
**详细答案：**
- **`beforeEach`**：全局前置守卫，在路由跳转前执行。
- **`beforeResolve`**：在导航解析完成后、渲染前执行。

**代码示例**：
```javascript
router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  next();
});
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
});
```

**区别**：
| 特性     | `beforeEach`       | `beforeResolve`    |
| -------- | ------------------ | ------------------ |
| 执行时机 | 导航触发后立即执行 | 组件解析完成后执行 |
| 用途     | 权限检查           | 数据预加载确认     |

**应用场景**：
- `beforeEach`：用户认证。
- `beforeResolve`：确保异步组件加载完成。

**原理解析**：
- **实现**：路由导航是一个 promise 链，`beforeEach` 在链的开头触发，`beforeResolve` 在路由匹配和组件解析后触发，确保所有异步操作完成。

---

#### **59. `router.push` 和 `router.replace` 的区别？**
**详细答案：**
- **`router.push`**：添加新历史记录，可回退。
- **`router.replace`**：替换当前历史记录，无回退。

**代码示例**：
```javascript
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const goPush = () => router.push('/home');
    const goReplace = () => router.replace('/about');
    return { goPush, goReplace };
  },
};
```

**应用场景**：
- `push`：普通页面跳转。
- `replace`：登录后跳转到主页。

**原理解析**：
- **实现**：`push` 调用 `history.pushState` 添加记录，`replace` 调用 `history.replaceState` 修改当前记录，底层依赖浏览器 History API。

---

#### **60. 如何获取当前路由信息？**
**详细答案：**
- **方法**：
  - 使用 `useRoute` 获取当前路由对象。

**代码示例**：
```javascript
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    console.log(route.path); // 当前路径
    console.log(route.params); // 路由参数
    return { route };
  },
};
```

**应用场景**：
- 根据路由参数渲染内容。

**原理解析**：
- **实现**：`useRoute` 返回一个响应式对象，由路由实例的 `currentRoute` 提供，底层通过 `reactive` 实现。

---

#### **61. 动态路由如何定义？如何获取参数？**
**详细答案：**
- **定义**：在路径中使用 `:` 表示参数。
- **获取**：通过 `useRoute().params`。

**代码示例**：
```javascript
// 路由定义
const routes = [{ path: '/user/:id', component: User }];

// 组件
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const userId = route.params.id; // 获取 id
    return { userId };
  },
};
```

**应用场景**：
- 用户详情页根据 ID 加载数据。

**原理解析**：
- **实现**：路由匹配时，`path-to-regexp` 解析动态参数，存储到 `params` 对象，`useRoute` 响应式访问。

---

#### **62. `router.beforeEach` 如何实现权限控制？**
**详细答案：**
- **方法**：
  - 检查用户状态，决定是否放行。

**代码示例**：
```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

// 路由配置
const routes = [{ path: '/dashboard', meta: { requiresAuth: true } }];
```

**应用场景**：
- 限制未登录用户访问受保护页面。

**原理解析**：
- **实现**：`beforeEach` 是导航守卫链的一部分，通过 `next` 函数控制跳转，`meta` 字段存储路由元信息。

---

#### **63. `router-view` 的 `key` 有什么作用？**
**详细答案：**
- **作用**：
  - 为 `<router-view>` 指定唯一 `key`，强制重新渲染组件。

**代码示例**：
```vue
<router-view :key="$route.fullPath" />
```

**应用场景**：
- 路由参数变化时刷新组件。

**原理解析**：
- **实现**：Vue 的 `key` 改变时触发组件销毁和重建，`fullPath` 确保路径变化时更新。

---

#### **64. `router.isReady()` 的作用是什么？**
**详细答案：**
- **作用**：
  - 返回 Promise，等待路由初始化完成。

**代码示例**：
```javascript
import { useRouter } from 'vue-router';
export default {
  async setup() {
    const router = useRouter();
    await router.isReady();
    console.log('路由就绪');
  },
};
```

**应用场景**：
- SSR 或初始导航时确保路由可用。

**原理解析**：
- **实现**：检查路由状态，等待所有守卫和异步组件解析完成。

---

#### **65. Vue 3 如何在 `setup` 里使用 `useRouter` 和 `useRoute`？**
**详细答案：**
- **方法**：
  - 导入并调用 `useRouter` 和 `useRoute`。

**代码示例**：
```javascript
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goHome = () => router.push('/home');
    console.log(route.path);
    return { goHome };
  },
};
```

**应用场景**：
- 动态跳转或获取路由信息。

**原理解析**：
- **实现**：`useRouter` 和 `useRoute` 是 Composition API 钩子，返回路由实例和当前路由的响应式引用。

### **六、Pinia（10 题）**

#### **66. Pinia 和 Vuex 有哪些不同？**
**详细答案：**
Pinia 是 Vue 3 推荐的状态管理库，与 Vuex 相比有以下区别：

- **1. API 设计**：
  - Vuex：基于 `mutations`、`actions` 和 `getters`。
  - Pinia：直接使用 `state`、`actions` 和 `getters`，无 `mutations`。
- **2. 响应式支持**：
  - Pinia：内置 Vue 3 的 `reactive` 和 `ref`，更简洁。
  - Vuex：依赖 Vue 2 的响应式系统。
- **3. TypeScript 支持**：
  - Pinia：原生支持 TypeScript。
  - Vuex：需要额外配置。
- **4. 模块化**：
  - Pinia：每个 `store` 是独立实例，无需 `namespaced`。
  - Vuex：需要手动划分模块。
- **5. 体积**：
  - Pinia：更轻量，约 1KB。
- **6. Devtools**：
  - Pinia：更好的调试体验，支持时间旅行。

**代码示例**：
```javascript
// Pinia
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: { increment() { this.count++; } },
});
```

**应用场景**：
- Pinia：Vue 3 新项目。
- Vuex：Vue 2 遗留项目。

**原理解析**：
- **实现**：Pinia 利用 Vue 3 的 `reactive` 创建状态对象，`actions` 直接操作状态，省去 `mutations` 的中间层，提升简洁性和性能。

---

#### **67. `defineStore` 如何定义一个状态管理模块？**
**详细答案：**
- **作用**：
  - `defineStore` 创建一个独立的 Store，返回一个可复用的函数。
- **用法**：
  - 接收 Store ID 和配置对象（`state`、`getters`、`actions`）。

**代码示例**：
```javascript
import { defineStore } from 'pinia';
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: { double: (state) => state.count * 2 },
  actions: { increment() { this.count++; } },
});
```

**应用场景**：
- 定义全局计数器模块。

**原理解析**：
- **实现**：`defineStore` 返回一个工厂函数，首次调用时创建 Store 实例，内部使用 `reactive` 包装 `state`，缓存单例以供复用。

---

#### **68. Pinia 如何持久化存储？**
**详细答案：**
- **方法**：
  - 使用插件（如 `pinia-plugin-persistedstate`）或手动存储。

**代码示例**：
```javascript
// 安装插件
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 定义 Store
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  persist: true, // 启用持久化
});
```

**应用场景**：
- 保存用户设置或购物车数据。

**原理解析**：
- **实现**：插件监听 `state` 变化，序列化到 `localStorage`，初始化时反序列化恢复，依赖 Vue 的响应式系统触发更新。

---

#### **69. Pinia 的 `state`、`getters` 和 `actions` 如何使用？**
**详细答案：**
- **`state`**：定义响应式状态。
- **`getters`**：计算属性，访问 `state`。
- **`actions`**：定义操作方法。

**代码示例**：
```javascript
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  getters: { double: (state) => state.count * 2 },
  actions: { increment() { this.count++; } },
});

// 使用
import { useStore } from './store';
const store = useStore();
console.log(store.count); // 0
console.log(store.double); // 0
store.increment(); // count 变为 1
```

**应用场景**：
- 管理计数器和衍生数据。

**原理解析**：
- **实现**：`state` 用 `reactive` 包装，`getters` 是普通函数绑定到 Store，`actions` 直接操作 `this`（Store 实例）。

---

#### **70. Pinia 如何监听状态变化？**
**详细答案：**
- **方法**：
  - 使用 `$subscribe` 或 `watch`。

**代码示例**：
```javascript
import { useStore } from './store';
import { watch } from 'vue';
export default {
  setup() {
    const store = useStore();
    // 方法 1: $subscribe
    store.$subscribe((mutation, state) => {
      console.log('状态变化:', state.count);
    });
    // 方法 2: watch
    watch(() => store.count, (newVal) => console.log('count:', newVal));
  },
};
```

**应用场景**：
- 状态变化时触发副作用。

**原理解析**：
- **实现**：`$subscribe` 是 Pinia 的内置方法，监听 `state` 的 `reactive` 变化；`watch` 利用 Vue 的响应式系统跟踪。

---

#### **71. 如何在 Vue 组件中使用 Pinia？**
**详细答案：**
- **方法**：
  - 在 `setup` 中调用 Store 函数。

**代码示例**：
```vue
<template>
  <div>{{ store.count }} <button @click="store.increment">加1</button></div>
</template>
<script setup>
import { useStore } from './store';
const store = useStore();
</script>
```

**应用场景**：
- 组件内访问和修改状态。

**原理解析**：
- **实现**：Store 函数返回响应式实例，绑定到组件的渲染依赖，变化时触发更新。

---

#### **72. Pinia 如何进行模块化管理？**
**详细答案：**
- **方法**：
  - 每个 Store 独立定义，按需导入。

**代码示例**：
```javascript
// store/user.js
export const useUserStore = defineStore('user', { state: () => ({ name: '' }) });

// store/cart.js
export const useCartStore = defineStore('cart', { state: () => ({ items: [] }) });

// 使用
import { useUserStore } from './store/user';
import { useCartStore } from './store/cart';
const userStore = useUserStore();
const cartStore = useCartStore();
```

**应用场景**：
- 分离用户和购物车状态。

**原理解析**：
- **实现**：Pinia 天然支持模块化，每个 `defineStore` 创建独立实例，无需额外命名空间。

---

#### **73. Pinia 如何进行 SSR 适配？**
**详细答案：**
- **方法**：
  - 在服务器端初始化状态，客户端恢复。

**代码示例**：
```javascript
// main.js
import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

// 服务器端
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return { app, pinia };
}
```

**应用场景**：
- SSR 项目状态同步。

**原理解析**：
- **实现**：服务器渲染时生成状态快照，客户端通过 `pinia.state` 恢复，依赖 Vue 的 SSR 机制。

---

#### **74. Pinia 如何结合 `Composition API` 进行使用？**
**详细答案：**
- **方法**：
  - 在 `setup` 中直接调用 Store。

**代码示例**：
```vue
<script setup>
import { useStore } from './store';
const store = useStore();
const incrementAndLog = () => {
  store.increment();
  console.log(store.double);
};
</script>
```

**应用场景**：
- 函数式逻辑复用。

**原理解析**：
- **实现**：Pinia 的 Store 是 Composition API 的产物，与 `ref` 和 `reactive` 无缝集成。

---

#### **75. Pinia 的 `storeToRefs` 作用是什么？**
**详细答案：**
- **作用**：
  - 将 Store 的 `state` 和 `getters` 转为 `ref`，保持响应式。

**代码示例**：
```javascript
import { storeToRefs } from 'pinia';
import { useStore } from './store';
export default {
  setup() {
    const store = useStore();
    const { count, double } = storeToRefs(store); // 解构保持响应式
    return { count, double };
  },
};
```

**应用场景**：
- 解构 Store 属性时避免失去响应性。

**原理解析**：
- **实现**：`storeToRefs` 遍历 Store 属性，调用 `toRef` 创建独立 `ref`，绑定到原始响应式对象。

### **七、Vue 3 性能优化（10 题）**

#### **76. Vue 3 如何进行响应式性能优化？**
**详细答案：**
Vue 3 的响应式系统基于 `Proxy`，优化方法包括：
- **1. 使用 `shallowRef` 和 `shallowReactive`**：
  - 减少深层响应式代理开销。
- **2. 避免不必要的响应式**：
  - 对静态数据使用普通对象。
- **3. 批量更新**：
  - 使用 `nextTick` 合并 DOM 更新。
- **4. 按需解构**：
  - 使用 `toRefs` 保持响应性。

**代码示例**：
```javascript
import { shallowRef, nextTick } from 'vue';
export default {
  setup() {
    const data = shallowRef({ count: 0 }); // 浅响应
    const update = async () => {
      data.value.count++;
      await nextTick(); // 等待更新
      console.log('更新完成');
    };
    return { data, update };
  },
};
```

**应用场景**：
- 大型数据对象避免深层监听。

**原理解析**：
- **实现**：`Proxy` 拦截对象操作，`shallowRef` 只代理顶层，减少递归开销；`nextTick` 将更新推迟到微任务队列，合并多次修改。

---

#### **77. Vue 3 `shallowRef` 在哪些场景适用？**
**详细答案：**
- **作用**：
  - 创建浅层响应式，仅监听 `.value` 的变化，不代理嵌套对象。
- **适用场景**：
  - 数据结构复杂但仅需监听顶层变化。
  - 性能敏感的大对象。

**代码示例**：
```javascript
import { shallowRef } from 'vue';
export default {
  setup() {
    const state = shallowRef({ count: 0, nested: { value: 1 } });
    state.value.count++; // 触发更新
    state.value.nested.value = 2; // 不触发
    return { state };
  },
};
```

**应用场景**：
- 大型配置对象仅需顶层更新。

**原理解析**：
- **实现**：`shallowRef` 创建一个 `Ref` 对象，仅对 `.value` 应用 `reactive`，嵌套对象保持原始状态，减少依赖收集。

---

#### **78. Vue 3 `defineComponent` 和 `setup` 如何优化？**
**详细答案：**
- **`defineComponent`**：
  - 提供类型推导，减少运行时开销。
- **`setup`**：
  - 集中逻辑，避免不必要的计算。

**代码示例**：
```javascript
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: { msg: String },
  setup(props) {
    const count = ref(0); // 响应式集中定义
    return { count };
  },
});
```

**应用场景**：
- TypeScript 项目优化类型检查。

**原理解析**：
- **实现**：`defineComponent` 是类型辅助函数，编译时优化 props 解析；`setup` 将逻辑集中，减少组件实例的动态绑定。

---

#### **79. Vue 3 `v-memo` 是什么？如何使用？**
**详细答案：**
- **作用**：
  - 缓存模板片段，仅在依赖变化时更新。
- **用法**：
  - 使用 `v-memo` 指令，传入依赖数组。

**代码示例**：
```vue
<template>
  <div v-memo="[count]">
    {{ expensiveComputation() }}
  </div>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(0);
const expensiveComputation = () => {
  console.log('计算');
  return count.value * 2;
};
</script>
```

**应用场景**：
- 昂贵计算的静态内容。

**原理解析**：
- **实现**：编译器生成条件渲染逻辑，比较依赖数组的引用，若无变化则复用上次 VNode。

---

#### **80. Vue 3 如何避免组件的无意义渲染？**
**详细答案：**
- **方法**：
  - 使用 `v-memo`、`shouldComponentUpdate` 或纯函数组件。
  - 优化响应式依赖。

**代码示例**：
```vue
<template>
  <Child :data="staticData" />
</template>
<script setup>
const staticData = { value: 1 }; // 非响应式
</script>
```

**应用场景**：
- 静态子组件避免重复渲染。

**原理解析**：
- **实现**：Vue 3 的 Block Tree 标记动态节点，非响应式数据跳过 diff，`v-memo` 进一步缓存。

---

#### **81. Vue 3 如何优化列表渲染性能？**
**详细答案：**
- **方法**：
  - 使用 `key` 优化 diff。
  - 分页或虚拟滚动处理大数据。

**代码示例**：
```vue
<template>
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</template>
<script setup>
import { ref } from 'vue';
const items = ref([{ id: 1, name: 'A' }, { id: 2, name: 'B' }]);
</script>
```

**应用场景**：
- 长列表渲染。

**原理解析**：
- **实现**：`key` 提供唯一标识，Vue 的 diff 算法通过 `key` 快速定位更新节点，减少 DOM 操作。

---

#### **82. Vue 3 的 `Suspense` 如何提升性能？**
**详细答案：**
- **作用**：
  - 处理异步组件加载，减少阻塞。

**代码示例**：
```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

**应用场景**：
- 延迟加载组件。

**原理解析**：
- **实现**：`Suspense` 异步等待子组件解析，渲染 `fallback`，完成后切换，提升首屏感知性能。

---

#### **83. Vue 3 如何实现 SSR 渲染优化？**
**详细答案：**
- **方法**：
  - 使用 `renderToString` 和预取数据。

**代码示例**：
```javascript
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
const app = createSSRApp(App);
renderToString(app).then((html) => console.log(html));
```

**应用场景**：
- SEO 和首屏加载优化。

**原理解析**：
- **实现**：服务器端生成 HTML，客户端 hydration 接管，预取数据减少二次请求。

---

#### **84. Vue 3 如何优化大规模数据表格渲染？**
**详细答案：**
- **方法**：
  - 使用虚拟滚动，仅渲染可视区域。

**代码示例**：
```vue
<template>
  <div ref="container" style="height: 400px; overflow: auto">
    <div v-for="item in visibleItems" :key="item.id">{{ item.name }}</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
const items = ref(Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` })));
const container = ref(null);
const visibleItems = computed(() => {
  const start = Math.floor(container.value.scrollTop / 20); // 假设每行 20px
  return items.value.slice(start, start + 20);
});
</script>
```

**应用场景**：
- 大型数据表格。

**原理解析**：
- **实现**：虚拟滚动通过滚动事件计算可视范围，渲染部分 DOM，减少内存和计算开销。

---

#### **85. Vue 3 `dynamic import` 如何优化首屏加载？**
**详细答案：**
- **作用**：
  - 动态导入组件，按需加载。

**代码示例**：
```javascript
import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'));
```

**应用场景**：
- 非核心组件延迟加载。

**原理解析**：
- **实现**：`import()` 返回 Promise，构建工具（如 Vite）将其拆分为单独 chunk，运行时按需加载。

### **八、Vue 3 生态与周边（15 题）**

#### **86. Vue 3 + TypeScript 如何搭配使用？**
**详细答案：**
Vue 3 提供了原生 TypeScript 支持，搭配方式包括：

- **1. 使用 `defineComponent`**：
  - 定义组件并推导类型。
- **2. Props 类型声明**：
  - 使用 `PropType` 或接口。
- **3. Composition API**：
  - `ref` 和 `reactive` 支持类型推导。

**代码示例**：
```typescript
import { defineComponent, ref } from 'vue';
interface User {
  name: string;
  age: number;
}
export default defineComponent({
  props: {
    user: { type: Object as () => User, required: true },
  },
  setup(props) {
    const count = ref<number>(0);
    return { count, user: props.user };
  },
});
```

**应用场景**：
- 类型安全的 Vue 3 项目。

**原理解析**：
- **实现**：Vue 3 核心用 TypeScript 重写，`defineComponent` 提供类型上下文，`ref` 通过泛型推导值类型，编译器静态检查确保类型一致。

---

#### **87. Vue 3 与 Vite 配合的优势有哪些？**
**详细答案：**
- **1. 快速冷启动**：
  - Vite 使用 ES Modules，无需预打包。
- **2. 按需编译**：
  - 只编译当前使用的文件。
- **3. HMR（热更新）**：
  - 更快、更精准的模块替换。
- **4. 轻量配置**：
  - 默认支持 Vue 3 和 TypeScript。

**代码示例**：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
});
```

**应用场景**：
- 快速开发和构建 Vue 3 项目。

**原理解析**：
- **实现**：Vite 利用浏览器原生 ESM，开发时通过 HTTP 请求加载模块，构建时用 Rollup 打包，减少冗余编译。

---

#### **88. Vue 3 如何结合 Vitest 进行单元测试？**
**详细答案：**
- **方法**：
  - 使用 Vitest（Vite 官方测试工具）配置测试环境。

**代码示例**：
```javascript
// test/example.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent);
    expect(wrapper.text()).toContain('Hello');
  });
});

// vite.config.js
import vue from '@vitejs/plugin-vue';
export default {
  plugins: [vue()],
  test: { environment: 'jsdom' },
};
```

**应用场景**：
- 测试组件渲染和逻辑。

**原理解析**：
- **实现**：Vitest 基于 Vite 的构建能力，结合 `jsdom` 模拟 DOM，`@vue/test-utils` 提供 Vue 组件测试工具。

---

#### **89. Vue 3 如何结合 TailwindCSS 进行样式管理？**
**详细答案：**
- **方法**：
  - 安装 TailwindCSS 并配置。

**代码示例**：
```javascript
// main.js
import './style.css';

// style.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: { extend: {} },
};
```

**应用场景**：
- 快速实现响应式样式。

**原理解析**：
- **实现**：Tailwind 通过 PostCSS 扫描文件生成工具类，Vue 3 的 SFC（单文件组件）直接使用，构建时按需打包。

---

#### **90. Vue 3 如何与 Electron 结合？**
**详细答案：**
- **方法**：
  - 使用 `vue-cli-plugin-electron-builder` 或 Vite 插件。

**代码示例**：
```javascript
// main.js (Electron 主进程)
const { app, BrowserWindow } = require('electron');
app.on('ready', () => {
  const win = new BrowserWindow();
  win.loadURL('http://localhost:3000'); // Vite 开发服务器
});

// vite.config.js
import vue from '@vitejs/plugin-vue';
export default { plugins: [vue()] };
```

**应用场景**：
- 构建跨平台桌面应用。

**原理解析**：
- **实现**：Electron 提供 Chromium 渲染 Vue 3 应用，Vite 负责开发时热更新，主进程与渲染进程通过 IPC 通信。

---

#### **91. Vue 3 如何在 Web Components 中使用？**
**详细答案：**
- **方法**：
  - 使用 `defineCustomElement` 创建 Web Component。

**代码示例**：
```javascript
import { defineCustomElement } from 'vue';
import MyComponent from './MyComponent.vue';
const CustomElement = defineCustomElement(MyComponent);
customElements.define('my-element', CustomElement);
```

**应用场景**：
- 将 Vue 组件嵌入非 Vue 项目。

**原理解析**：
- **实现**：`defineCustomElement` 将 Vue 组件转为 Web Component，封装生命周期和 Shadow DOM，兼容标准浏览器 API。

---

#### **92. Vue 3 如何使用 PWA 插件？**
**详细答案：**
- **方法**：
  - 使用 Vite 的 `vite-plugin-pwa`。

**代码示例**：
```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';
export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: { name: 'My App', short_name: 'App' },
    }),
  ],
};
```

**应用场景**：
- 离线可用 Web 应用。

**原理解析**：
- **实现**：插件生成 Service Worker 和 Manifest 文件，浏览器缓存资源支持 PWA 功能。

---

#### **93. Vue 3 如何结合 GraphQL？**
**详细答案：**
- **方法**：
  - 使用 `@vue/apollo-composable`。

**代码示例**：
```javascript
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
export default {
  setup() {
    const { result } = useQuery(gql`
      query { user(id: 1) { name } }
    `);
    return { user: result };
  },
};
```

**应用场景**：
- 数据驱动的复杂查询。

**原理解析**：
- **实现**：Apollo 客户端发起 GraphQL 请求，`useQuery` 返回响应式结果，集成 Vue 的 Composition API。

---

#### **94. Vue 3 如何在 SSR (Nuxt 3) 中使用？**
**详细答案：**
- **方法**：
  - 使用 Nuxt 3 框架。

**代码示例**：
```javascript
// pages/index.vue
<template>
  <div>{{ data }}</div>
</template>
<script setup>
const { data } = await useFetch('/api/data');
</script>
```

**应用场景**：
- SEO 和首屏性能优化。

**原理解析**：
- **实现**：Nuxt 3 基于 Vue 3 的 SSR 能力，服务器渲染 HTML，客户端 hydration 接管。

---

#### **95. Vue 3 如何结合微前端架构？**
**详细答案：**
- **方法**：
  - 使用 `qiankun` 或 Module Federation。

**代码示例**：
```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
createApp(App).mount('#app');

// qiankun 配置
export async function bootstrap() {}
export async function mount(props) {
  createApp(App).mount(props.container);
}
export async function unmount() {}
```

**应用场景**：
- 多团队协作的大型应用。

**原理解析**：
- **实现**：`qiankun` 加载子应用，Vue 3 组件作为独立模块运行，共享状态通过 props 或事件。

---

#### **96. Vue 3 如何使用 UnoCSS 进行极致优化？**
**详细答案：**
- **方法**：
  - 安装 UnoCSS 并配置。

**代码示例**：
```javascript
// vite.config.js
import UnoCSS from 'unocss/vite';
export default {
  plugins: [UnoCSS()],
};

// 使用
<div class="text-red-500 p-4">Hello</div>
```

**应用场景**：
- 轻量级样式管理。

**原理解析**：
- **实现**：UnoCSS 按需生成原子 CSS，Vite 集成实时编译，减少冗余样式。

---

#### **97. Vue 3 如何结合 Zustand 进行全局状态管理？**
**详细答案：**
- **方法**：
  - 安装 Zustand 并在 Vue 中使用。

**代码示例**：
```javascript
import create from 'zustand';
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default {
  setup() {
    const { count, increment } = useStore();
    return { count, increment };
  },
};
```

**应用场景**：
- 轻量状态管理替代 Pinia。

**原理解析**：
- **实现**：Zustand 使用独立的状态容器，Vue 通过订阅更新保持响应性。

---

#### **98. Vue 3 如何结合 Firebase 进行后端数据管理？**
**详细答案：**
- **方法**：
  - 使用 Firebase SDK。

**代码示例**：
```javascript
import { ref } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
export default {
  setup() {
    const db = getDatabase();
    const data = ref(null);
    onValue(dbRef(db, 'path'), (snapshot) => {
      data.value = snapshot.val();
    });
    return { data };
  },
};
```

**应用场景**：
- 实时数据同步。

**原理解析**：
- **实现**：Firebase 提供实时数据库，Vue 通过 `ref` 响应式绑定数据变化。

---

#### **99. Vue 3 如何实现国际化（i18n）？**
**详细答案：**
- **方法**：
  - 使用 `vue-i18n`。

**代码示例**：
```javascript
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
  locale: 'en',
  messages: { en: { hello: 'Hello' }, zh: { hello: '你好' } },
});
app.use(i18n);

// 组件
<template>
  <div>{{ $t('hello') }}</div>
</template>
```

**应用场景**：
- 多语言应用。

**原理解析**：
- **实现**：`vue-i18n` 创建全局翻译函数，注入组件实例，动态切换语言。

---

#### **100. Vue 3 如何结合 WebAssembly 进行高性能计算？**
**详细答案：**
- **方法**：
  - 加载 WASM 模块并调用。

**代码示例**：
```javascript
export default {
  async setup() {
    const wasm = await WebAssembly.instantiateStreaming(fetch('calc.wasm'));
    const { add } = wasm.instance.exports;
    const result = ref(add(2, 3));
    return { result };
  },
};
```

**应用场景**：
- 复杂计算任务。

**原理解析**：

- **实现**：WASM 提供高性能二进制执行，Vue 通过 JS 调用，`ref` 管理结果。
