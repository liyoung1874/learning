# 前端性能优化热门/经典 50 题（通用版）

## 一、基础性能优化 (1-10)

### 1. 前端性能优化的核心目标是什么？
**答案**：  
提升页面加载速度、渲染效率和用户交互体验，减少资源消耗和阻塞。

**解析**：  
核心指标包括首屏时间（FCP）、首次交互时间（TTI）、最大内容绘制（LCP）和累计布局偏移（CLS）。优化需从网络请求、渲染路径、资源加载和运行时效率入手。面试常考性能指标（如 Web Vitals）和工具（如 Lighthouse）。

---

### 2. 如何减少页面的首屏加载时间？
**答案**：  
1. **减少请求**：合并 CSS/JS，减少 HTTP 请求数。  
2. **压缩资源**：Gzip、Brotli 压缩文件。  
3. **懒加载**：延迟加载非首屏资源（如图片、脚本）。  
4. **CDN 加速**：分布式托管静态资源。  
5. **预加载**：rel="preload" 提前加载关键资源。

**解析**：  
首屏时间影响用户感知，合并请求减少网络开销，压缩降低带宽，懒加载优化非关键资源，CDN 缩短传输距离，预加载提升关键资源优先级。面试常考具体策略和实现。

**示例代码**：
```html
<link rel="preload" href="main.css" as="style">
<img src="below-fold.jpg" loading="lazy">
```

---

### 3. 如何优化浏览器渲染性能？
**答案**：  
1. **减少重排（Reflow）**：避免频繁修改布局属性。  
2. **减少重绘（Repaint）**：使用 transform/opacity 替代 top/left。  
3. **CSS GPU 加速**：利用硬件加速（如 will-change）。  
4. **分层渲染**：提升复杂元素的独立层。

**解析**：  
重排和重绘是渲染瓶颈，批量修改 DOM、使用 CSS 动画替代 JS、开启 GPU 加速可优化。will-change 提前通知浏览器优化渲染层。面试常考渲染原理和优化技巧。

**示例代码**：
```css
.element {
  transform: translateX(100px);
  will-change: transform;
}
```

---

### 4. 如何优化 JavaScript 的执行效率？
**答案**：  
1. **防抖/节流**：减少高频函数调用。  
2. **分片执行**：将长任务拆分为小块。  
3. **Web Worker**：后台线程处理复杂计算。  
4. **避免阻塞**：异步加载脚本（async/defer）。

**解析**：  
JS 执行阻塞主线程，防抖/节流（如 lodash）优化事件，Web Worker 处理大数据，async/defer 避免脚本阻塞解析。面试常考长任务的处理。

**示例代码**：
```javascript
const debounce = (fn, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
};
window.addEventListener('scroll', debounce(() => console.log('scroll'), 200));
```

---

### 5. 如何优化 CSS 的加载和渲染？
**答案**：  
1. **关键 CSS**：内联首屏样式，延迟加载其余。  
2. **压缩**：使用 cssnano 或 PurgeCSS 移除未用样式。  
3. **避免阻塞**：rel="preload" 或 media 查询分载。  
4. **选择器优化**：减少复杂选择器。

**解析**：  
CSS 阻塞渲染，关键 CSS 加速首屏，压缩减少体积，preload 提升优先级，简单选择器降低解析时间。面试常考 CSS 的性能影响。

**示例代码**：
```html
<style>/* 关键 CSS */</style>
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
```

---

### 6. 如何优化图片资源加载？
**答案**：  
1. **格式优化**：使用 WebP/AVIF 替代 PNG/JPG。  
2. **懒加载**：loading="lazy" 或 IntersectionObserver。  
3. **响应式图片**：srcset 和 sizes 属性。  
4. **压缩**：工具如 ImageOptim 或 TinyPNG。

**解析**：  
图片占带宽大头，WebP 体积小，懒加载延迟非首屏图片，响应式适配设备，压缩减少传输量。面试常考图片优化的工具和策略。

**示例代码**：
```html
<img src="image.webp" srcset="image-2x.webp 2x" sizes="(max-width: 600px) 100vw, 50vw" loading="lazy">
```

---

### 7. 如何减少 HTTP 请求的开销？
**答案**：  
1. **合并资源**：雪碧图（Sprite）或打包 JS/CSS。  
2. **内联小资源**：Data URI 或内联 SVG。  
3. **HTTP/2**：多路复用替代 HTTP/1.1。  
4. **缓存**：设置 Cache-Control 和 ETag。

**解析**：  
请求数影响加载速度，合并减少连接，内联避免额外请求，HTTP/2 并行传输，缓存复用资源。面试常考请求优化的实现。

**示例代码**：
```html
<img src="data:image/png;base64,iVBORw0KGgo...">
```

---

### 8. 如何优化 DOM 操作的性能？
**答案**：  
1. **批量操作**：使用 DocumentFragment 合并修改。  
2. **缓存节点**：避免重复查询 DOM。  
3. **虚拟 DOM**：框架（如 Vue/React）优化更新。  
4. **减少层级**：扁平化 DOM 结构。

**解析**：  
DOM 操作触发重排，批量减少回流，缓存提升查询效率，虚拟 DOM 优化 Diff，扁平化降低解析成本。面试常考 DOM 优化的实践。

**示例代码**：
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

---

### 9. 如何优化字体加载性能？
**答案**：  
1. **font-display**：swap 避免 FOIT。  
2. **预加载**：rel="preload" 提前加载。  
3. **子集化**：只加载所需字符（如中文子集）。  
4. **WOFF2**：使用高效压缩格式。

**解析**：  
字体加载影响 FOUT/FOIT，swap 立即显示回退字体，预加载加速加载，子集化减少体积，WOFF2 优于 TTF。面试常考字体优化的策略。

**示例代码**：
```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2">
<style>
@font-face {
  font-family: 'Custom';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}
</style>
```

---

### 10. 如何利用浏览器缓存提升性能？
**答案**：  
1. **ETag/Last-Modified**：验证资源 freshness。  
2. **Cache-Control**：设置缓存策略（如 max-age）。  
3. **版本化**：文件名加 hash（如 main.123.js）。  
4. **Service Worker**：离线缓存。

**解析**：  
缓存减少重复加载，ETag 验证内容，Cache-Control 定义过期，版本化确保更新，Service Worker 提供自定义缓存。面试常考缓存的配置。

**示例代码**：
```nginx
location / {
  add_header Cache-Control "public, max-age=31536000";
}
```

---

## 二、构建与打包优化 (11-20)

### 11. 如何优化 Webpack 的构建性能？
**答案**：  
1. **多线程**：thread-loader 或 HappyPack。  
2. **缓存**：cache-loader 或 hard-source-webpack-plugin。  
3. **Tree-Shaking**：移除未用代码。  
4. **分片**：SplitChunksPlugin 分割 chunk。

**解析**：  
Webpack 构建慢，多线程加速编译，缓存复用结果，Tree-Shaking 依赖 ESM，分片优化加载。面试常考 Webpack 的配置优化。

**示例代码**：
```javascript
module.exports = {
  optimization: {
    splitChunks: { chunks: 'all' }
  },
  cache: { type: 'filesystem' }
};
```

---

### 12. 如何优化 Vite 的构建性能？
**答案**：  
1. **ESM 开发**：无需打包，秒级启动。  
2. **esbuild 预构建**：快速转换依赖。  
3. **Rollup 生产**：高效打包和 Tree-Shaking。  
4. **缓存**：node_modules/.vite 复用。

**解析**：  
Vite 的 ESM 策略和 esbuild 比 Webpack 快，Rollup 优化生产 bundle，缓存减少重复构建。面试常考 Vite 与传统工具的对比。

**示例代码**：
```javascript
// vite.config.js
export default { build: { minify: 'esbuild' } };
```

---

### 13. 如何分析和优化打包体积？
**答案**：  
1. **分析工具**：webpack-bundle-analyzer 或 rollup-plugin-visualizer。  
2. **Tree-Shaking**：移除未用代码。  
3. **按需加载**：动态 import 和库按需引入。  
4. **压缩**：terser（JS）、cssnano（CSS）。

**解析**：  
分析工具定位大文件，Tree-Shaking 依赖 ESM，按需加载分割代码，压缩减少体积。面试常考体积优化的流程。

**示例代码**：
```javascript
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

---

### 14. 如何实现前端代码分割？
**答案**：  
1. **动态 import**：按需加载模块。  
2. **SplitChunks**：Webpack 分割公共代码。  
3. **manualChunks**：Vite/Rollup 自定义分割。  
4. **路由懒加载**：延迟加载页面。

**解析**：  
代码分割减少首屏 JS，动态 import 生成单独 chunk，SplitChunks 提取 vendor，路由懒加载优化 SPA。面试常考分割的实现。

**示例代码**：
```javascript
const Home = () => import('./Home.js');
module.exports = {
  optimization: { splitChunks: { chunks: 'all' } }
};
```

---

### 15. 如何优化第三方库的加载？
**答案**：  
1. **按需引入**：只导入所需模块（如 lodash-es）。  
2. **CDN 加载**：外部托管库文件。  
3. **Tree-Shaking**：移除未用代码。  
4. **异步加载**：动态加载非关键库。

**解析**：  
第三方库体积大，按需引入减少冗余，CDN 降低本地 bundle，Tree-Shaking 优化 ESM 库，异步加载延迟执行。面试常考库的优化。

**示例代码**：
```javascript
import { debounce } from 'lodash-es';
const lib = () => import('large-lib');
```

---

### 16. 如何优化 CSS 的构建体积？
**答案**：  
1. **按需加载**：CSS Modules 或 scoped。  
2. **压缩**：cssnano 或 clean-css。  
3. **移除未用 CSS**：PurgeCSS 或 unocss。  
4. **提取关键 CSS**：critical 工具。

**解析**：  
CSS 冗余增加体积，按需加载限制作用域，压缩减少字节，PurgeCSS 移除未用样式，关键 CSS 优化首屏。面试常考 CSS 构建的工具。

**示例代码**：
```javascript
const PurgeCSS = require('purgecss-webpack-plugin');
module.exports = {
  plugins: [new PurgeCSS({ paths: glob.sync('src/**/*') })]
};
```

---

### 17. 如何优化构建时的内存使用？
**答案**：  
1. **分片构建**：SplitChunks 或 manualChunks。  
2. **清理依赖**：移除未用模块。  
3. **限制并行**：调整 worker 数量。  
4. **缓存**：利用构建缓存。

**解析**：  
大型项目构建耗内存，分片减少单次加载，清理降低开销，限制并行避免崩溃，缓存复用结果。面试常考内存优化的配置。

**示例代码**：
```javascript
module.exports = {
  optimization: { splitChunks: { maxSize: 200000 } }
};
```

---

### 18. 如何使用预渲染提升性能？
**答案**：  
使用工具（如 prerender-spa-plugin）生成静态 HTML，或采用 SSG（如 Gatsby）。

**解析**：  
预渲染在构建时生成页面，减少客户端渲染，提升首屏速度和 SEO。适合内容稳定的页面。面试常考预渲染与 SSR 的区别。

**示例代码**：
```javascript
const PrerenderSPAPlugin = require('prerender-spa-plugin');
module.exports = {
  plugins: [new PrerenderSPAPlugin({ routes: ['/'] })]
};
```

---

### 19. 如何优化生产环境的资源压缩？
**答案**：  
1. **JS 压缩**：terser 或 uglify-js。  
2. **CSS 压缩**：cssnano。  
3. **图片压缩**：imagemin 或 squoosh。  
4. **HTML 压缩**：html-minifier。

**解析**：  
压缩减少传输量，terser 优化 JS，cssnano 处理 CSS，imagemin 压缩图片，html-minifier 精简 HTML。面试常考压缩的配置。

**示例代码**：
```javascript
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  optimization: { minimizer: [new TerserPlugin()] }
};
```

---

### 20. 如何优化构建时的环境变量？
**答案**：  
使用 .env 文件区分开发/生产环境，通过 process.env 或 import.meta.env 访问。

**解析**：  
环境变量管理配置（如 API URL），减少硬编码，提升灵活性。Webpack 用 dotenv，Vite 用 import.meta.env。面试常考变量管理的实践。

**示例代码**：
```bash
# .env
API_URL=https://api.example.com
```

```javascript
console.log(process.env.API_URL); // Webpack
console.log(import.meta.env.VITE_API_URL); // Vite
```

---

## 三、运行时优化 (21-35)

### 21. 如何优化前端的事件处理性能？
**答案**：  
1. **防抖/节流**：减少高频触发。  
2. **事件委托**：绑定到父元素。  
3. **移除监听**：unload 时清理。  
4. **Passive 事件**：优化滚动性能。

**解析**：  
高频事件（如 scroll）耗性能，防抖/节流控制频率，委托减少监听器，清理避免泄漏，passive 提升滚动流畅性。面试常考事件优化。

**示例代码**：
```javascript
document.addEventListener('scroll', () => console.log('scroll'), { passive: true });
```

---

### 22. 如何优化前端的长列表渲染？
**答案**：  
1. **虚拟列表**：仅渲染可视区域。  
2. **分页加载**：分批请求数据。  
3. **IntersectionObserver**：懒加载列表项。  
4. **key 优化**：确保高效 Diff。

**解析**：  
长列表（如万级）生成过多 DOM，虚拟列表计算视口，分页减少加载，IntersectionObserver 按需渲染，key 提升更新效率。面试常考虚拟列表原理。

**示例代码**：
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.textContent = 'Loaded';
  });
});
observer.observe(document.querySelector('.item'));
```

---

### 23. 如何优化前端的动画性能？
**答案**：  
1. **CSS 动画**：transform/opacity 利用 GPU。  
2. **requestAnimationFrame**：平滑 JS 动画。  
3. **避免重排**：隔离动画元素。  
4. **分层优化**：will-change 创建新层。

**解析**：  
动画影响 FPS，CSS 由 GPU 处理，requestAnimationFrame 优化帧率，避免重排减少开销，分层提升复杂动画。面试常考动画优化。

**示例代码**：
```css
.animate {
  transform: translateX(100px);
  animation: move 1s ease-in-out;
  will-change: transform;
}
```

---

### 24. 如何优化前端的内存使用？
**答案**：  
1. **清理监听**：移除事件监听器。  
2. **弱引用**：WeakMap/WeakSet 管理对象。  
3. **销毁对象**：置为 null 释放引用。  
4. **避免闭包泄漏**：检查作用域。

**解析**：  
内存泄漏源于未清理的引用，事件清理避免残留，弱引用不阻止 GC，销毁释放内存，闭包需谨慎管理。面试常考内存管理的实践。

**示例代码**：
```javascript
let obj = { data: new Array(10000) };
obj = null; // 释放引用
```

---

### 25. 如何优化前端的网络请求性能？
**答案**：  
1. **缓存**：ETag 或 Cache-Control。  
2. **合并请求**：批量 API 调用。  
3. **预取**：rel="prefetch" 提前加载。  
4. **HTTP/2**：多路复用。

**解析**：  
网络请求耗时长，缓存减少重复请求，合并降低开销，预取加速后续页面，HTTP/2 优化传输。面试常考请求优化的实现。

**示例代码**：
```html
<link rel="prefetch" href="next-page.html">
```

---

### 26. 如何优化前端的表单性能？
**答案**：  
1. **防抖**：延迟输入处理。  
2. **懒更新**：减少实时校验。  
3. **分片渲染**：复杂表单分组件。  
4. **缓存结果**：复用计算值。

**解析**：  
表单输入触发频繁更新，防抖降低频率，懒更新减少渲染，分片优化加载，缓存提升效率。面试常考表单优化的场景。

**示例代码**：
```javascript
const handleInput = debounce((value) => console.log(value), 300);
input.addEventListener('input', (e) => handleInput(e.target.value));
```

---

### 27. 如何优化前端的 WebSocket 性能？
**答案**：  
1. **心跳检测**：保持连接活跃。  
2. **数据压缩**：减少传输量。  
3. **批量发送**：合并消息。  
4. **重连策略**：指数退避。

**解析**：  
WebSocket 实时通信耗资源，心跳避免断连，压缩优化带宽，批量减少请求，重连防止频繁尝试。面试常考实时应用的优化。

**示例代码**：
```javascript
const ws = new WebSocket('ws://example.com');
ws.onopen = () => setInterval(() => ws.send('ping'), 30000);
```

---

### 28. 如何优化前端的 SSR 性能？
**答案**：  
1. **预取数据**：服务端提前加载。  
2. **缓存**：页面级或组件级缓存。  
3. **静态生成**：SSG 替代动态 SSR。  
4. **分片水合**：客户端按需激活。

**解析**：  
SSR 提升首屏和 SEO，预取减少请求，缓存降低压力，SSG 适合静态页面，分片优化水合。面试常考 SSR 的优化。

**示例代码**：
```javascript
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com').then(res => res.json());
  return { props: { data } };
}
```

---

### 29. 如何优化前端的 PWA 性能？
**答案**：  
1. **Service Worker**：缓存资源。  
2. **Manifest**：优化离线体验。  
3. **懒加载**：延迟非关键资源。  
4. **推送优化**：减少通知频率。

**解析**：  
PWA 提升离线和加载性能，Service Worker 缓存文件，Manifest 配置应用，懒加载减少初次加载。面试常考 PWA 的优化。

**示例代码**：
```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('v1').then(cache => cache.addAll(['/'])));
});
```

---

### 30. 如何优化前端的长任务（Long Task）？
**答案**：  
1. **分片执行**：拆分为小任务。  
2. **Web Worker**：后台线程处理。  
3. **requestIdleCallback**：空闲时执行。  
4. **async/await**：异步化操作。

**解析**：  
长任务阻塞主线程，分片和 Worker 异步处理，requestIdleCallback 利用空闲时间，async 避免同步阻塞。面试常考长任务的优化。

**示例代码**：
```javascript
requestIdleCallback(() => {
  // 执行非紧急任务
});
```

---

### 31. 如何优化前端的移动端性能？
**答案**：  
1. **轻量化**：减少 JS/CSS 体积。  
2. **触摸优化**：touch 事件替代 click。  
3. **适配 DPR**：高清屏优化。  
4. **网络适配**：处理弱网环境。

**解析**：  
移动端资源有限，轻量化提升加载，触摸事件减少 300ms 延迟，DPR 优化清晰度，弱网需缓存和重试。面试常考移动端优化。

**示例代码**：
```html
<div ontouchstart="handleTouch()"></div>
```

---

### 32. 如何优化前端的 SEO 性能？
**答案**：  
1. **SSR/预渲染**：生成静态 HTML。  
2. **meta 标签**：动态设置 title/description。  
3. **sitemap**：提交搜索引擎。  
4. **快速加载**：优化首屏时间。

**解析**：  
SPA 不利于爬虫，SSR/预渲染提供内容，meta 提升索引，sitemap 加速收录，加载速度影响排名。面试常考 SEO 优化。

**示例代码**：
```html
<meta name="description" content="Frontend Optimization">
```

---

### 33. 如何优化前端的 CDN 资源加载？
**答案**：  
1. **SRI**：Subresource Integrity 验证完整性。  
2. **预加载**：rel="preload" 提前加载。  
3. **回退机制**：本地 fallback。  
4. **多域名**：并行加载。

**解析**：  
CDN 加速资源，SRI 确保未被篡改，预加载提升优先级，回退保证可用性，多域名突破连接限制。面试常考 CDN 的优化。

**示例代码**：
```html
<script src="https://cdn.example.com/lib.js" integrity="sha256-xxx" crossorigin="anonymous"></script>
```

---

### 34. 如何优化前端的浏览器兼容性性能？
**答案**：  
1. **Polyfill**：按需加载兼容代码。  
2. **特性检测**：避免无效执行。  
3. **降级处理**：提供备用方案。  
4. **压缩后缀**：现代浏览器优先。

**解析**：  
兼容性影响性能，Polyfill 针对旧浏览器，特性检测减少冗余，降级保证体验，压缩优化传输。面试常考兼容性优化。

**示例代码**：
```javascript
if ('fetch' in window) {
  fetch('/api');
} else {
  // Polyfill 或降级
}
```

---

### 35. 如何优化前端的实时数据性能？
**答案**：  
1. **WebSocket**：高效双向通信。  
2. **SSE**：服务端推送优化。  
3. **数据压缩**：减少传输量。  
4. **增量更新**：只更新变化部分。

**解析**：  
实时数据（如聊天）耗资源，WebSocket/SSE 优于轮询，压缩降低带宽，增量更新减少渲染。面试常考实时优化的技术。

**示例代码**：
```javascript
const source = new EventSource('/events');
source.onmessage = (e) => console.log(e.data);
```

---

## 四、工具与调试优化 (36-50)

### 36. 如何使用 Chrome DevTools 优化性能？
**答案**：  
1. **Performance**：分析渲染和 JS 执行。  
2. **Network**：检查请求时间和资源。  
3. **Memory**：定位内存泄漏。  
4. **Lighthouse**：生成性能报告。

**解析**：  
DevTools 是性能调试核心，Performance 记录时间线，Network 优化请求，Memory 分析堆，Lighthouse 提供建议。面试常考工具的使用。

---

### 37. 如何使用 Lighthouse 优化前端性能？
**答案**：  
运行 Lighthouse，分析 FCP、LCP、CLS，提供优化建议（如压缩、延迟加载）。

**解析**：  
Lighthouse 评估性能、SEO 和最佳实践，生成详细报告，指导优化。面试常考其指标和改进措施。

---

### 38. 如何使用 Webpack Bundle Analyzer 优化打包？
**答案**：  
生成可视化报告，分析模块体积，定位优化点。

**解析**：  
Bundle Analyzer 显示依赖大小，帮助移除冗余代码或分割 chunk。面试常考打包分析的实践。

**示例代码**：
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
};
```

---

### 39. 如何使用 Performance API 监控性能？
**答案**：  
利用 performance.timing 和 performance.mark 测量关键时间点。

**解析**：  
Performance API 提供精确的时间数据（如 DOMContentLoaded），自定义 mark 监控特定操作。面试常考监控的实现。

**示例代码**：
```javascript
performance.mark('start');
// 操作
performance.mark('end');
performance.measure('duration', 'start', 'end');
console.log(performance.getEntriesByName('duration'));
```

---

### 40. 如何使用 requestAnimationFrame 优化动画？
**答案**：  
替代 setInterval，同步浏览器刷新率执行动画。

**解析**：  
requestAnimationFrame 确保 60 FPS，减少掉帧，比 setInterval 更高效。面试常考动画优化的原理。

**示例代码**：
```javascript
function animate() {
  element.style.transform = `translateX(${x++}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

### 41. 如何使用 IntersectionObserver 优化懒加载？
**答案**：  
监听元素进入视口，按需加载内容。

**解析**：  
IntersectionObserver 替代 scroll 监听，异步检测可见性，优化图片或组件加载。面试常考懒加载的现代实现。

**示例代码**：
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.src = entry.target.dataset.src;
  });
});
observer.observe(img);
```

---

### 42. 如何使用 Web Worker 优化计算性能？
**答案**：  
将复杂计算移至后台线程，避免阻塞主线程。

**解析**：  
Web Worker 适合大数据处理（如排序），独立运行，不影响 UI。面试常考 Worker 的使用场景。

**示例代码**：
```javascript
// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
};

// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => console.log(e.data);
```

---

### 43. 如何使用 Service Worker 优化离线性能？
**答案**：  
缓存资源，提供离线访问，加速二次加载。

**解析**：  
Service Worker 拦截请求，缓存静态文件，支持 PWA 离线体验。面试常考其生命周期和缓存策略。

**示例代码**：
```javascript
// sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
```

---

### 44. 如何使用 Preload 和 Prefetch 优化资源加载？
**答案**：  
- **Preload**：提前加载当前页面关键资源。  
- **Prefetch**：预加载下一页资源。

**解析**：  
Preload 提升当前页面速度，Prefetch 利用空闲时间加载后续资源。面试常考两者的区别和应用。

**示例代码**：
```html
<link rel="preload" href="main.js" as="script">
<link rel="prefetch" href="next-page.js">
```

---

### 45. 如何使用 Critical CSS 优化首屏渲染？
**答案**：  
提取首屏关键 CSS 内联，延迟加载其余样式。

**解析**：  
Critical CSS 减少渲染阻塞，工具（如 critical）自动提取，提升 FCP。面试常考关键 CSS 的实现。

**示例代码**：
```html
<style>/* 内联关键 CSS */</style>
<link rel="stylesheet" href="full.css" media="print" onload="this.media='all'">
```

---

### 46. 如何使用 requestIdleCallback 优化非关键任务？
**答案**：  
在浏览器空闲时执行低优先级任务。

**解析**：  
requestIdleCallback 避免阻塞主线程，适合日志记录或数据预处理。面试常考其与 setTimeout 的区别。

**示例代码**：
```javascript
requestIdleCallback(() => {
  console.log('Idle task');
}, { timeout: 2000 });
```

---

### 47. 如何使用 PerformanceObserver 监控性能？
**答案**：  
监听特定性能条目（如 LCP、CLS），实时分析。

**解析**：  
PerformanceObserver 提供动态监控，优于一次性查询，适合长期性能跟踪。面试常考监控工具的使用。

**示例代码**：
```javascript
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => console.log(entry));
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

---

### 48. 如何使用 Browser Timing API 优化加载？
**答案**：  
分析 navigationStart 到 loadEventEnd 的时间线，优化关键阶段。

**解析**：  
Timing API 提供加载各阶段耗时（如 DNS、TCP），帮助定位瓶颈。面试常考时间线的解读。

**示例代码**：
```javascript
const { navigationStart, loadEventEnd } = performance.timing;
console.log(`Load time: ${loadEventEnd - navigationStart}ms`);
```

---

### 49. 如何使用 Chrome Memory 工具优化内存？
**答案**：  
记录堆快照，分析内存分配，定位泄漏。

**解析**：  
Memory 面板显示对象引用，Heap Snapshot 追踪泄漏，Allocation Profile 分析分配。面试常考内存调试的流程。

---

### 50. 如何综合优化大型前端应用的性能？
**答案**：  
1. **懒加载**：延迟加载非关键资源。  
2. **代码分割**：按需加载模块。  
3. **缓存策略**：优化网络和浏览器缓存。  
4. **运行时优化**：虚拟化、防抖、Worker。  
5. **工具分析**：Lighthouse、DevTools 持续监控。

**解析**：  
大型应用需全面优化，懒加载和分割减少初次加载，缓存提升复用，运行时优化流畅性，工具提供数据支持。面试常考综合优化的思路。

**示例代码**：
```javascript
const LazyComp = () => import('./Comp.js');
```





# 前端性能优化热门/经典 50 题（Vue 3 生态）

## 一、基础性能优化 (1-10)

### 1. 前端性能优化的核心目标是什么？
**答案**：  
提升页面加载速度、渲染效率和用户交互体验，减少资源消耗和阻塞。

**解析**：  
性能优化关注首屏时间（FCP）、交互时间（TTI）和流畅性（如 FPS）。核心指标包括减少网络请求、优化渲染路径、降低 CPU/GPU 负载。Vue 3 项目中，需结合编译优化（如 Tree-Shaking）和运行时效率（如 Proxy）。面试常考优化的衡量标准和工具（如 Lighthouse）。

---

### 2. 如何减少 Vue 3 项目的首屏加载时间？
**答案**：  
1. **路由懒加载**：动态 import 分割路由代码。  
2. **异步组件**：defineAsyncComponent 延迟加载。  
3. **预渲染/SSR**：生成静态 HTML。  
4. **CDN 加速**：托管静态资源。  
5. **Tree-Shaking**：移除未用代码。

**解析**：  
首屏时间（FCP）影响用户留存，懒加载和异步组件减少初始 JS 体积，SSR/预渲染提供即时内容，CDN 降低延迟，Tree-Shaking 优化 bundle。Vite 的 ESM 支持天然加速这些策略。面试常考具体实施和效果评估。

**示例代码**：
```javascript
// 路由懒加载
const routes = [{ path: '/', component: () => import('./Home.vue') }];

// 异步组件
import { defineAsyncComponent } from 'vue';
const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'));
```

---

### 3. Vue 3 的 Tree-Shaking 如何实现并优化打包体积？
**答案**：  
基于 ES Modules，Vue 3 的 API（如 ref）按需导入，Vite/Rollup 移除未用代码。

**解析**：  
Tree-Shaking 依赖静态分析，需使用 ESM 格式，sideEffects 配置标记副作用文件。Vue 3 的模块化设计和 Vite 的 Rollup 构建天然支持，减少 bundle 体积。面试常考其条件（如无副作用）和配置。

**示例代码**：
```javascript
// 只导入 ref，未打包 reactive
import { ref } from 'vue';
const count = ref(0);

// vite.config.js
export default { build: { rollupOptions: { output: { manualChunks: { vue: ['vue'] } } } } };
```

---

### 4. 如何优化 Vue 3 项目中的大型列表渲染？
**答案**：  
1. **虚拟列表**：使用 vue-virtual-scroller，仅渲染可视区域。  
2. **分页加载**：分批请求数据。  
3. **key 优化**：为 v-for 添加唯一 key。

**解析**：  
大型列表（如万级数据）生成过多 DOM 节点，虚拟列表通过计算可视区域渲染少量节点，分页减少初次加载，key 确保 Diff 高效。面试常考虚拟列表的原理（视口计算）和实现。

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

### 5. Vue 3 的 v-once 和 v-memo 如何提升性能？
**答案**：  
- **v-once**：组件或元素只渲染一次，不随数据更新。  
- **v-memo**：缓存条件渲染，仅依赖变化时更新。

**解析**：  
v-once 适合静态内容（如版权声明），避免不必要 Diff。v-memo 类似 React.memo，缓存动态但不频繁更新的节点，依赖数组控制更新。面试常考其与渲染优化的关系和边界。

**示例代码**：
```vue
<div v-once>{{ staticData }}</div>
<div v-memo="[value1, value2]">{{ computedData }}</div>
```

---

### 6. 如何在 Vue 3 中减少不必要的重新渲染？
**答案**：  
1. **v-once/v-memo**：限制更新范围。  
2. **shallowRef**：减少深层响应。  
3. **shouldComponentUpdate**：自定义更新逻辑。  
4. **key**：优化 v-for Diff。

**解析**：  
Vue 3 的 Proxy 可能触发多余渲染，v-once/v-memo 控制静态部分，shallowRef 限制深度，key 确保高效更新，自定义逻辑需手动实现。面试常考渲染优化的具体场景。

**示例代码**：
```javascript
import { shallowRef } from 'vue';
const data = shallowRef({ nested: { count: 0 } });
data.value.nested.count = 1; // 不触发更新
```

---

### 7. Vue 3 的 keep-alive 如何优化性能？
**答案**：  
缓存组件实例，避免重复渲染，支持 include/exclude/max 配置。

**解析**：  
keep-alive 保存 DOM 和状态，切换时复用，减少创建/销毁开销。max 限制缓存数量，适合路由切换场景。面试常考其与内存管理的权衡。

**示例代码**：
```vue
<keep-alive include="Home,About" max="10">
  <router-view />
</keep-alive>
```

---

### 8. 如何优化 Vue 3 项目中的图片资源？
**答案**：  
1. **格式优化**：使用 WebP/AVIF。  
2. **懒加载**：loading="lazy" 或 IntersectionObserver。  
3. **CDN 托管**：加速加载。  
4. **压缩**：vite-plugin-imagemin 处理。

**解析**：  
图片占资源大头，WebP 体积小，懒加载延迟非首屏图片，CDN 降低延迟，压缩减少带宽。面试常考图片优化的工具和策略。

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

### 9. 如何在 Vue 3 中实现代码分割？
**答案**：  
结合 Vite，使用动态 import 分割路由、组件或库。

**解析**：  
动态 import 生成单独 chunk，Vite 的 rollupOptions.manualChunks 自定义分割策略，减少首屏 JS 体积。面试常考代码分割的配置和效果。

**示例代码**：
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ['vue', 'vue-router'] } }
    }
  }
};

// 路由
const Home = () => import('./Home.vue');
```

---

### 10. 如何优化 Vue 3 的计算属性？
**答案**：  
1. **明确依赖**：仅依赖必要数据。  
2. **避免复杂计算**：拆分或移到方法。  
3. **缓存利用**：依赖不变时复用结果。

**解析**：  
计算属性自动缓存，优于方法调用，但复杂逻辑可能阻塞渲染。明确依赖减少不必要触发，拆分提升可维护性。面试常考其与 watch 的性能对比。

**示例代码**：
```javascript
import { computed } from 'vue';
const count = ref(0);
const double = computed(() => count.value * 2); // 缓存
```

---

## 二、构建与打包优化 (11-20)

### 11. Vite 如何提升 Vue 3 项目的构建性能？
**答案**：  
1. **ESM 开发**：无需打包，秒级启动。  
2. **esbuild 预构建**：快速转换依赖。  
3. **Rollup 生产**：高效打包和 Tree-Shaking。

**解析**：  
Vite 的 ESM 策略利用浏览器解析模块，esbuild 比 Webpack 快 10-100 倍，Rollup 优化生产 bundle。面试常考 Vite 与 Webpack 的构建对比。

**示例代码**：
```javascript
// vite.config.js
export default { plugins: [vue()] };
```

---

### 12. 如何分析和优化 Vue 3 项目的打包体积？
**答案**：  
1. **分析工具**：vite-bundle-analyzer 或 rollup-plugin-visualizer。  
2. **Tree-Shaking**：移除未用代码。  
3. **按需加载**：动态 import 和库按需引入。  
4. **压缩**：terser 和 imagemin。

**解析**：  
分析工具生成可视化报告，定位大文件；Tree-Shaking 依赖 ESM，按需加载分割代码，压缩减少体积。面试常考体积优化的流程和工具。

**示例代码**：
```javascript
import { visualizer } from 'rollup-plugin-visualizer';
export default {
  plugins: [visualizer({ open: true })],
  build: { minify: 'terser' }
};
```

---

### 13. 如何在 Vue 3 项目中使用 CDN 优化打包？
**答案**：  
1. **HTML 引入**：index.html 添加 CDN 链接。  
2. **Vite 配置**：external 排除依赖。  
3. **动态加载**：script 标签注入。

**解析**：  
CDN 减少本地 bundle 体积，需确保版本兼容和回退机制。Vite 的 external 配置与 CDN 配合无缝。面试常考 CDN 的配置和部署。

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

### 14. 如何在 Vite 中优化生产构建？
**答案**：  
1. **压缩**：启用 minify（如 terser）。  
2. **分割**：manualChunks 分离 vendor。  
3. **CDN**：external 排除依赖。  
4. **缓存**：利用浏览器缓存。

**解析**：  
Terser 压缩 JS，manualChunks 优化 chunk 结构，CDN 减少本地资源，缓存头（如 ETag）提升二次加载。面试常考生产环境的完整优化。

**示例代码**：
```javascript
export default {
  build: {
    minify: 'terser',
    rollupOptions: {
      output: { manualChunks: { vendor: ['vue'] } }
    }
  }
};
```

---

### 15. 如何在 Vue 3 中实现按需加载第三方库？
**答案**：  
使用动态 import 或构建工具插件（如 unplugin-auto-import）按需引入。

**解析**：  
按需加载（如 Element Plus 的 ElButton）减少未用代码，Vite 支持自动导入和 Tree-Shaking。面试常考第三方库的体积优化。

**示例代码**：
```javascript
// main.js
import { ElButton } from 'element-plus';
app.component(ElButton.name, ElButton);

// vite.config.js
import AutoImport from 'unplugin-auto-import/vite';
export default {
  plugins: [AutoImport({ imports: ['vue', 'vue-router'] })]
};
```

---

### 16. 如何优化 Vue 3 项目的大型构建时间？
**答案**：  
1. **并行构建**：Vite 的 esbuild 加速。  
2. **缓存**：利用 Vite 依赖缓存。  
3. **分割模块**：manualChunks 和懒加载。  
4. **移除冗余**：Tree-Shaking 和 dead code elimination。

**解析**：  
构建时间影响开发效率，esbuild 比 tsc 快，缓存复用预构建结果，分割减少单次编译量。面试常考构建优化的配置。

**示例代码**：
```javascript
export default {
  build: {
    rollupOptions: { output: { manualChunks: { vendor: ['vue'] } } }
  }
};
```

---

### 17. 如何在 Vue 3 中使用预渲染提升性能？
**答案**：  
使用 vite-plugin-prerender 或 Nuxt，生成静态 HTML。

**解析**：  
预渲染在构建时生成页面，减少客户端渲染时间，提升首屏速度和 SEO。Vite 插件简单，Nuxt 提供完整 SSR/SSG 方案。面试常考预渲染与 SSR 的区别。

**示例代码**：
```javascript
// vite.config.js
import prerender from 'vite-plugin-prerender';
export default {
  plugins: [prerender({ routes: ['/', '/about'] })]
};
```

---

### 18. 如何在 Vue 3 中优化 CSS 体积？
**答案**：  
1. **按需加载**：CSS Modules 或 scoped。  
2. **压缩**：Vite 内置 cssnano。  
3. **移除未用 CSS**：PurgeCSS 或 unocss。

**解析**：  
scoped 限制样式作用域，按需加载减少冗余，cssnano 压缩代码，PurgeCSS 移除未用样式。面试常考 CSS 优化的工具和实现。

**示例代码**：
```javascript
// vite.config.js
import PurgeCSS from 'vite-plugin-purgecss';
export default {
  plugins: [PurgeCSS()]
};
```

---

### 19. 如何在 Vite 中配置环境变量以优化构建？
**答案**：  
使用 .env 文件区分开发/生产环境，import.meta.env 访问。

**解析**：  
环境变量管理配置（如 API URL），减少硬编码，Vite 只暴露 VITE_ 前缀变量。面试常考环境管理的性能和安全性。

**示例代码**：
```bash
# .env.development
VITE_API_URL=http://localhost:3000
# .env.production
VITE_API_URL=https://api.example.com
```

```javascript
console.log(import.meta.env.VITE_API_URL);
```

---

### 20. 如何在 Vue 3 中优化服务端渲染（SSR）性能？
**答案**：  
1. **预取数据**：asyncData 或 fetch 提前加载。  
2. **缓存**：页面级或组件级缓存（如 redis）。  
3. **静态生成**：nuxt generate 替代动态 SSR。

**解析**：  
SSR 提升首屏速度和 SEO，预取减少客户端请求，缓存降低服务端压力，静态生成适合内容不变的页面。面试常考 SSR 的优化策略。

**示例代码**：
```javascript
export default {
  asyncData() {
    return fetch('/api').then(res => res.json());
  }
};
```

---

## 三、运行时优化 (21-35)

### 21. 如何在 Vue 3 中优化表单性能？
**答案**：  
1. **懒绑定**：v-model.lazy 减少更新。  
2. **防抖**：输入事件延迟处理。  
3. **分片渲染**：复杂表单分组件加载。

**解析**：  
表单频繁输入触发渲染，懒绑定和防抖降低频率，分片减少单次渲染开销。面试常考表单优化的实现和场景。

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

### 22. 如何在 Vue 3 中优化事件监听？
**答案**：  
1. **防抖/节流**：减少高频触发。  
2. **移除监听**：onUnmounted 清理。  
3. **事件委托**：绑定到父元素。

**解析**：  
高频事件（如 scroll）影响性能，防抖/节流控制频率，清理避免内存泄漏，委托减少监听器数量。面试常考事件管理的优化。

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

### 23. 如何在 Vue 3 中优化组件加载？
**答案**：  
1. **异步组件**：defineAsyncComponent 延迟加载。  
2. **Suspense**：提供加载状态。  
3. **条件渲染**：v-if 控制加载时机。

**解析**：  
异步组件分割代码，Suspense 提升体验，条件渲染避免不必要加载。面试常考组件优化的策略和实现。

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

### 24. 如何在 Vue 3 中优化内存使用？
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

### 25. 如何在 Vue 3 中实现懒加载？
**答案**：  
1. **路由懒加载**：动态 import 路由组件。  
2. **组件懒加载**：defineAsyncComponent。  
3. **图片懒加载**：loading="lazy" 或 IntersectionObserver。

**解析**：  
懒加载延迟非关键资源，路由和组件通过 Promise 分割代码，图片使用浏览器原生支持或自定义逻辑。面试常考懒加载的实现和首屏优化。

**示例代码**：
```javascript
const LazyComp = defineAsyncComponent(() => import('./Comp.vue'));
<img src="large.jpg" loading="lazy" />;
```

---

### 26. Vue 3 的 Suspense 如何优化异步加载？
**答案**：  
Suspense 处理异步组件或数据，提供 #default 和 #fallback 插槽，显示加载状态。

**解析**：  
结合 defineAsyncComponent 或 Promise，Suspense 捕获异步操作，优化用户体验。面试常考其与懒加载的协作。

**示例代码**：
```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
<script setup>
import { defineAsyncComponent } from 'vue';
const AsyncComponent = defineAsyncComponent(() => import('./Async.vue'));
</script>
```

---

### 27. 如何在 Vue 3 中优化路由切换性能？
**答案**：  
1. **keep-alive**：缓存路由组件。  
2. **懒加载**：动态 import 路由。  
3. **scrollBehavior**：优化滚动体验。

**解析**：  
keep-alive 复用组件实例，懒加载减少初次加载，scrollBehavior 提升导航流畅性。面试常考路由优化的综合应用。

**示例代码**：
```javascript
const router = createRouter({
  scrollBehavior: () => ({ top: 0 }),
  routes: [{ path: '/', component: () => import('./Home.vue') }]
});
```

---

### 28. 如何在 Vue 3 中优化 watch 的性能？
**答案**：  
1. **精确依赖**：只监听必要数据。  
2. **deep 控制**：避免不必要深度监听。  
3. **debounce**：延迟执行回调。

**解析**：  
watch 默认浅监听，deep 增加开销，debounce 减少高频触发。面试常考 watch 与 watchEffect 的性能对比。

**示例代码**：
```javascript
import { watch, ref } from 'vue';
import { debounce } from 'lodash';
const count = ref(0);
watch(count, debounce((newVal) => console.log(newVal), 300));
```

---

### 29. 如何在 Vue 3 中优化大量 DOM 操作？
**答案**：  
1. **虚拟 DOM**：利用 Vue 的 Diff 算法。  
2. **批量更新**：使用 nextTick 合并操作。  
3. **Fragment**：减少包装节点。

**解析**：  
虚拟 DOM 优化批量更新，nextTick 等待 DOM 更新完成，Fragment 减少层级。面试常考 DOM 操作的优化技巧。

**示例代码**：
```javascript
import { nextTick } from 'vue';
const updateDOM = async () => {
  // 多处修改
  await nextTick();
  console.log('DOM updated');
};
```

---

### 30. 如何在 Vue 3 中优化 Pinia 的性能？
**答案**：  
1. **getters 缓存**：计算结果复用。  
2. **$patch 批量**：减少更新次数。  
3. **模块化**：按需加载 store。

**解析**：  
getters 类似 computed 缓存结果，$patch 合并 state 修改，模块化避免全局加载。面试常考状态管理的优化。

**示例代码**：
```javascript
import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  getters: { double: (state) => state.count * 2 },
  actions: { update() { this.$patch({ count: 1 }); } }
});
```

---

### 31. 如何在 Vue 3 中优化动态组件？
**答案**：  
1. **缓存**：keep-alive 保存实例。  
2. **懒加载**：defineAsyncComponent。  
3. **条件渲染**：v-if 控制创建。

**解析**：  
动态组件（如 <component :is>）频繁切换耗性能，缓存复用实例，懒加载延迟加载，条件渲染减少开销。面试常考动态组件的优化。

**示例代码**：
```vue
<keep-alive>
  <component :is="currentComp" />
</keep-alive>
<script setup>
const currentComp = defineAsyncComponent(() => import('./Comp.vue'));
</script>
```

---

### 32. 如何在 Vue 3 中优化 Teleport 的性能？
**答案**：  
1. **条件渲染**：v-if 控制 Teleport 创建。  
2. **静态内容**：v-once 减少更新。  
3. **事件管理**：清理绑定事件。

**解析**：  
Teleport 移动 DOM 到 body，条件渲染避免不必要实例，v-once 优化静态节点，事件清理防止泄漏。面试常考 Teleport 的性能影响。

**示例代码**：
```vue
<Teleport to="body" v-if="show">
  <div v-once>Modal</div>
</Teleport>
```

---

### 33. 如何在 Vue 3 中优化复杂动画？
**答案**：  
1. **CSS 动画**：利用 GPU 加速。  
2. **requestAnimationFrame**：平滑 JS 动画。  
3. **条件执行**：仅在必要时触发。

**解析**：  
CSS 使用 transform/opacity 由 GPU 处理，requestAnimationFrame 优化 JS 帧率，条件执行减少开销。面试常考动画的性能优化。

**示例代码**：
```vue
<div :class="{ animate: active }"></div>
<style>
.animate { transition: transform 0.3s; transform: translateX(100px); }
</style>
```

---

### 34. 如何在 Vue 3 中优化大量数据的响应式？
**答案**：  
1. **shallowReactive**：浅层监听。  
2. **markRaw**：标记非响应式。  
3. **分片处理**：分页或虚拟化。

**解析**：  
大量数据（如万级对象）全响应式耗性能，shallowReactive 限制深度，markRaw 跳过 Proxy，分片减少初次处理。面试常考响应式的性能边界。

**示例代码**：
```javascript
import { shallowReactive, markRaw } from 'vue';
const state = shallowReactive({ data: markRaw(largeArray) });
```

---

### 35. 如何在 Vue 3 中优化 SSR 的客户端水合？
**答案**：  
1. **一致性**：确保服务端和客户端渲染一致。  
2. **预取数据**：提前加载关键数据。  
3. **分片水合**：按需激活组件。

**解析**：  
水合（hydration）匹配 DOM 和状态，一致性避免错误，预取减少二次请求，分片优化大型页面。面试常考 SSR 的客户端优化。

**示例代码**：
```javascript
export default {
  asyncData({ $http }) {
    return $http.get('/api').then(res => ({ data: res.data }));
  }
};
```

---

## 四、工具与调试优化 (36-50)

### 36. 如何使用 Vue Devtools 优化性能？
**答案**：  
检查组件渲染时间、状态变化和事件触发，定位瓶颈。

**解析**：  
Vue Devtools 的 Performance 面板记录渲染耗时，Components 面板显示更新频率，适合调试复杂组件。面试常考工具的实际应用。

---

### 37. 如何使用 Lighthouse 优化 Vue 3 项目？
**答案**：  
运行 Lighthouse，分析 FCP、LCP、CLS，提供优化建议（如压缩资源、延迟加载）。

**解析**：  
Lighthouse 是 Chrome 内置工具，评估性能、SEO 和最佳实践，生成详细报告。面试常考其指标和改进措施。

**示例代码**：
```bash
# Chrome DevTools -> Lighthouse -> Generate report
```

---

### 38. 如何使用 Browser Profiler 定位性能瓶颈？
**答案**：  
记录 JS 执行时间，分析函数调用栈，优化耗时操作。

**解析**：  
Chrome 的 Performance 面板记录 CPU 使用，定位慢函数（如复杂计算）。面试常考 Profiler 的使用和优化。

---

### 39. 如何在 Vue 3 中使用 nextTick 优化 DOM 更新？
**答案**：  
nextTick 等待 DOM 更新完成，合并多次操作。

**解析**：  
Vue 的更新是异步的，nextTick 确保在下一次微任务执行操作，避免重复更新。面试常考其与同步更新的区别。

**示例代码**：
```javascript
import { nextTick } from 'vue';
const update = async () => {
  count.value++;
  await nextTick();
  console.log(document.querySelector('.count'));
};
```

---

### 40. 如何在 Vue 3 中优化 WebSocket 性能？
**答案**：  
1. **心跳检测**：保持连接活跃。  
2. **数据压缩**：减少传输量。  
3. **批量发送**：合并消息。

**解析**：  
WebSocket 实时通信耗资源，心跳避免断连，压缩（如 gzip）优化带宽，批量减少请求数。面试常考实时应用的优化。

**示例代码**：
```javascript
const ws = new WebSocket('ws://example.com');
ws.onopen = () => setInterval(() => ws.send('ping'), 30000);
```

---

### 41. 如何在 Vue 3 中优化 CDN 资源加载？
**答案**：  
1. **SRI**：Subresource Integrity 验证完整性。  
2. **预加载**：rel="preload" 提前加载。  
3. **回退机制**：本地 fallback。

**解析**：  
SRI 确保资源未被篡改，预加载提升加载优先级，回退保证可用性。面试常考 CDN 的性能和安全性。

**示例代码**：
```html
<script src="https://cdn.jsdelivr.net/npm/vue@3" integrity="sha256-xxx" crossorigin="anonymous" rel="preload"></script>
```

---

### 42. 如何在 Vue 3 中优化长任务（Long Task）？
**答案**：  
1. **分片执行**：将任务拆分为小块。  
2. **Web Worker**：后台线程处理。  
3. **requestIdleCallback**：空闲时执行。

**解析**：  
长任务阻塞主线程，影响 TTI，分片和 Worker 异步处理，requestIdleCallback 利用空闲时间。面试常考长任务的优化。

**示例代码**：
```javascript
const worker = new Worker('worker.js');
worker.postMessage(largeData);
```

---

### 43. 如何在 Vue 3 中优化字体加载？
**答案**：  
1. **font-display**：swap 避免 FOIT。  
2. **预加载**：rel="preload" 提前加载。  
3. **子集化**：只加载所需字符。

**解析**：  
字体加载影响 FOUT/FOIT，swap 立即显示回退字体，预加载加速加载，子集化减少体积。面试常考字体优化的策略。

**示例代码**：
```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2">
<style>
@font-face {
  font-family: 'Custom';
  src: url('font.woff2');
  font-display: swap;
}
</style>
```

---

### 44. 如何在 Vue 3 中优化网络请求？
**答案**：  
1. **缓存**：ETag 或 Cache-Control。  
2. **合并请求**：批量 API 调用。  
3. **预取**：rel="prefetch" 提前加载。

**解析**：  
缓存减少重复请求，合并降低网络开销，预取加速后续页面。面试常考请求优化的实现。

**示例代码**：
```javascript
axios.get('/api', { headers: { 'If-None-Match': etag } });
```

---

### 45. 如何在 Vue 3 中优化 PWA 的性能？
**答案**：  
1. **Service Worker**：缓存资源。  
2. **Manifest**：优化离线体验。  
3. **懒加载**：延迟非关键资源。

**解析**：  
PWA 提升离线和加载性能，Service Worker 缓存静态文件，Manifest 配置应用信息，懒加载减少初次加载。面试常考 PWA 的优化。

**示例代码**：
```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';
export default {
  plugins: [VitePWA({ registerType: 'autoUpdate' })]
};
```

---

### 46. 如何在 Vue 3 中优化浏览器缓存？
**答案**：  
1. **ETag/Last-Modified**：验证资源 freshness。  
2. **Cache-Control**：设置缓存策略。  
3. **版本化**：文件名加 hash。

**解析**：  
缓存减少重复加载，ETag 验证内容，Cache-Control 定义过期，版本化确保更新。面试常考缓存的配置和效果。

**示例代码**：
```nginx
location / {
  add_header Cache-Control "public, max-age=31536000";
}
```

---

### 47. 如何在 Vue 3 中优化移动端性能？
**答案**：  
1. **轻量化**：减少 JS/CSS 体积。  
2. **触摸优化**：touch 事件替代 click。  
3. **适配 DPR**：处理高清屏。

**解析**：  
移动端资源有限，轻量化提升加载，触摸事件减少 300ms 延迟，DPR 优化清晰度。面试常考移动端的优化点。

**示例代码**：
```vue
<div @touchstart="handleTouch"></div>
```

---

### 48. 如何在 Vue 3 中优化 SEO 性能？
**答案**：  
1. **SSR/预渲染**：生成静态 HTML。  
2. **meta 标签**：动态设置 title/description。  
3. **sitemap**：提交搜索引擎。

**解析**：  
SPA 不利于爬虫，SSR/预渲染提供内容，meta 提升索引，sitemap 加速收录。面试常考 SEO 与性能的平衡。

**示例代码**：
```vue
<script setup>
import { useHead } from '@vueuse/head';
useHead({ title: 'My App', meta: [{ name: 'description', content: 'Vue 3 App' }] });
</script>
```

---

### 49. 如何在 Vue 3 中优化构建时的内存使用？
**答案**：  
1. **分片构建**：manualChunks 分割。  
2. **清理依赖**：移除未用模块。  
3. **限制并行**：调整 Vite worker。

**解析**：  
大型项目构建耗内存，分片减少单次加载，清理依赖降低开销，限制并行避免崩溃。面试常考构建内存的优化。

**示例代码**：
```javascript
export default {
  build: { rollupOptions: { maxParallelFileOps: 10 } }
};
```

---

### 50. 如何在 Vue 3 中优化大型单页应用的性能？
**答案**：  
1. **懒加载**：路由和组件延迟加载。  
2. **状态管理**：Pinia 模块化。  
3. **虚拟化**：处理长列表。  
4. **分片渲染**：按需加载内容。

**解析**：  
SPA 随规模增长变慢，懒加载减少初次加载，Pinia 优化状态，虚拟化处理大数据，分片提升渲染效率。面试常考 SPA 的综合优化。

**示例代码**：
```javascript
const routes = [{ path: '/', component: () => import('./Home.vue') }];
```



## **一、页面加载优化（10 题）**

### 1. **首屏加载优化有哪些方法？**
**详细答案**：

#### **1.1 减少关键资源体积**
- **方法**：对 HTML、CSS、JS 文件进行压缩，使用 Gzip 或 Brotli 压缩传输。
- **原理**：资源体积直接影响网络传输时间和浏览器解析速度。Gzip 可将文本资源压缩 70%-80%，Brotli 更高效（压缩率高 10%-20%），减少 TTFB（Time to First Byte）和下载时间。
- **实现**：
  - **服务端配置**（如 Nginx）：
    ```nginx
    gzip on;
    gzip_min_length 1000; # 小于 1KB 的文件不压缩
    gzip_types text/html text/css application/javascript;
    # Brotli（需额外模块）
    brotli on;
    brotli_types text/html text/css application/javascript;
    ```
  - **构建工具**（如 Webpack 的 `compression-webpack-plugin`）：
    ```javascript
    const CompressionPlugin = require('compression-webpack-plugin');
    module.exports = {
      plugins: [
        new CompressionPlugin({
          algorithm: 'brotliCompress',
          test: /\.(js|css|html)$/,
          threshold: 1024, // 超过 1KB 压缩
        }),
      ],
    };
    ```
- **场景**：适用于所有静态资源，尤其是大型 JS 库（如 React、Vue）或 CSS 框架。
- **效果**：假设原始文件 500KB，Gzip 后约 150KB，Brotli 后约 120KB，加载时间从 1s 降至 300ms（视网络条件）。

#### **1.2 关键渲染路径优化**
- **方法**：将首屏所需 CSS 内联到 `<head>`，非首屏 CSS/JS 延迟加载。
- **原理**：关键渲染路径（Critical Rendering Path, CRP）是浏览器从接收 HTML 到绘制首屏的最短路径。外部 CSS 和同步 JS 会阻塞解析和渲染，内联和延迟加载可缩短 CRP。
- **实现**：
  ```html
  <head>
    <!-- 内联首屏 CSS -->
    <style>.hero { font-size: 20px; color: #fff; }</style>
    <!-- 非首屏 CSS 异步加载 -->
    <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
    <!-- JS 延迟加载 -->
    <script src="main.js" defer></script>
  </head>
  ```
- **细节**：
  - `media="print"`：初始加载不阻塞，`onload` 后应用样式。
  - `defer`：脚本下载不阻塞，DOMContentLoaded 后执行。
- **场景**：适用于 SPA（单页应用）或内容密集型页面，如电商首页。
- **效果**：白屏时间从 2s 缩短至 1s，FCP 提升 50%。

#### **1.3 服务端渲染（SSR）**
- **方法**：通过服务端直接生成并返回完整的 HTML。
- **原理**：客户端无需等待 JS 下载和执行即可渲染内容，缩短白屏时间和 FCP。
- **实现**（以 Next.js 为例）：
  ```javascript
  // pages/index.js
  export async function getServerSideProps() {
    const data = await fetch('https://api.example.com/data');
    return { props: { data: await data.json() } };
  }
  export default function Home({ data }) {
    return <div>{data.title}</div>;
  }
  ```
- **细节**：服务端预取数据并嵌入 HTML，客户端只需 hydrate（激活）。
- **场景**：SEO 需求高的网站（如新闻、博客）或首屏数据复杂的应用。
- **效果**：相比 CSR（客户端渲染），首屏时间从 3s 降至 1.5s。

#### **1.4 懒加载（Lazy Loading）**
- **方法**：对非首屏图片、视频等资源延迟加载。
- **原理**：减少首屏请求数和数据量，仅加载可视区域资源，提升初始加载速度。
- **实现**：
  - **HTML 原生支持**：
    ```html
    <img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="Image">
    ```
  - **JavaScript 实现**：
    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img[data-src]');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });
      images.forEach(img => observer.observe(img));
    });
    ```
- **场景**：长页面（如文章页）或图片密集型网站（如图库）。
- **效果**：首屏请求数从 20 个降至 5 个，加载时间减少 60%。

#### **1.5 预加载（Preload）**
- **方法**：使用 `<link rel="preload">` 提前加载关键资源。
- **原理**：浏览器在解析 HTML 时并行加载资源，减少后续等待时间。
- **实现**：
  ```html
  <head>
    <link rel="preload" href="critical.css" as="style" onload="this.rel='stylesheet'">
    <link rel="preload" href="hero-image.jpg" as="image">
  </head>
  ```
- **细节**：`as` 属性指定资源类型，`onload` 可动态调整用途。
- **场景**：首屏依赖的大型图片、字体或脚本。
- **效果**：关键资源加载时间从串行 1s 变为并行 500ms。

#### **1.6 CDN 加速**
- **方法**：通过内容分发网络（CDN）分发静态资源。
- **原理**：CDN 将资源缓存到全球边缘节点，减少物理距离和网络延迟。
- **实现**：将资源 URL 改为 CDN 地址，如 `https://cdn.example.com/main.js`。
- **场景**：面向全球用户的网站，如社交媒体或电商平台。
- **效果**：TTFB 从 300ms 降至 100ms，加载速度提升 2-3 倍。

#### **综合效果**：
- 优化后，首屏时间可从 5s 降至 1-2s，用户留存率提升 20%-30%。

---

### 2. **如何减少关键资源的阻塞？**
**详细答案**：

#### **2.1 CSS 优化**
- **方法**：将首屏 CSS 内联到 `<head>`，非首屏 CSS 异步加载。
- **原理**：外部 CSS 文件会阻塞渲染，直到下载和解析完成。内联避免请求开销，异步加载推迟非必要样式。
- **实现**：
  ```html
  <head>
    <style>/* 内联首屏 CSS */ .hero { background: #000; color: #fff; }</style>
    <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
  </head>
  ```
- **细节**：
  - 内联 CSS 体积应控制在 10KB 以内，避免增加 HTML 大小。
  - `media="print"` 初始不阻塞，`onload` 后应用。
- **场景**：首屏样式简单但后续样式复杂的页面。
- **效果**：渲染阻塞时间从 500ms 降至 0ms。

#### **2.2 JS 优化**
- **方法**：使用 `<script defer>` 或 `<script async>`。
- **原理**：
  - `defer`：脚本下载不阻塞 HTML 解析，DOMContentLoaded 后按顺序执行。
  - `async`：脚本下载和执行完全异步，不保证顺序。
- **实现**：
  ```html
  <script src="main.js" defer></script>
  <script src="analytics.js" async></script>
  ```
- **细节**：
  - `defer` 适合依赖 DOM 或顺序执行的脚本。
  - `async` 适合独立脚本（如统计工具）。
- **场景**：`defer` 用于核心逻辑，`async` 用于第三方插件。
- **效果**：解析阻塞时间从 1s 降至 100ms。

#### **2.3 减少文件数量**
- **方法**：合并 CSS 和 JS 文件，减少 HTTP 请求。
- **原理**：每个请求都有 DNS 解析、TCP 连接和 TLS 握手开销（约 100-300ms），合并文件减少这些开销。
- **实现**（Webpack 配置）：
  ```javascript
  module.exports = {
    entry: { app: './src/index.js' },
    output: { filename: 'bundle.js' },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  };
  ```
- **场景**：小型项目或资源较少的页面。
- **效果**：请求数从 10 个降至 3 个，加载时间减少 500ms。

#### **2.4 动态加载**
- **方法**：通过 JS 动态创建 `<script>` 标签，按需加载。
- **原理**：动态脚本默认异步，避免阻塞主线程。
- **实现**：
  ```javascript
  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }
  loadScript('lazy.js');
  ```
- **场景**：用户交互触发的功能（如点击加载地图）。
- **效果**：首屏 JS 加载量减少 80%。

#### **综合效果**：
- 阻塞时间从 2s 降至 200ms，页面渲染提速显著。

---

### 3. **DNS 解析如何优化？**
**详细答案**：

#### **3.1 使用 DNS 预解析**
- **方法**：通过 `<link rel="dns-prefetch">` 提前解析域名。
- **原理**：DNS 解析将域名转为 IP 地址，耗时 20-200ms。预解析在页面加载早期并行执行，减少后续请求延迟。
- **实现**：
  ```html
  <head>
    <link rel="dns-prefetch" href="//example.com">
    <link rel="dns-prefetch" href="//cdn.example.com">
  </head>
  ```
- **场景**：涉及多个第三方域名的页面（如广告、CDN）。
- **效果**：DNS 解析时间从 100ms 降至 0ms（提前完成）。

#### **3.2 减少域名数量**
- **方法**：集中资源到单一域名，避免分散 DNS 查询。
- **原理**：每个域名需独立解析，多域名增加总解析时间。
- **实现**：将 `cdn1.example.com/style.css` 和 `cdn2.example.com/script.js` 改为 `cdn.example.com/...`。
- **场景**：资源分散在多个子域名的项目。
- **效果**：域名从 5 个减至 1 个，解析时间从 500ms 降至 100ms。

#### **3.3 选择高效 DNS 服务**
- **方法**：使用 Google Public DNS（8.8.8.8）或 Cloudflare（1.1.1.1）。
- **原理**：公共 DNS 服务响应更快、缓存更优，替代默认运营商 DNS。
- **实现**：在客户端或路由器设置 DNS 服务器地址。
- **场景**：面向全球用户或运营商 DNS 较慢的地区。
- **效果**：解析延迟从 150ms 降至 50ms。

#### **3.4 启用 HTTP/2**
- **方法**：使用 HTTP/2 减少对多域名分片（Domain Sharding）的依赖。
- **原理**：HTTP/1.1 下多域名分片可并行请求，但增加 DNS 开销；HTTP/2 多路复用支持单域名高效并发。
- **实现**：服务端配置 HTTP/2（如 Nginx 支持）。
- **场景**：现代 Web 应用。
- **效果**：域名解析总时间减少 50%。

#### **综合效果**：
- DNS 解析总耗时从 1s 降至 200ms，TTFB 提升明显。

---

### 4. **如何优化页面白屏时间？**
**详细答案**：

#### **4.1 优化关键渲染路径**
- **方法**：减少阻塞资源，确保首屏内容优先加载。
- **原理**：白屏时间是从请求到绘制第一个像素的时长，阻塞资源延长 CRP。
- **实现**：
  ```html
  <head>
    <style>.hero { color: #fff; }</style>
    <script src="core.js" defer></script>
  </head>
  ```
- **场景**：依赖大量 JS 的 SPA。
- **效果**：白屏时间从 3s 降至 1s。

#### **4.2 服务端渲染（SSR）**
- **方法**：服务端返回完整 HTML。
- **原理**：客户端直接渲染 HTML，无需等待 JS。
- **实现**（Node.js + Express）：
  ```javascript
  app.get('/', (req, res) => {
    res.send('<html><body><div>Hello</div></body></html>');
  });
  ```
- **场景**：SEO 敏感页面。
- **效果**：白屏时间缩短 50%-70%。

#### **4.3 骨架屏（Skeleton Screen）**
- **方法**：在内容加载前显示占位 UI。
- **原理**：提升感知速度，用户感觉页面“更快”。
- **实现**：
  ```html
  <div class="skeleton"></div>
  <style>.skeleton { background: #eee; height: 100px; animation: pulse 1s infinite; }</style>
  ```
- **场景**：数据加载较慢的页面。
- **效果**：感知白屏时间从 2s 降至 500ms。

#### **4.4 减少 JS 执行时间**
- **方法**：避免同步执行耗时 JS。
- **原理**：主线程执行 JS 会推迟渲染。
- **实现**：
  ```javascript
  setTimeout(() => heavyTask(), 0); // 推迟到下一帧
  ```
- **场景**：初始化逻辑复杂的应用。
- **效果**：渲染提前 300ms。

#### **综合效果**：
- 白屏时间从 4s 降至 1s，用户体验显著提升。

---

### 5. **如何提高 FCP（First Contentful Paint）和 LCP（Largest Contentful Paint）？**
**详细答案**：

#### **5.1 FCP 优化**
- **方法**：
  - 减少 TTFB：优化后端，使用 CDN。
  - 优先加载关键 CSS 和字体。
  - 避免阻塞 JS。
- **原理**：FCP 是首次绘制文本或图片的时间，受服务器响应和资源加载影响。
- **实现**：
  ```html
  <head>
    <style>p { font-family: 'Arial'; }</style>
    <link rel="preload" href="font.woff2" as="font">
    <script src="app.js" defer></script>
  </head>
  ```
- **场景**：文本为主的页面。
- **效果**：FCP 从 2s 降至 800ms。

#### **5.2 LCP 优化**
- **方法**：
  - 优化图片：使用 WebP，设置 `loading="eager"`。
  - 减少 DOM 复杂度：简化首屏结构。
  - 提升渲染性能：使用 `will-change`。
- **原理**：LCP 是最大内容（如主图）绘制时间，受资源加载和渲染效率影响。
- **实现**：
  ```html
  <img src="hero.webp" loading="eager" style="will-change: transform;">
  ```
- **场景**：图片驱动的页面。
- **效果**：LCP 从 3s 降至 1.5s。

#### **综合效果**：
- FCP 和 LCP 优化后，页面核心指标提升，符合 Core Web Vitals 标准。

## **一、页面加载优化（10 题）**

### 6. **如何利用 `defer` 和 `async` 优化 JavaScript 加载？**
**详细答案**：

#### **6.1 `defer` 的作用与实现**
- **方法**：在 `<script>` 标签中使用 `defer` 属性。
- **原理**：`defer` 告诉浏览器在下载脚本时继续解析 HTML，脚本会在 DOMContentLoaded 事件前按顺序执行。这样避免了同步脚本的阻塞问题。
- **实现**：
  ```html
  <head>
    <script src="utils.js" defer></script>
    <script src="main.js" defer></script>
  </head>
  ```
- **细节**：
  - 脚本按声明顺序执行（如 `utils.js` 先于 `main.js`）。
  - 适用于依赖 DOM 或其他脚本的场景。
- **场景**：核心功能脚本（如初始化 DOM 操作的 JS）。
- **效果**：解析阻塞时间从 500ms 降至 0ms，脚本仍有序执行。

#### **6.2 `async` 的作用与实现**
- **方法**：在 `<script>` 标签中使用 `async` 属性。
- **原理**：`async` 使脚本下载和执行完全异步，下载完成后立即执行，不等待 HTML 解析完成，也不保证执行顺序。
- **实现**：
  ```html
  <head>
    <script src="analytics.js" async></script>
    <script src="ads.js" async></script>
  </head>
  ```
- **细节**：
  - 执行顺序不可预测，可能导致依赖问题。
  - 适合独立、无依赖的脚本。
- **场景**：第三方统计工具、广告脚本。
- **效果**：加载时间从串行 1s 变为并行 300ms。

#### **6.3 `defer` vs `async` 的选择**
- **区别**：
  - `defer`：延迟执行，顺序保证，适合模块化代码。
  - `async`：立即执行，无序，适合独立功能。
- **实现对比**：
  ```html
  <!-- defer 示例：依赖 DOM -->
  <script src="dom-script.js" defer></script>
  <!-- async 示例：独立功能 -->
  <script src="tracker.js" async></script>
  ```
- **场景选择**：
  - 用 `defer`：需要操作 DOM 或依赖其他脚本。
  - 用 `async`：无需 DOM 或顺序的插件。

#### **6.4 综合应用**
- **方法**：混合使用 `defer` 和 `async`。
- **实现**：
  ```html
  <head>
    <script src="core.js" defer></script>
    <script src="analytics.js" async></script>
  </head>
  ```
- **效果**：核心逻辑延迟加载不阻塞，统计脚本并行加载，首屏时间缩短 50%。

#### **综合效果**：
- 使用 `defer` 和 `async` 后，JS 加载不再阻塞 HTML 解析，FCP 从 2s 降至 1s。

### 7. **如何优化 HTML 解析，提高页面渲染速度？**
**详细答案**：

#### **7.1 减少 DOM 节点数量**
- **方法**：简化 HTML 结构，避免嵌套过深。
- **原理**：浏览器解析 HTML 时会构建 DOM 树，节点越多解析和渲染越慢。
- **实现**：
  ```html
  <!-- 优化前 -->
  <div><div><div><p>Hello</p></div></div></div>
  <!-- 优化后 -->
  <p>Hello</p>
  ```
- **场景**：复杂组件或长列表页面。
- **效果**：DOM 解析时间从 200ms 降至 50ms。

#### **7.2 内联关键 CSS**
- **方法**：将首屏 CSS 直接写入 `<style>` 标签。
- **原理**：避免外部 CSS 请求阻塞渲染。
- **实现**：
  ```html
  <head>
    <style>.hero { color: #fff; }</style>
  </head>
  ```
- **细节**：CSS 体积控制在 10KB 以内。
- **场景**：首屏样式简单的页面。
- **效果**：渲染提前 300ms。

#### **7.3 延迟非关键资源**
- **方法**：使用 `defer` 或动态加载非必要 JS。
- **原理**：减少主线程阻塞，加速 DOM 构建。
- **实现**：
  ```html
  <script src="lazy.js" defer></script>
  ```
- **场景**：非首屏功能模块。
- **效果**：解析速度提升 20%-30%。

#### **7.4 避免复杂内联脚本**
- **方法**：将耗时 JS 移至外部文件并延迟加载。
- **原理**：内联 `<script>` 会暂停解析，耗时操作延长白屏时间。
- **实现**：
  ```html
  <!-- 优化前 -->
  <script>for(let i=0; i<1000000; i++){}</script>
  <!-- 优化后 -->
  <script src="task.js" defer></script>
  ```
- **场景**：初始化复杂的页面。
- **效果**：白屏时间减少 500ms。

#### **综合效果**：
- HTML 解析和渲染时间从 1s 降至 400ms，页面加载更流畅。

---

### 8. **为什么要使用 SSR（服务端渲染）优化首屏渲染？**
**详细答案**：

#### **8.1 SSR 的基本原理**
- **方法**：服务端生成完整 HTML，直接返回给浏览器。
- **原理**：客户端无需等待 JS 下载和执行即可渲染，缩短白屏时间和 FCP。
- **实现**（以 React + Node.js 为例）：
  ```javascript
  const express = require('express');
  const React = require('react');
  const { renderToString } = require('react-dom/server');
  const App = require('./App');
  
  const app = express();
  app.get('/', (req, res) => {
    const html = renderToString(<App />);
    res.send(`<html><body>${html}</body></html>`);
  });
  app.listen(3000);
  ```
- **细节**：客户端通过 hydration 激活交互。

#### **8.2 对比 CSR（客户端渲染）**
- **CSR 问题**：HTML 为空，需下载 JS 后渲染。
- **SSR 优势**：
  - 首屏内容直接可见。
  - SEO 友好（爬虫可直接抓取）。
- **场景**：新闻网站、电商首页。

#### **8.3 性能提升点**
- **白屏时间**：CSR 需 3s（下载 + 执行），SSR 仅需 1s（TTFB）。
- **FCP**：SSR 提前绘制内容。
- **效果**：首屏加载时间缩短 50%-70%。

#### **8.4 注意事项**
- **服务器压力**：渲染增加 CPU 消耗。
- **解决方案**：结合静态生成（SSG）或缓存。
- **实现**（Next.js SSG）：
  ```javascript
  export async function getStaticProps() {
    return { props: { data: 'Static' } };
  }
  ```

#### **综合效果**：
- SSR 使首屏渲染从 3s 降至 1s，SEO 和用户体验双赢。

---

### 9. **Lazy Loading（懒加载）如何提升性能？**
**详细答案**：

#### **9.1 懒加载的原理**
- **方法**：延迟加载非首屏资源（如图片、视频）。
- **原理**：减少首屏请求数和数据量，仅加载可视区域内容。
- **实现**：
  - **原生支持**：
    ```html
    <img src="placeholder.jpg" data-src="real.jpg" loading="lazy">
    ```
  - **IntersectionObserver**：
    ```javascript
    const images = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    images.forEach(img => observer.observe(img));
    ```

#### **9.2 性能提升点**
- **请求数**：从 20 个降至 5 个。
- **流量**：首屏数据量从 2MB 降至 500KB。
- **加载时间**：缩短 60%-80%。

#### **9.3 应用场景**
- **长页面**：文章、社交媒体动态。
- **资源密集型**：图片库、视频网站。
- **效果**：首屏时间从 4s 降至 1.5s。

#### **9.4 注意事项**
- **SEO**：确保爬虫能访问内容（可配合 SSR）。
- **占位符**：使用低质量图片（如 LQIP）提升体验。
- **实现**：
  ```html
  <img src="low-quality.jpg" data-src="high-quality.jpg" loading="lazy">
  ```

#### **综合效果**：
- 懒加载显著减少首屏负担，用户滚动时加载顺畅。

---

### 10. **如何利用 HTTP/2 或 HTTP/3 提升页面加载速度？**
**详细答案**：

#### **10.1 HTTP/2 的优化特性**
- **多路复用**：同一连接并行处理多个请求。
- **原理**：HTTP/1.1 每次请求需新建 TCP 连接，多路复用减少连接开销。
- **实现**（Nginx 配置）：
  ```nginx
  server {
    listen 443 ssl http2;
    ssl_certificate cert.pem;
    ssl_certificate_key key.pem;
  }
  ```
- **效果**：请求时间从 1s 降至 400ms。

#### **10.2 头部压缩**
- **方法**：HPACK 压缩 HTTP 头。
- **原理**：减少重复头字段（如 Cookie）的传输量。
- **效果**：头部从 1KB 降至 200B。

#### **10.3 服务器推送**
- **方法**：主动推送关键资源。
- **实现**：
  ```nginx
  http2_push /style.css;
  ```
- **场景**：推送首屏 CSS/JS。
- **效果**：资源加载提前 300ms。

#### **10.4 HTTP/3 的优势**
- **UDP 协议**：基于 QUIC，避免 TCP 拥塞控制。
- **零 RTT**：首次连接无需握手。
- **实现**：需服务端和客户端支持（如 Cloudflare CDN）。
- **效果**：TTFB 从 200ms 降至 50ms。

#### **综合效果**：
- HTTP/2 使加载速度提升 30%-50%，HTTP/3 再提速 20%，尤其在高延迟网络下显著。

## **二、JavaScript 代码优化（10 题）**

### 11. **什么是代码拆分（Code Splitting）？如何使用 Webpack 进行拆分？**
**详细答案**：

#### **11.1 定义与原理**
- **定义**：代码拆分是将单一的大型 JS 文件拆分为多个小文件，按需或并行加载的技术。
- **原理**：大型 JS 文件会导致长时间的下载、解析和执行，拆分后首屏只需加载必要代码，其他模块延迟加载，减少初始加载负担。
- **优势**：
  - 缩短首屏加载时间。
  - 提升缓存效率（改动部分单独更新）。
- **场景**：大型 SPA（如 React、Vue 应用）。

#### **11.2 Webpack 实现方法**
##### **11.2.1 动态导入（Dynamic Import）**
- **方法**：使用 `import()` 语法实现按需加载。
- **原理**：`import()` 返回 Promise，Webpack 自动将其拆分为独立 chunk。
- **实现**：
  ```javascript
  // main.js
  document.getElementById('btn').addEventListener('click', () => {
    import('./module.js')
      .then(module => module.default())
      .catch(err => console.error('Load failed', err));
  });
  // module.js
  export default function() {
    console.log('Module loaded');
  }
  ```
- **细节**：
  - Webpack 打包时生成 `0.chunk.js` 等文件。
  - 可结合 `magic comments` 指定 chunk 名：
    ```javascript
    import(/* webpackChunkName: "module" */ './module.js');
    ```
- **场景**：用户交互触发的功能（如点击加载弹窗）。
- **效果**：首屏 JS 从 1MB 降至 200KB。

##### **11.2.2 SplitChunksPlugin**
- **方法**：通过 Webpack 的 `optimization.splitChunks` 配置自动拆分公共模块。
- **原理**：提取多个模块共用的代码（如第三方库）到单独文件，提升复用性。
- **实现**：
  ```javascript
  module.exports = {
    optimization: {
      splitChunks: {
        chunks: 'all', // 拆分同步和异步模块
        minSize: 30000, // 模块大于 30KB 才拆分
        maxSize: 0, // 无上限
        minChunks: 1, // 至少被引用 1 次
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules
            priority: -10,
            name: 'vendors', // 输出文件名为 vendors.js
          },
          default: {
            minChunks: 2, // 至少被 2 个模块引用
            priority: -20,
            reuseExistingChunk: true, // 复用已有 chunk
          },
        },
      },
    },
  };
  ```
- **细节**：生成 `vendors.js`（如 React、Lodash）和按需加载的 chunk。
- **场景**：多页面应用或依赖大量第三方库的项目。
- **效果**：公共代码提取后，总体积减少 20%-40%。

#### **11.3 应用场景**
- **路由拆分**（React 示例）：
  ```javascript
  import React, { lazy, Suspense } from 'react';
  const About = lazy(() => import('./About'));
  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    );
  }
  ```
- **功能模块**：如按需加载图表库（Chart.js）。

#### **综合效果**：
- 首屏加载时间从 3s 降至 1s，缓存命中率提升。

---

### 12. **Tree Shaking 是什么？如何减少无用代码？**
**详细答案**：

#### **12.1 定义与原理**
- **定义**：Tree Shaking 是通过静态分析移除未使用代码（Dead Code）的技术，主要用于 ES6 模块。
- **原理**：ES6 模块是静态的，构建工具（如 Webpack、Rollup）可在编译时分析依赖树，标记未引用代码并剔除。
- **限制**：仅对未使用的导出有效，对动态导入或副作用代码无效。

#### **12.2 实现方法**
##### **12.2.1 使用 ES6 模块**
- **方法**：避免 CommonJS（如 `module.exports`），使用 `import/export`。
- **实现**：
  ```javascript
  // utils.js
  export const used = () => console.log('Used');
  export const unused = () => console.log('Unused');
  // main.js
  import { used } from './utils.js';
  used(); // unused 会被移除
  ```
- **细节**：CommonJS 动态性强，难以静态分析。

##### **12.2.2 Webpack 配置**
- **方法**：启用 `mode: 'production'`，自动触发 Tree Shaking。
- **实现**：
  ```javascript
  module.exports = {
    mode: 'production',
    optimization: {
      usedExports: true, // 标记未使用导出
      minimize: true, // 使用 Terser 移除未标记代码
    },
  };
  ```
- **细节**：`usedExports` 生成标记，`minimize` 执行移除。

##### **12.2.3 声明无副作用**
- **方法**：在 `package.json` 中添加 `sideEffects`。
- **实现**：
  ```json
  {
    "sideEffects": false // 所有模块无副作用
  }
  ```
- **细节**：若有 CSS 或全局修改，设为 `["*.css"]`。

#### **12.3 注意事项**
- **副作用问题**：如 `window.x = 1` 不会被移除。
- **工具对比**：Rollup 比 Webpack 更激进。
- **场景**：大型库（如 Lodash）仅用部分功能。

#### **综合效果**：
- 未使用代码移除后，bundle 体积减少 10%-50%，视项目而定。

---

### 13. **如何减少 JavaScript 运行时的内存占用？**
**详细答案**：

#### **13.1 避免全局变量**
- **方法**：使用块级作用域（`let`、`const`）替代全局变量。
- **原理**：全局变量常驻内存，难以被垃圾回收。
- **实现**：
  ```javascript
  // 优化前
  window.data = new Array(1000000);
  // 优化后
  function process() {
    const data = new Array(1000000);
  }
  ```
- **效果**：内存占用减少 50%。

#### **13.2 及时解除引用**
- **方法**：手动清理大对象或事件监听。
- **原理**：未解除引用的对象无法被 GC（垃圾回收）。
- **实现**：
  ```javascript
  let obj = { data: new Array(1000000) };
  obj = null; // 解除引用
  ```
- **场景**：大数据处理后清理。

#### **13.3 使用 WeakMap/WeakSet**
- **方法**：存储弱引用对象。
- **原理**：WeakMap 不阻止键的垃圾回收。
- **实现**：
  ```javascript
  const map = new WeakMap();
  let obj = { key: 'value' };
  map.set(obj, 'data');
  obj = null; // 可被回收
  ```
- **场景**：缓存临时数据。

#### **13.4 优化数据结构**
- **方法**：使用更高效的数据结构（如 Set 替代 Array 去重）。
- **实现**：
  ```javascript
  // 优化前
  const arr = Array.from(new Set([1, 2, 2, 3])); // 多余数组
  // 优化后
  const set = new Set([1, 2, 2, 3]);
  ```
- **效果**：内存减少 30%。

#### **综合效果**：
- 内存占用从 100MB 降至 20MB，运行更稳定。

---

### 14. **如何优化 JavaScript 执行效率？**
**详细答案**：

#### **14.1 减少循环复杂度**
- **方法**：优化算法，避免嵌套循环。
- **实现**：
  ```javascript
  // 优化前 O(n²)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {}
  }
  // 优化后 O(n)
  const map = new Map();
  arr.forEach(item => map.set(item.id, item));
  ```
- **效果**：执行时间从 500ms 降至 10ms。

#### **14.2 使用位运算**
- **方法**：替代数学运算。
- **实现**：
  ```javascript
  // 优化前
  const isEven = num => num % 2 === 0;
  // 优化后
  const isEvenFast = num => (num & 1) === 0;
  ```
- **场景**：高频计算。

#### **14.3 延迟执行**
- **方法**：使用 `setTimeout` 或 Web Worker。
- **实现**：
  ```javascript
  setTimeout(() => heavyTask(), 0); // 推迟到下一帧
  ```
- **效果**：主线程空闲时间增加。

#### **14.4 避免不必要计算**
- **方法**：缓存结果（记忆化）。
- **实现**：
  ```javascript
  const memoize = fn => {
    const cache = {};
    return x => cache[x] || (cache[x] = fn(x));
  };
  const fib = memoize(n => n <= 2 ? 1 : fib(n-1) + fib(n-2));
  ```
- **效果**：计算时间从指数级降至线性。

#### **综合效果**：
- 执行效率提升 50%-90%，页面响应更快。

---

### 15. **为什么推荐使用 `const` 代替 `var`？**
**详细答案**：

#### **15.1 作用域差异**
- **原理**：
  - `var`：函数作用域，存在变量提升。
  - `const`：块级作用域，无提升。
- **实现**：
  ```javascript
  // var
  if (true) { var x = 1; }
  console.log(x); // 1
  // const
  if (true) { const y = 1; }
  console.log(y); // ReferenceError
  ```

#### **15.2 性能优势**
- **原理**：`const` 不可变性便于引擎优化（如常量折叠）。
- **效果**：微小但累积提升执行速度。

#### **15.3 可维护性**
- **原理**：`const` 防止意外修改，减少 bug。
- **实现**：
  ```javascript
  const config = { api: 'url' };
  // config = {}; // TypeError
  config.api = 'new-url'; // 允许修改对象属性
  ```

#### **15.4 兼容性**
- **场景**：现代项目均支持 ES6，`var` 已过时。

#### **综合效果**：
- 使用 `const` 提高代码安全性，性能略有提升。

---

## **二、JavaScript 代码优化（10 题）**

### 16. **为什么避免使用 `with`、`eval` 和 `document.write`？**
**详细答案**：

#### **16.1 避免使用 `with`**
- **原因**：
  
  - **性能问题**：`with` 改变作用域链，导致引擎无法优化变量查找。
  - **可读性差**：模糊变量来源，增加调试难度。
- **原理**：`with` 将对象属性注入当前作用域，破坏词法作用域的静态分析。
- **实现对比**：
  ```javascript
  // 使用 with
  const obj = { a: 1, b: 2 };
  with (obj) {
    console.log(a + b); // 3
  }
  // 替代方案
  const { a, b } = obj;
  console.log(a + b); // 3
  ```
- **效果**：变量查找从动态解析变为静态，性能提升 10%-20%。
- **场景**：任何需要访问对象属性的地方。

#### **16.2 避免使用 `eval`**
- **原因**：
  - **性能开销**：动态执行字符串，引擎无法提前编译。
  - **安全风险**：易受代码注入攻击。
- **原理**：`eval` 在运行时解析代码，跳过优化阶段。
- **实现对比**：
  ```javascript
  // 使用 eval
  const code = 'console.log(1 + 2)';
  eval(code); // 3
  // 替代方案
  const fn = new Function('console.log(1 + 2)');
  fn(); // 3
  ```
- **细节**：`new Function` 虽也动态，但作用域隔离更安全。
- **效果**：执行时间从 100ms 降至 10ms，安全性提升。
- **场景**：动态逻辑应使用函数或预定义方法。

#### **16.3 避免使用 `document.write`**
- **原因**：
  - **阻塞渲染**：同步写入 DOM，暂停解析。
  - **不可控性**：页面加载后调用会覆盖内容。
- **原理**：`document.write` 是遗留 API，直接操作文档流。
- **实现对比**：
  ```javascript
  // 使用 document.write
  document.write('<p>Hello</p>');
  // 替代方案
  document.body.insertAdjacentHTML('beforeend', '<p>Hello</p>');
  ```
- **效果**：渲染不中断，加载时间缩短 50%-80%。
- **场景**：动态插入内容。

#### **综合效果**：
- 避免这三者后，代码更安全高效，加载和执行速度提升 20%-50%。

---

### 17. **如何优化 JavaScript 事件监听，减少性能损耗？**
**详细答案**：

#### **17.1 事件委托**
- **方法**：将事件监听器绑定到父元素，利用事件冒泡。
- **原理**：减少监听器数量，避免为每个子元素单独绑定。
- **实现**：
  ```javascript
  // 优化前
  document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => console.log(li.textContent));
  });
  // 优化后
  document.querySelector('ul').addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      console.log(e.target.textContent);
    }
  });
  ```
- **场景**：动态列表或大量子元素。
- **效果**：监听器从 100 个降至 1 个，内存减少 90%。

#### **17.2 防抖（Debounce）**
- **方法**：限制高频事件触发频率。
- **原理**：延迟执行，减少不必要计算。
- **实现**：
  ```javascript
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  window.addEventListener('resize', debounce(() => console.log('Resized'), 200));
  ```
- **场景**：resize、scroll、input 事件。
- **效果**：调用频率从 100 次/s 降至 5 次/s。

#### **17.3 节流（Throttle）**
- **方法**：固定时间间隔执行。
- **原理**：确保事件在指定周期内只触发一次。
- **实现**：
  ```javascript
  function throttle(fn, delay) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= delay) {
        fn(...args);
        last = now;
      }
    };
  }
  window.addEventListener('scroll', throttle(() => console.log('Scrolled'), 100));
  ```
- **场景**：连续滚动或鼠标移动。
- **效果**：执行次数减少 80%。

#### **17.4 移除未用监听器**
- **方法**：动态移除不再需要的事件。
- **原理**：避免内存泄漏。
- **实现**：
  ```javascript
  const btn = document.querySelector('button');
  const handler = () => console.log('Clicked');
  btn.addEventListener('click', handler);
  btn.removeEventListener('click', handler); // 移除
  ```
- **场景**：临时组件卸载时。

#### **综合效果**：
- 事件处理性能提升 50%-90%，内存占用显著降低。

---

### 18. **如何避免内存泄漏？**
**详细答案**：

#### **18.1 清理事件监听**
- **方法**：组件卸载时移除监听器。
- **原理**：未移除的监听器保持对 DOM 的引用，阻止 GC。
- **实现**（React 示例）：
  ```javascript
  useEffect(() => {
    const handleResize = () => console.log('Resize');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ```
- **效果**：内存释放率提升 100%。

#### **18.2 避免闭包陷阱**
- **方法**：解除闭包中大对象的引用。
- **原理**：闭包引用外部变量可能导致对象常驻内存。
- **实现**：
  ```javascript
  function createLeak() {
    const bigData = new Array(1000000);
    return () => console.log(bigData.length); // bigData 被闭包引用
  }
  // 优化后
  function noLeak() {
    const bigData = new Array(1000000);
    return () => console.log('Done');
  }
  ```
- **效果**：内存占用减少 50MB。

#### **18.3 使用 WeakMap**
- **方法**：存储弱引用。
- **原理**：WeakMap 的键被 GC 时自动清理。
- **实现**：
  ```javascript
  const cache = new WeakMap();
  let obj = { id: 1 };
  cache.set(obj, 'data');
  obj = null; // 可被回收
  ```
- **场景**：缓存临时对象。

#### **18.4 定时器清理**
- **方法**：清除未使用的定时器。
- **原理**：未清理的定时器保持引用。
- **实现**：
  ```javascript
  const id = setInterval(() => console.log('Tick'), 1000);
  clearInterval(id); // 清理
  ```
- **场景**：动态组件。

#### **综合效果**：
- 内存泄漏减少 90%，应用长期运行更稳定。

---

### 19. **如何使用 Web Worker 进行多线程计算，提高性能？**
**详细答案**：

#### **19.1 Web Worker 原理**
- **方法**：在独立线程中运行耗时任务。
- **原理**：Web Worker 脱离主线程，处理复杂计算不阻塞 UI。
- **实现**：
  ```javascript
  // main.js
  const worker = new Worker('worker.js');
  worker.postMessage({ num: 1000000 });
  worker.onmessage = e => console.log(e.data);
  // worker.js
  self.onmessage = e => {
    const result = heavyTask(e.data.num);
    self.postMessage(result);
  };
  function heavyTask(n) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += i;
    return sum;
  }
  ```

#### **19.2 使用场景**
- **大数据处理**：如数组排序、图像处理。
- **实时计算**：如游戏物理引擎。
- **效果**：主线程空闲，UI 保持 60fps。

#### **19.3 注意事项**
- **通信开销**：通过 `postMessage` 传递数据，需序列化。
- **限制**：无 DOM 访问权限。
- **优化**：传递简单数据结构。

#### **综合效果**：
- 计算任务从主线程移除，页面响应时间从 2s 降至 0s。

---

### 20. **为什么要使用 Virtual DOM？它是如何优化性能的？**
**详细答案**：

#### **20.1 Virtual DOM 原理**
- **方法**：用 JS 对象模拟 DOM，批量更新真实 DOM。
- **原理**：直接操作 DOM 昂贵，Virtual DOM 通过 diff 算法计算最小更新。
- **实现**（简化版）：
  ```javascript
  const vdom = { tag: 'div', children: [{ tag: 'p', text: 'Hello' }] };
  function render(vdom) {
    const el = document.createElement(vdom.tag);
    vdom.children?.forEach(child => el.appendChild(render(child)));
    if (vdom.text) el.textContent = vdom.text;
    return el;
  }
  ```

#### **20.2 性能优化点**
- **批量更新**：一次 commit 替代多次 DOM 操作。
- **Diff 算法**：只更新变化部分。
- **效果**：DOM 操作从 100 次降至 1 次。

#### **20.3 应用场景**
- **React/Vue**：动态 UI 更新。
- **大数据渲染**：列表频繁变化。

#### **20.4 局限性**
- **初次渲染**：略慢于直接 DOM。
- **优化**：配合 key 提高 diff 效率。

#### **综合效果**：
- 更新效率提升 50%-80%，UI 流畅度显著改善。

## **三、渲染优化（10 题）**

### 21. **什么是重排（Reflow）和重绘（Repaint）？如何减少它们的影响？**
**详细答案**：

#### **21.1 定义与原理**
- **重排（Reflow）**：
  - **定义**：当 DOM 的布局或几何属性（如宽高、位置）变化时，浏览器重新计算元素位置和大小的过程。
  - **触发**：修改 `width`、`height`、`margin`、添加/删除元素等。
- **重绘（Repaint）**：
  - **定义**：当元素的外观（如颜色、背景）变化但不影响布局时，浏览器重新绘制元素的过程。
  - **触发**：修改 `color`、`background`、`visibility` 等。
- **原理**：重排必然触发重绘，重绘不一定涉及重排。两者都消耗性能，重排尤其昂贵。

#### **21.2 减少影响的方法**
##### **21.2.1 批量操作 DOM**
- **方法**：使用文档片段（`DocumentFragment`）或缓存 DOM 修改。
- **原理**：减少直接操作真实 DOM 的次数。
- **实现**：
  ```javascript
  // 优化前：多次重排
  const ul = document.querySelector('ul');
  for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li); // 每次 append 触发重排
  }
  // 优化后：一次重排
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  ```
- **效果**：重排从 100 次降至 1 次，性能提升 90%。

##### **21.2.2 避免频繁读写**
- **方法**：分离读写操作，减少布局抖动（Layout Thrashing）。
- **原理**：连续读写（如 `offsetWidth` 后修改 `style`）强制同步重排。
- **实现**：
  ```javascript
  // 优化前：多次重排
  const el = document.querySelector('.box');
  el.style.width = el.offsetWidth + 10 + 'px';
  el.style.height = el.offsetHeight + 10 + 'px';
  // 优化后：一次重排
  const { offsetWidth, offsetHeight } = el;
  el.style.width = offsetWidth + 10 + 'px';
  el.style.height = offsetHeight + 10 + 'px';
  ```
- **效果**：重排次数从 2 次降至 1 次。

##### **21.2.3 使用 CSS 替代 JS**
- **方法**：将样式变化交给 CSS 处理。
- **实现**：
  ```javascript
  // JS 修改
  el.style.left = '100px';
  // CSS 替代
  el.classList.add('move');
  ```
  ```css
  .move { left: 100px; transition: left 0.3s; }
  ```
- **效果**：避免 JS 触发重排，交给浏览器优化。

#### **21.3 应用场景**
- **动态列表**：批量添加元素。
- **动画**：避免布局计算。

#### **综合效果**：
- 重排和重绘耗时从 500ms 降至 50ms，页面流畅度提升。

---

### 22. **如何使用 `will-change` 提前优化 CSS 动画？**
**详细答案**：

#### **22.1 `will-change` 原理**
- **方法**：通过 CSS 属性 `will-change` 提前告知浏览器哪些属性将变化。
- **原理**：浏览器为指定元素创建独立的渲染层（Layer），提前准备 GPU 加速。
- **实现**：
  ```css
  .box {
    will-change: transform;
    transition: transform 0.3s;
  }
  .box:hover {
    transform: translateX(100px);
  }
  ```

#### **22.2 使用注意事项**
- **精确指定**：只声明即将变化的属性（如 `transform`、`opacity`）。
- **避免滥用**：过多使用增加内存占用。
- **动态控制**：
  ```javascript
  const el = document.querySelector('.box');
  el.addEventListener('mouseenter', () => {
    el.style.willChange = 'transform';
  });
  el.addEventListener('animationend', () => {
    el.style.willChange = 'auto'; // 动画结束恢复
  });
  ```

#### **22.3 性能提升点**
- **GPU 加速**：动画直接在合成线程处理，不占用主线程。
- **效果**：帧率从 30fps 提升至 60fps。

#### **22.4 应用场景**
- **复杂动画**：如 3D 变换。
- **交互元素**：如悬停效果。

#### **综合效果**：
- 动画流畅度提升 50%，主线程负担减少。

---

### 23. **为什么建议使用 `transform` 代替 `top/left` 进行动画？**
**详细答案**：

#### **23.1 性能差异**
- **原理**：
  - `top/left`：触发重排和重绘，涉及布局计算。
  - `transform`：仅触发合成（Compositing），由 GPU 处理。
- **实现对比**：
  ```css
  /* top/left */
  .move { top: 100px; left: 100px; transition: all 0.3s; }
  /* transform */
  .move { transform: translate(100px, 100px); transition: transform 0.3s; }
  ```

#### **23.2 渲染流程**
- **`top/left`**：Layout → Paint → Composite。
- **`transform`**：直接 Composite，跳过 Layout 和 Paint。
- **效果**：渲染耗时从 10ms 降至 1ms。

#### **23.3 应用场景**
- **平移动画**：如侧边栏滑动。
- **复杂变换**：旋转、缩放。

#### **23.4 注意事项**
- **兼容性**：`transform` 需添加前缀（如 `-webkit-`）支持旧浏览器。
- **实现**：
  ```css
  transform: translateX(100px);
  -webkit-transform: translateX(100px);
  ```

#### **综合效果**：
- 使用 `transform` 后，动画性能提升 80%-90%，帧率稳定。

---

### 24. **为什么 `position: fixed` 可能会影响性能？**
**详细答案**：

#### **24.1 渲染影响**
- **原理**：`fixed` 元素脱离文档流，浏览器需单独管理其位置，随滚动实时更新。
- **问题**：
  - **重绘开销**：滚动时频繁触发合成。
  - **层级问题**：可能未提升为独立层，导致父元素重绘。

#### **24.2 优化方法**
- **提升为独立层**：
  ```css
  .fixed {
    position: fixed;
    will-change: transform;
    transform: translateZ(0); /* 强制 GPU 加速 */
  }
  ```
- **效果**：从重绘转为合成，性能提升 50%。

#### **24.3 应用场景**
- **导航栏**：固定顶部。
- **弹窗**：固定居中。

#### **24.4 注意事项**
- **移动端**：过多 `fixed` 元素可能导致滚动卡顿。
- **测试**：检查是否触发预期层提升。

#### **综合效果**：
- 优化后，滚动性能从 20fps 提升至 60fps。

---

### 25. **如何使用 `requestAnimationFrame` 进行流畅动画？**
**详细答案**：

#### **25.1 原理**
- **方法**：使用 `requestAnimationFrame` 替代 `setTimeout` 或 `setInterval`。
- **原理**：浏览器在每帧重绘前调用回调（通常 16.7ms/60fps），与显示器刷新率同步。
- **实现**：
  ```javascript
  // setTimeout
  setTimeout(() => el.style.left = parseInt(el.style.left) + 1 + 'px', 16);
  // requestAnimationFrame
  function animate() {
    el.style.left = parseInt(el.style.left) + 1 + 'px';
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  ```

#### **25.2 性能提升**
- **同步刷新**：避免帧丢失。
- **后台暂停**：页面不可见时自动停止。
- **效果**：动画从掉帧（30fps）变为流畅（60fps）。

#### **25.3 应用场景**
- **平滑移动**：如拖拽元素。
- **游戏循环**：实时更新画面。

#### **25.4 优化技巧**
- **节流**：
  ```javascript
  let last = 0;
  function animate(timestamp) {
    if (timestamp - last >= 16) {
      el.style.left = parseInt(el.style.left) + 1 + 'px';
      last = timestamp;
    }
    requestAnimationFrame(animate);
  }
  ```

#### **综合效果**：
- 动画流畅度提升 70%，资源占用减少。

## **三、渲染优化（10 题）**

### 26. **为什么 `visibility: hidden` 比 `display: none` 性能更好？**
**详细答案**:

#### **26.1 原理与差异**
- **定义**:
  - **`display: none`**: 元素从文档流中完全移除，不占用空间，触发重排（Reflow）和重绘（Repaint）。
  - **`visibility: hidden`**: 元素隐藏但保留空间，仅触发重绘，不影响布局。
- **原理**: 重排涉及重新计算整个页面布局，性能开销远高于重绘。
- **性能对比**:
  - `display: none`: Layout → Paint → Composite。
  - `visibility: hidden`: Paint → Composite。

#### **26.2 具体影响**
- **重排成本**: `display: none` 可能导致相邻元素重新排列（如 flex 布局），耗时 10-100ms。
- **重绘成本**: `visibility: hidden` 只更新可见性，耗时 1-10ms。
- **实现**:
  ```css
  /* display: none */
  .hidden { display: none; }
  /* visibility: hidden */
  .visible-hidden { visibility: hidden; }
  ```

#### **26.3 优化场景**
- **频繁切换**: 如果元素需要快速显示/隐藏（如菜单切换），`visibility: hidden` 避免重排。
- **动画效果**: 结合 `opacity` 和 `visibility` 实现平滑过渡。
  ```css
  .fade {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
  }
  .fade.visible {
    opacity: 1;
    visibility: visible;
  }
  ```
- **效果**: 切换时间从 50ms 降至 5ms。

#### **26.4 注意事项**
- **SEO**: `visibility: hidden` 仍被爬虫识别，适合保留内容。
- **子元素**: `visibility: hidden` 可被子元素通过 `visibility: visible` 覆盖。
- **局限性**: 若需移除空间（如动态布局），仍需 `display: none`。

#### **综合效果**:
- 使用 `visibility: hidden` 减少 80%-90% 的布局开销，适合高频切换场景。

---

### 27. **如何减少 DOM 操作，提高渲染性能？**
**详细 answers**:

#### **27.1 批量修改 DOM**
- **方法**: 使用 `DocumentFragment` 或临时容器批量操作。
- **原理**: 每次 DOM 修改（如 `appendChild`）可能触发重排，批量操作合并为一次。
- **实现**:
  ```javascript
  // 优化前：多次重排
  const ul = document.querySelector('ul');
  for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li);
  }
  // 优化后：一次重排
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  ```
- **效果**: 重排从 100 次降至 1 次，耗时从 500ms 降至 50ms。

#### **27.2 缓存 DOM 查询**
- **方法**: 复用已查询的 DOM 节点。
- **原理**: `querySelector` 等操作耗时，缓存减少重复计算。
- **实现**:
  ```javascript
  // 优化前
  document.querySelector('.box').style.width = '100px';
  document.querySelector('.box').style.height = '100px';
  // 优化后
  const box = document.querySelector('.box');
  box.style.width = '100px';
  box.style.height = '100px';
  ```
- **效果**: 查询时间从 10ms 降至 1ms。

#### **27.3 使用 CSS 替代 JS**
- **方法**: 将样式变化交给 CSS 类。
- **原理**: CSS 修改由浏览器优化，效率高于 JS 操作。
- **实现**:
  ```javascript
  // JS 修改
  el.style.background = 'red';
  // CSS 替代
  el.classList.add('active');
  ```
  ```css
  .active { background: red; }
  ```
- **效果**: 样式切换从 5ms 降至 1ms。

#### **27.4 虚拟 DOM**
- **方法**: 使用 React/Vue 的 Virtual DOM。
- **原理**: 批量计算 DOM 差异，减少直接操作。
- **场景**: 动态 UI 更新。

#### **综合效果**:
- DOM 操作效率提升 70%-90%，页面渲染更流畅。

---

### 28. **使用 CSS 变量（`var(--color)`）相比 SCSS 变量有什么优势？**
**详细 answers**:

#### **28.1 CSS 变量的特性**
- **定义**: CSS 自定义属性（`--name`）可在运行时动态修改。
- **实现**:
  ```css
  :root {
    --primary-color: #007bff;
  }
  .button {
    background: var(--primary-color);
  }
  ```
  ```javascript
  // 动态修改
  document.documentElement.style.setProperty('--primary-color', '#ff0000');
  ```

#### **28.2 对比 SCSS 变量**
- **SCSS 变量**:
  - 静态，编译时确定。
  - 无法运行时修改。
  ```scss
  $primary-color: #007bff;
  .button { background: $primary-color; }
  ```
- **CSS 变量优势**:
  - **动态性**: 支持 JS 修改，适合主题切换。
  - **作用域**: 可局部定义（如组件内）。
  - **浏览器支持**: 原生，减少构建依赖。

#### **28.3 性能与灵活性**
- **性能**: CSS 变量解析略慢（微秒级），但动态性弥补不足。
- **实现** (主题切换):
  ```css
  :root {
    --bg: #fff;
  }
  .dark { --bg: #333; }
  body { background: var(--bg); }
  ```
- **效果**: 主题切换无需重载 CSS。

#### **28.4 应用场景**
- **动态主题**: 如暗黑模式。
- **组件化**: 局部样式隔离。

#### **综合效果**:
- CSS 变量提升灵活性，减少 50% 主题切换开销。

---

### 29. **如何利用 GPU 加速提升动画流畅度？**
**detailed answers**:

#### **29.1 GPU 加速原理**
- **方法**: 使用 `transform` 或 `opacity` 等属性触发 GPU 渲染。
- **原理**: GPU 擅长处理矩阵变换，`transform` 跳过 Layout 和 Paint，直接在合成线程处理。

#### **29.2 实现方法**
- **使用 transform**:
  ```css
  .box {
    transform: translateX(0);
    transition: transform 0.3s;
  }
  .box:hover {
    transform: translateX(100px);
  }
  ```
- **触发层提升**:
  ```css
  .box {
    will-change: transform;
    transform: translateZ(0); /* 强制 GPU */
  }
  ```

#### **29.3 注意事项**
- **内存占用**: 过多层增加 GPU 负担。
- **调试**: 使用浏览器 DevTools 检查层。
- **效果**: 帧率从 30fps 提升至 60fps。

#### **29.4 应用场景**
- **复杂动画**: 3D 变换。
- **高频交互**: 拖拽、滚动。

#### **综合效果**:
- 动画性能提升 70%，主线程空闲。

---

### 30. **如何优化大数据表格渲染？**
**detailed answers**:

#### **30.1 虚拟列表**
- **方法**: 只渲染可视区域的行。
- **原理**: 动态计算滚动位置，减少 DOM 节点。
- **实现** (React):
  ```javascript
  import { FixedSizeList } from 'react-window';
  function VirtualTable({ rows }) {
    return (
      <FixedSizeList
        height={400}
        width={600}
        itemCount={rows.length}
        itemSize={35}
      >
        {({ index, style }) => (
          <div style={style}>{rows[index]}</div>
        )}
      </FixedSizeList>
    );
  }
  ```
- **效果**: 渲染从 10000 行降至 10 行，耗时从 5s 降至 100ms。

#### **30.2 分页加载**
- **方法**: 按需加载数据。
- **实现**:
  ```javascript
  let page = 1;
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      loadPage(++page);
    }
  });
  ```
- **效果**: 初始加载时间减少 80%。

#### **30.3 缓存计算**
- **方法**: 缓存列宽、行高。
- **实现**:
  ```javascript
  const cache = new Map();
  function getRowHeight(row) {
    if (!cache.has(row)) {
      cache.set(row, computeHeight(row));
    }
    return cache.get(row);
  }
  ```

#### **综合效果**:
- 表格渲染性能提升 90%，滚动流畅。

## **四、网络优化（10 题）**

### 31. **如何减少 HTTP 请求次数？**
**详细 answers**:

#### **31.1 合并资源文件**
- **方法**: 合并多个 CSS/JS 文件为单一文件。
- **原理**: 每个 HTTP 请求都有 DNS 解析、TCP 连接和 TLS 握手开销（约 100-300ms），合并文件减少请求数。
- **实现** (Webpack 配置):
  ```javascript
  module.exports = {
    entry: {
      app: ['./src/index.js', './src/utils.js'], // 合并 JS
    },
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css', // 合并 CSS
      }),
    ],
  };
  ```
- **场景**: 小型项目或资源分散的页面。
- **效果**: 请求数从 20 个降至 5 个，加载时间从 2s 降至 800ms。

#### **31.2 图片精灵（Sprite）**
- **方法**: 将多个小图标合并为一张大图，使用 CSS 定位显示。
- **原理**: 减少图片请求数，降低网络开销。
- **实现**:
  ```css
  .icon {
    background: url('sprite.png');
    width: 32px;
    height: 32px;
  }
  .icon-home { background-position: 0 0; }
  .icon-user { background-position: -32px 0; }
  ```
- **场景**: 图标密集的界面（如工具栏）。
- **效果**: 图片请求从 10 个降至 1 个。

#### **31.3 内联小资源**
- **方法**: 将小型 CSS/JS 或图片内联到 HTML。
- **原理**: 避免额外请求，适合小于 10KB 的资源。
- **实现**:
  ```html
  <style>/* 内联 CSS */ .box { color: #fff; }</style>
  <img src="data:image/png;base64,iVBORw0KGgo..." alt="icon">
  ```
- **场景**: 首屏关键样式或小图标。
- **效果**: 减少 2-5 个请求，加载时间缩短 200ms。

#### **31.4 按需加载**
- **方法**: 使用懒加载或动态导入。
- **实现**:
  ```javascript
  import(/* webpackChunkName: "chart" */ './chart.js').then(module => {
    module.renderChart();
  });
  ```
- **场景**: 非首屏功能模块。
- **效果**: 初始请求减少 50%。

#### **综合效果**:
- HTTP 请求数从 50 个降至 10 个，页面加载时间缩短 60%-80%。

---

### 32. **为什么建议使用 Gzip/Brotli 压缩资源？**
**detailed answers**:

#### **32.1 压缩原理**
- **方法**: 在服务端对文本资源（如 HTML、CSS、JS）应用 Gzip 或 Brotli 压缩。
- **原理**: 压缩算法减少文件体积，降低网络传输时间。Gzip 可压缩 70%-80%，Brotli 更高效（高 10%-20%）。
- **实现** (Nginx 配置):
  ```nginx
  gzip on;
  gzip_min_length 1000;
  gzip_types text/html text/css application/javascript;
  # Brotli
  brotli on;
  brotli_types text/html text/css application/javascript;
  brotli_static on;
  ```

#### **32.2 性能提升**
- **文件大小**: 500KB 的 JS 文件，Gzip 后约 150KB，Brotli 后约 120KB。
- **传输时间**: 在 4G 网络下，从 1s 降至 300ms。
- **实现** (Node.js + Express):
  ```javascript
  const compression = require('compression');
  const express = require('express');
  const app = express();
  app.use(compression({ level: 6 })); // Gzip 压缩
  ```

#### **32.3 适用场景**
- **文本资源**: HTML、CSS、JS、JSON。
- **静态文件**: 通过构建工具预压缩。
  ```javascript
  const CompressionPlugin = require('compression-webpack-plugin');
  module.exports = {
    plugins: [new CompressionPlugin({ algorithm: 'brotliCompress' })],
  };
  ```

#### **32.4 注意事项**
- **CPU 开销**: 压缩略增加服务器负担，适合静态资源预压缩。
- **非文本资源**: 图片、视频已压缩，不适合 Gzip/Brotli。
- **兼容性**: Brotli 需现代浏览器支持。

#### **综合效果**:
- 资源体积减少 70%-80%，加载速度提升 2-3 倍。

---

### 33. **如何利用 HTTP 缓存提升加载速度？**
**detailed answers**:

#### **33.1 强缓存**
- **方法**: 使用 `Cache-Control` 和 `Expires` 设置缓存有效期。
- **原理**: 浏览器直接从本地读取资源，无需请求服务器。
- **实现** (Nginx):
  ```nginx
  location ~* \.(js|css|png|jpg)$ {
    add_header Cache-Control "public, max-age=31536000"; # 1 年
  }
  ```
- **场景**: 静态资源（如图片、JS）。
- **效果**: 首次加载后，请求时间从 200ms 降至 0ms。

#### **33.2 协商缓存**
- **方法**: 使用 `ETag` 和 `Last-Modified` 验证资源是否更新。
- **原理**: 浏览器发送 `If-None-Match` 或 `If-Modified-Since`，服务器返回 304（未修改）或新资源。
- **实现**:
  ```nginx
  location / {
    etag on;
    add_header Cache-Control "public, must-revalidate";
  }
  ```
- **场景**: 动态内容（如 API 数据）。
- **效果**: 带宽消耗减少 90%。

#### **33.3 版本化缓存**
- **方法**: 通过文件名哈希（如 `main.123abc.js`）实现长期缓存。
- **实现** (Webpack):
  ```javascript
  module.exports = {
    output: {
      filename: '[name].[contenthash].js',
    },
  };
  ```
- **效果**: 更新时强制刷新缓存。

#### **33.4 注意事项**
- **缓存失效**: 使用 `Cache-Control: no-cache` 强制验证。
- **调试**: 浏览器 DevTools 可禁用缓存测试。

#### **综合效果**:
- 缓存命中率提升至 80%，加载时间从 2s 降至 500ms。

---

### 34. **如何使用 Service Worker 进行 PWA 加速？**
**detailed answers**:

#### **34.1 Service Worker 原理**
- **方法**: 运行在浏览器后台的脚本，拦截网络请求并管理缓存。
- **原理**: 缓存资源实现离线访问，减少对服务器的依赖。
- **实现**:
  ```javascript
  // sw.js
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache =>
        cache.addAll(['index.html', 'styles.css', 'app.js'])
      )
    );
  });
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  });
  // main.js
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  ```

#### **34.2 加速策略**
- **预缓存**: 安装时缓存关键资源。
- **运行时缓存**: 动态缓存 API 响应。
  ```javascript
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open('dynamic').then(cache =>
        cache.match(event.request).then(response =>
          response || fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        )
      )
    );
  });
  ```

#### **34.3 应用场景**
- **离线体验**: 如新闻应用。
- **快速加载**: 缓存首屏资源。
- **效果**: 二次加载时间从 2s 降至 100ms。

#### **34.4 注意事项**
- **更新**: 使用版本号（如 `v2`）刷新缓存。
- **HTTPS**: Service Worker 需在安全环境运行。

#### **综合效果**:
- PWA 加载速度提升 80%，离线可用性增强。

---

### 35. **为什么使用 Content Delivery Network（CDN）优化资源加载？**
**detailed answers**:

#### **35.1 CDN 原理**
- **方法**: 将静态资源分发到全球边缘节点。
- **原理**: 就近访问降低延迟，负载均衡提升稳定性。
- **实现**: 将资源 URL 改为 CDN 地址：
  ```html
  <script src="https://cdn.example.com/app.js"></script>
  ```

#### **35.2 性能提升**
- **延迟**: 从 300ms 降至 50ms。
- **带宽**: CDN 提供高带宽，下载更快。
- **效果**: 全球用户加载时间缩短 50%-70%。

#### **35.3 应用场景**
- **全球应用**: 如社交媒体、电商。
- **高流量**: 活动页面抗峰值。

#### **35.4 注意事项**
- **成本**: CDN 服务需付费。
- **缓存更新**: 配置合理 TTL（如 1 小时）。
  ```nginx
  location ~* \.(js|css)$ {
    add_header Cache-Control "public, max-age=3600";
  }
  ```

#### **综合效果**:
- CDN 使资源加载速度提升 2-3 倍，用户体验显著改善。

## **四、网络优化（10 题）**

### 36. **如何优化 WebSocket 实时通信？**
**详细 answers**:

#### **36.1 WebSocket 原理**
- **定义**: WebSocket 是基于 TCP 的全双工通信协议，适合实时数据传输。
- **原理**: 与 HTTP 相比，WebSocket 保持长连接，减少握手开销。

#### **36.2 优化方法**
##### **36.2.1 减少消息频率**
- **方法**: 使用防抖或节流控制客户端发送频率。
- **实现**:
  ```javascript
  const socket = new WebSocket('ws://example.com');
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  const sendMessage = debounce(data => socket.send(JSON.stringify(data)), 200);
  window.addEventListener('mousemove', e => sendMessage({ x: e.clientX }));
  ```
- **效果**: 消息从 100 次/s 降至 5 次/s，带宽减少 90%。

##### **36.2.2 数据压缩**
- **方法**: 在发送前压缩数据。
- **实现**:
  ```javascript
  import pako from 'pako'; // 使用 pako 压缩库
  const data = { text: 'Hello'.repeat(1000) };
  const compressed = pako.gzip(JSON.stringify(data));
  socket.send(compressed);
  // 服务端解压
  socket.onmessage = event => {
    const decompressed = pako.ungzip(event.data, { to: 'string' });
    console.log(JSON.parse(decompressed));
  };
  ```
- **效果**: 数据从 10KB 降至 2KB。

##### **36.2.3 心跳机制**
- **方法**: 定期发送 ping 保持连接。
- **实现**:
  ```javascript
  socket.onopen = () => {
    setInterval(() => socket.send('ping'), 30000); // 每 30s
  };
  socket.onmessage = e => {
    if (e.data === 'pong') console.log('Alive');
  };
  ```
- **效果**: 避免连接断开，无需频繁重连。

#### **36.3 应用场景**
- **聊天应用**: 实时消息。
- **游戏**: 同步玩家状态。

#### **36.4 注意事项**
- **负载均衡**: 使用 WebSocket 支持的 CDN（如 Cloudflare）。
- **安全性**: 启用 `wss://`（加密）。

#### **综合效果**:
- 通信延迟从 100ms 降至 20ms，带宽使用率降低 70%。

---

### 37. **HTTP/2 多路复用是如何优化请求的？**
**detailed answers**:

#### **37.1 多路复用原理**
- **定义**: HTTP/2 允许在单一 TCP 连接上并行发送多个请求和响应。
- **原理**: HTTP/1.1 每个请求需排队（队头阻塞），多路复用通过流（Stream）并发处理。
- **对比**:
  - HTTP/1.1: 串行请求，6 个连接上限。
  - HTTP/2: 并行，无需多域名分片。

#### **37.2 实现**
- **服务端配置** (Nginx):
  ```nginx
  server {
    listen 443 ssl http2;
    ssl_certificate cert.pem;
    ssl_certificate_key key.pem;
  }
  ```
- **效果**: 10 个请求从 1s 降至 400ms。

#### **37.3 性能提升**
- **并行性**: 多个资源同时加载。
- **头部压缩**: HPACK 减少重复头（如 Cookie），从 1KB 降至 200B。
- **服务器推送**: 主动推送资源。
  ```nginx
  http2_push /styles.css;
  ```

#### **37.4 应用场景**
- **资源密集页面**: 多图片、多脚本。
- **SPA**: 动态加载模块。

#### **37.5 注意事项**
- **兼容性**: 需 HTTPS 支持。
- **调试**: 使用 DevTools 检查流状态。

#### **综合效果**:
- 请求效率提升 50%-70%，加载时间显著缩短。

---

### 38. **为什么建议使用图片格式 WebP 代替 JPG/PNG？**
**detailed answers**:

#### **38.1 WebP 优势**
- **原理**: WebP 基于 VP8/VP9 编解码，支持有损和无损压缩。
- **对比**:
  - **JPG**: 有损压缩，无透明支持。
  - **PNG**: 无损压缩，体积大。
  - **WebP**: 有损比 JPG 小 25%-34%，无损比 PNG 小 26%。

#### **38.2 性能提升**
- **文件大小**: 100KB JPG 转为 WebP 约 70KB。
- **加载时间**: 在 4G 网络下，从 200ms 降至 140ms。
- **实现**:
  ```html
  <picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="fallback">
  </picture>
  ```

#### **38.3 转换方法**
- **工具**: 使用 `imagemin` 或在线转换。
  ```javascript
  const imagemin = require('imagemin');
  const imageminWebp = require('imagemin-webp');
  imagemin(['images/*.jpg'], {
    destination: 'build/',
    plugins: [imageminWebp({ quality: 80 })],
  });
  ```

#### **38.4 应用场景**
- **高质量图片**: 电商产品图。
- **透明背景**: 图标、Logo。

#### **38.5 注意事项**
- **兼容性**: 旧浏览器需 fallback。
- **质量控制**: 调整 `quality` 参数平衡体积与清晰度。

#### **综合效果**:
- 图片加载速度提升 30%-40%，带宽节省显著。

---

### 39. **如何使用 `lazy loading` 进行图片懒加载？**
**detailed answers**:

#### **39.1 懒加载原理**
- **方法**: 延迟加载非首屏图片。
- **原理**: 减少初始请求数，仅加载可视区域资源。

#### **39.2 实现方法**
##### **39.2.1 HTML 原生属性**
- **实现**:
  ```html
  <img src="placeholder.jpg" data-src="real.jpg" loading="lazy" alt="image">
  ```
- **效果**: 浏览器自动处理，首屏请求减少 50%。

##### **39.2.2 IntersectionObserver**
- **实现**:
  ```javascript
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });
  images.forEach(img => observer.observe(img));
  ```
- **细节**: `rootMargin` 提前加载。

#### **39.3 占位符优化**
- **方法**: 使用低质量图片（LQIP）。
- **实现**:
  ```html
  <img src="low.jpg" data-src="high.jpg" loading="lazy">
  ```

#### **39.4 应用场景**
- **长页面**: 文章、商品列表。
- **图片密集**: 图库网站。

#### **综合效果**:
- 首屏加载时间从 3s 降至 1s，流量减少 60%。

---

### 40. **如何优化长列表滚动性能？**
**detailed answers**:

#### **40.1 虚拟滚动**
- **方法**: 只渲染可视区域的 DOM。
- **原理**: 根据滚动位置动态更新显示内容。
- **实现** (React + react-virtualized):
  ```javascript
  import { List } from 'react-virtualized';
  function VirtualList({ items }) {
    return (
      <List
        width={600}
        height={400}
        rowCount={items.length}
        rowHeight={50}
        rowRenderer={({ index, style }) => (
          <div style={style}>{items[index]}</div>
        )}
      />
    );
  }
  ```
- **效果**: 渲染从 10000 行降至 10 行，耗时从 5s 降至 100ms。

#### **40.2 防抖滚动事件**
- **方法**: 限制事件触发频率。
- **实现**:
  ```javascript
  function debounce(fn, delay) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
  window.addEventListener('scroll', debounce(() => console.log('Scroll'), 100));
  ```

#### **40.3 缓存高度**
- **方法**: 预计算行高。
- **实现**:
  ```javascript
  const heights = new Map();
  function getHeight(item) {
    return heights.get(item) || 50; // 默认 50px
  }
  ```

#### **40.4 应用场景**
- **大数据表格**: 财务报表。
- **社交动态**: 无限滚动。

#### **综合效果**:
- 滚动帧率从 20fps 提升至 60fps，性能提升 90%。

## **五、缓存与存储优化（10 题）**

### 41. **如何使用 HTTP 强缓存和协商缓存？**
**详细 answers**:

#### **41.1 强缓存（Strong Cache）**
- **原理**: 浏览器直接从本地缓存读取资源，无需请求服务器。
- **实现方法**:
  - **`Cache-Control`**: 设置缓存有效期。
  - **`Expires`**: 指定过期时间（较老，被 `Cache-Control` 替代）。
- **实现** (Nginx 配置):
  ```nginx
  location ~* \.(js|css|png|jpg)$ {
    add_header Cache-Control "public, max-age=31536000"; # 缓存 1 年
    expires 1y; # 兼容旧浏览器
  }
  ```
- **细节**:
  - `max-age`: 以秒为单位的缓存时长。
  - `public`: 允许代理缓存。
- **场景**: 静态资源（如图片、JS 文件）。
- **效果**: 请求时间从 200ms 降至 0ms。

#### **41.2 协商缓存（Negotiation Cache）**
- **原理**: 浏览器通过条件请求验证资源是否更新，服务器返回 304（未修改）或新资源。
- **实现方法**:
  - **`ETag`**: 文件唯一标识。
  - **`Last-Modified`**: 文件最后修改时间。
- **实现** (Nginx):
  ```nginx
  location / {
    etag on; # 启用 ETag
    add_header Cache-Control "no-cache"; # 强制验证
  }
  ```
- **流程**:
  1. 首次请求返回 `ETag: "abc123"` 和 `Last-Modified: Tue, 09 Apr 2025 12:00:00 GMT`。
  2. 后续请求发送 `If-None-Match: "abc123"` 和 `If-Modified-Since: Tue, 09 Apr 2025 12:00:00 GMT`。
  3. 服务器校验后返回 304 或新资源。
- **场景**: 动态内容（如 API 响应）。
- **效果**: 带宽消耗从 100KB 降至 1KB（仅头部）。

#### **41.3 结合使用**
- **实现**:
  ```nginx
  location ~* \.(js|css)$ {
    add_header Cache-Control "public, max-age=604800, must-revalidate"; # 1 周强缓存，过期后验证
    etag on;
  }
  ```
- **效果**: 强缓存优先，过期后协商缓存，确保高效和最新。

#### **综合效果**:
- 缓存命中率提升至 90%，加载时间从 2s 降至 200ms。

---

### 42. **LocalStorage、SessionStorage 和 IndexedDB 的区别是什么？**
**detailed answers**:

#### **42.1 LocalStorage**
- **特点**:
  - **持久存储**: 数据无过期时间，除非手动清除。
  - **容量**: 约 5-10MB（视浏览器）。
  - **同步**: 操作阻塞主线程。
- **实现**:
  ```javascript
  localStorage.setItem('key', 'value');
  console.log(localStorage.getItem('key')); // 'value'
  ```
- **场景**: 用户偏好设置、长期缓存。

#### **42.2 SessionStorage**
- **特点**:
  - **会话存储**: 数据在页面会话结束（如关闭标签）后清除。
  - **容量**: 约 5-10MB。
  - **同步**: 同 LocalStorage。
- **实现**:
  ```javascript
  sessionStorage.setItem('temp', 'data');
  console.log(sessionStorage.getItem('temp')); // 'data'
  ```
- **场景**: 表单数据临时保存。

#### **42.3 IndexedDB**
- **特点**:
  - **数据库存储**: 支持大数据量（几十 MB 至 GB）。
  - **异步**: 不阻塞主线程。
  - **结构化**: 支持索引和复杂查询。
- **实现**:
  ```javascript
  const request = indexedDB.open('myDB', 1);
  request.onupgradeneeded = e => {
    const db = e.target.result;
    db.createObjectStore('store', { keyPath: 'id' });
  };
  request.onsuccess = e => {
    const db = e.target.result;
    const tx = db.transaction('store', 'readwrite');
    tx.objectStore('store').put({ id: 1, value: 'data' });
  };
  ```
- **场景**: 大型离线应用（如邮件客户端）。

#### **42.4 对比总结**
| 特性         | LocalStorage | SessionStorage | IndexedDB  |
| ------------ | ------------ | -------------- | ---------- |
| **生命周期** | 永久         | 会话结束       | 永久       |
| **容量**     | 5-10MB       | 5-10MB         | 几十 MB+   |
| **操作方式** | 同步         | 同步           | 异步       |
| **数据类型** | 键值对       | 键值对         | 结构化数据 |

#### **综合效果**:
- 根据需求选择存储方式，优化性能和用户体验。

---

### 43. **Service Worker 如何实现离线缓存？**
**detailed answers**:

#### **43.1 原理**
- **方法**: Service Worker 拦截网络请求，缓存资源供离线使用。
- **实现**:
  ```javascript
  // sw.js
  const CACHE_NAME = 'v1';
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME).then(cache =>
        cache.addAll(['/', '/styles.css', '/app.js'])
      )
    );
  });
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(response => response || fetch(e.request))
    );
  });
  // main.js
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  ```

#### **43.2 缓存策略**
- **预缓存**: 安装时缓存关键资源。
- **动态缓存**:
  ```javascript
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(response =>
        response || fetch(e.request).then(networkResponse => {
          caches.open('dynamic').then(cache => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        })
      )
    );
  });
  ```

#### **43.3 更新机制**
- **方法**: 更改缓存版本号。
- **实现**:
  ```javascript
  const CACHE_NAME = 'v2'; // 更新版本
  self.addEventListener('activate', e => {
    e.waitUntil(
      caches.keys().then(keys =>
        Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
      )
    );
  });
  ```

#### **43.4 应用场景**
- **PWA**: 离线访问页面。
- **效果**: 二次加载从 2s 降至 100ms。

#### **综合效果**:
- 离线可用性提升，加载速度加快 80%。

---

### 44. **CDN 缓存更新策略有哪些？**
**detailed answers**:

#### **44.1 文件版本化**
- **方法**: 通过文件名哈希（如 `app.123abc.js`）区分版本。
- **实现** (Webpack):
  ```javascript
  module.exports = {
    output: {
      filename: '[name].[contenthash].js',
    },
  };
  ```
- **效果**: 更新自动生效，无需清缓存。

#### **44.2 Cache-Control 配置**
- **方法**: 设置合理的 TTL（Time To Live）。
- **实现** (Nginx):
  ```nginx
  location ~* \.(js|css)$ {
    add_header Cache-Control "public, max-age=3600"; # 1 小时
  }
  ```
- **场景**: 频繁更新的资源。

#### **44.3 手动清除**
- **方法**: 通过 CDN 管理面板刷新缓存。
- **实现**: 指定 URL 或通配符（如 `*.js`）。
- **场景**: 紧急更新。

#### **44.4 查询参数**
- **方法**: 在 URL 后加版本号（如 `app.js?v=2`）。
- **实现**:
  ```html
  <script src="app.js?v=2"></script>
  ```
- **效果**: 简单但需手动管理。

#### **综合效果**:
- 灵活更新策略确保资源最新，缓存命中率达 90%。

---

### 45. **如何在 Webpack 中配置持久化缓存？**
**detailed answers**:

#### **45.1 原理**
- **方法**: 使用 contenthash 和缓存插件。
- **实现**:
  ```javascript
  module.exports = {
    output: {
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].chunk.js',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
        },
      },
    },
  };
  ```

#### **45.2 缓存插件**
- **方法**: 使用 `cache` 配置。
- **实现**:
  ```javascript
  module.exports = {
    cache: {
      type: 'filesystem', // 文件系统缓存
      cacheDirectory: path.resolve(__dirname, '.cache'),
    },
  };
  ```

#### **45.3 效果**
- **构建速度**: 增量构建从 10s 降至 2s。
- **浏览器缓存**: 未修改文件长期有效。

#### **45.4 应用场景**
- **大型项目**: 频繁构建。
- **CI/CD**: 提升部署效率。

#### **综合效果**:
- 构建和加载性能提升 50%-80%。

## **五、缓存与存储优化（10 题）**

### 46. **为什么要使用 ETag 进行缓存控制？**
**detailed answers**:

#### **46.1 ETag 原理**
- **定义**: ETag（Entity Tag）是资源的唯一标识，通常基于内容哈希。
- **原理**: 浏览器通过 `If-None-Match` 请求头发送 ETag，服务器比对后返回 304（未修改）或新资源。
- **实现** (Nginx):
  ```nginx
  location / {
    etag on; # 启用 ETag
  }
  ```

#### **46.2 为什么使用**
- **精确性**: 比 `Last-Modified` 更准确（时间戳可能因服务器同步偏差失效）。
- **节省带宽**: 未修改时只返回头部，减少数据传输。
- **流程**:
  1. 首次响应: `ETag: "abc123"`.
  2. 后续请求: `If-None-Match: "abc123"`.
  3. 服务器返回: `304 Not Modified`.

#### **46.3 实现示例**
- **Node.js**:
  ```javascript
  const express = require('express');
  const app = express();
  app.set('etag', 'strong'); // 强 ETag
  app.get('/', (req, res) => res.send('Hello'));
  app.listen(3000);
  ```
- **效果**: 带宽从 10KB 降至 1KB（仅头部）。

#### **46.4 应用场景**
- **动态资源**: API 响应。
- **静态文件**: 配合强缓存。

#### **46.5 注意事项**
- **性能开销**: 计算 ETag 增加少量服务器负担。
- **弱 ETag**: 以 `W/` 开头，用于内容语义相同但字节不同的情况。

#### **综合效果**:
- 缓存验证效率提升 50%-70%，带宽节省显著。

---

### 47. **如何优化 JavaScript 和 CSS 代码的缓存策略？**
**detailed answers**:

#### **47.1 文件版本化**
- **方法**: 使用 contenthash 生成唯一文件名。
- **实现** (Webpack):
  ```javascript
  module.exports = {
    output: {
      filename: '[name].[contenthash].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
  };
  ```
- **效果**: 文件内容不变时缓存长期有效。

#### **47.2 Cache-Control 配置**
- **方法**: 设置长缓存时间并强制验证。
- **实现** (Nginx):
  ```nginx
  location ~* \.(js|css)$ {
    add_header Cache-Control "public, max-age=31536000, must-revalidate";
    etag on;
  }
  ```
- **效果**: 强缓存 1 年，过期后协商缓存。

#### **47.3 动态加载**
- **方法**: 按需加载模块，减少初始缓存需求。
- **实现**:
  ```javascript
  import(/* webpackChunkName: "lazy" */ './lazy.js').then(module => module.default());
  ```

#### **47.4 应用场景**
- **SPA**: 核心代码长期缓存，模块动态加载。
- **静态站点**: 所有资源版本化。

#### **综合效果**:
- 缓存命中率达 95%，加载时间从 2s 降至 200ms。

---

### 48. **字体文件如何优化缓存？**
**detailed answers**:

#### **48.1 版本化缓存**
- **方法**: 使用文件名哈希。
- **实现** (Webpack):
  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: { name: '[name].[contenthash].[ext]' },
            },
          ],
        },
      ],
    },
  };
  ```
- **效果**: 未修改字体长期缓存。

#### **48.2 长缓存时间**
- **方法**: 设置 `Cache-Control`。
- **实现** (Nginx):
  ```nginx
  location ~* \.(woff|woff2|eot|ttf)$ {
    add_header Cache-Control "public, max-age=31536000";
  }
  ```

#### **48.3 预加载**
- **方法**: 使用 `<link rel="preload">`。
- **实现**:
  ```html
  <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **效果**: 字体加载提前 200ms。

#### **48.4 应用场景**
- **品牌字体**: 长期不变。
- **多语言支持**: 按需加载。

#### **综合效果**:
- 字体加载速度提升 50%，缓存命中率达 90%。

---

### 49. **为什么要使用 `immutable` 资源？**
**detailed answers**:

#### **49.1 定义与原理**
- **定义**: `immutable` 资源指内容永不改变的资源，通常通过版本化（如哈希文件名）实现。
- **原理**: 内容不变可设置超长缓存时间，无需验证。

#### **49.2 实现**
- **方法**: 使用 contenthash。
- **实现** (Webpack):
  ```javascript
  module.exports = {
    output: {
      filename: '[name].[contenthash].js',
    },
  };
  ```
- **服务端配置**:
  ```nginx
  location ~* \.(js|css)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
  ```

#### **49.3 为什么使用**
- **高效缓存**: 无需协商，直接强缓存。
- **更新简单**: 修改内容生成新文件名，旧版本缓存不受影响。
- **效果**: 请求时间从 200ms 降至 0ms。

#### **49.4 应用场景**
- **静态资源**: JS、CSS、图片。
- **CDN**: 全局分发。

#### **49.5 注意事项**
- **HTML 不适用**: 页面常需更新。

#### **综合效果**:
- 加载速度提升 80%，缓存管理更简单。

---

### 50. **如何利用 `Cache-Control: stale-while-revalidate` 提升缓存命中率？**
**detailed answers**:

#### **50.1 原理**
- **定义**: `stale-while-revalidate` 允许浏览器在缓存过期后仍使用旧资源，同时异步更新。
- **实现** (Nginx):
  ```nginx
  location /api/ {
    add_header Cache-Control "public, max-age=3600, stale-while-revalidate=600";
  }
  ```
- **流程**:
  1. `max-age=3600`: 缓存 1 小时。
  2. 过期后 600s 内使用旧数据，同时后台刷新。

#### **50.2 性能提升**
- **即时响应**: 用户立即获取缓存。
- **后台更新**: 下次请求使用新数据。
- **效果**: 响应时间从 300ms 降至 10ms。

#### **50.3 Service Worker 实现**
- **方法**: 手动实现策略。
- **实现**:
  ```javascript
  self.addEventListener('fetch', e => {
    e.respondWith(
      caches.match(e.request).then(response => {
        const fetchPromise = fetch(e.request).then(networkResponse => {
          caches.open('v1').then(cache => cache.put(e.request, networkResponse.clone()));
          return networkResponse;
        });
        return response || fetchPromise;
      })
    );
  });
  ```

#### **50.4 应用场景**
- **API 数据**: 新闻、天气。
- **动态内容**: 不需即时更新的页面。

#### **综合效果**:
- 缓存命中率提升至 95%，用户体验更流畅。
