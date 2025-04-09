# 前端 HTML 和 CSS 经典面试题 Top 50

## HTML 相关

### 1. HTML5 有哪些新特性？
**答案**：  
HTML5 引入了大量新特性，主要包括：  

- **语义化标签**：如 `<header>`、`<footer>`、`<nav>`、`<article>`、`<section>` 等，用于描述页面结构。  
- **多媒体支持**：`<audio>` 和 `<video>` 标签，支持原生音视频播放，无需插件。  
- **表单增强**：新增输入类型（如 `email`、`date`、`range`），新属性（如 `placeholder`、`required`、`pattern`）。  
- **图形绘制**：`<canvas>` 用于动态绘图，SVG 用于矢量图形。  
- **Web Storage**：`localStorage` 和 `sessionStorage`，提供更强大的客户端存储能力。  
- **Web APIs**：如 Geolocation（地理定位）、Web Workers（后台线程）、Drag and Drop（拖放）。  
- **离线应用**：通过 `manifest` 文件支持 PWA（渐进式 Web 应用）。

**解析**：  
HTML5 是对 HTML4 的重大升级，旨在适应现代 Web 需求。它通过语义化标签提升了代码的可维护性和 SEO 效果，通过多媒体和 API 支持减少了对 Flash 等第三方插件的依赖。例如，`<canvas>` 常用于游戏开发，而 Web Storage 提供了比 Cookies 更高效的存储方案（无大小限制、无需随请求发送）。这些特性共同推动了 Web 应用的性能和用户体验提升。

**示例代码**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML5 Demo</title>
</head>
<body>
  <header>
    <h1>HTML5 Features</h1>
    <nav>
      <a href="#audio">Audio</a>
      <a href="#video">Video</a>
    </nav>
  </header>
  <section id="audio">
    <audio controls>
      <source src="audio.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </section>
  <section id="video">
    <video controls width="400">
      <source src="video.mp4" type="video/mp4">
      Your browser does not support the video element.
    </video>
  </section>
  <form>
    <input type="email" placeholder="Enter your email" required>
    <input type="submit" value="Submit">
  </form>
  <canvas id="myCanvas" width="200" height="100"></canvas>
  <script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 50, 50);
  </script>
</body>
</html>
```

---

### 2. 什么是语义化 HTML？有哪些好处？
**答案**：  
语义化 HTML 是指使用具有明确含义的标签来描述页面内容和结构，而不是仅仅依赖无意义的 `<div>` 和 `<span>`。例如，使用 `<header>` 表示页头，`<nav>` 表示导航，`<article>` 表示独立内容块。  
**好处**：  
1. **提升可读性**：开发者能快速理解页面结构，减少维护成本。  
2. **增强 SEO**：搜索引擎能更准确地解析页面内容，提高排名。  
3. **改善可访问性**：屏幕阅读器能更好地识别页面元素，帮助视障用户。  
4. **减少类名依赖**：语义化标签自带含义，减少冗余的类名定义。

**解析**：  
在 HTML4 时代，开发者常用 `<div class="header">` 这样的写法，缺乏语义，维护和扩展困难。HTML5 的语义化标签解决了这一问题。例如，`<nav>` 明确表示导航区域，搜索引擎会优先抓取其内容用于索引。此外，ARIA（Accessible Rich Internet Applications）属性常与语义化标签配合使用，进一步提升可访问性。语义化不仅是技术要求，也是现代 Web 开发的最佳实践。

**示例代码**：
```html
<!-- 非语义化 -->
<div class="header">
  <div class="nav">
    <div class="menu-item">Home</div>
    <div class="menu-item">About</div>
  </div>
</div>

<!-- 语义化 -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
```

---

### 3. `<!DOCTYPE>` 的作用是什么？
**答案**：  
`<!DOCTYPE>` 是文档类型声明，位于 HTML 文件的首行，用于告知浏览器使用哪种 HTML 或 XHTML 规范解析页面。HTML5 的声明是 `<!DOCTYPE html>`，简洁且不区分大小写。它触发浏览器以标准模式（Standards Mode）渲染页面。

**解析**：  
浏览器有两种渲染模式：标准模式和怪异模式（Quirks Mode）。标准模式遵循 W3C 规范，确保一致的布局和样式；怪异模式则模拟旧浏览器行为（如 IE6），可能导致 CSS 盒模型异常（如宽度计算包含边框）。若缺少 `<!DOCTYPE>` 或声明错误（如 `<!DOCTYPE HTML PUBLIC...>` 拼写错误），浏览器可能进入怪异模式，影响页面表现。HTML5 的 `<!DOCTYPE html>` 是最简洁的声明，适用于所有现代浏览器。

**示例代码**：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standard Mode Example</title>
  <style>
    .box {
      width: 200px;
      height: 100px;
      border: 10px solid black;
    }
  </style>
</head>
<body>
  <div class="box">Box in Standard Mode</div>
</body>
</html>
<!-- 在标准模式下，宽度为 200px，不包括边框 -->
```

---

### 4. `meta` 标签有哪些常用属性？
**答案**：  
`meta` 标签用于定义文档的元数据，常用属性包括：  
1. **`charset`**：指定字符编码，如 `<meta charset="UTF-8">`。  
2. **`name` 和 `content`**：  
   - `viewport`：控制移动端视口（如 `width=device-width, initial-scale=1.0`）。  
   - `description`：页面描述，用于 SEO。  
   - `keywords`：页面关键词（现今 SEO 影响较小）。  
   - `author`：页面作者。  
3. **`http-equiv` 和 `content`**：  
   - `refresh`：定时刷新（如 `content="5"` 表示 5 秒刷新）。  
   - `X-UA-Compatible`：指定 IE 渲染模式（如 `IE=edge`）。

**解析**：  
`meta` 标签不直接显示内容，但对页面渲染和功能至关重要。例如，`charset="UTF-8"` 确保正确解析中文等字符，避免乱码；`viewport` 是响应式设计的基础，防止移动端页面缩放异常。`http-equiv` 模拟 HTTP 头，早期用于控制缓存，现多用于兼容性调整。开发者需根据项目需求选择合适的 `meta` 配置。

**示例代码**：
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A comprehensive guide to HTML5">
  <meta name="keywords" content="HTML5, CSS, JavaScript">
  <meta http-equiv="refresh" content="10">
</head>
```

---

### 5. HTML 中的 `data-` 属性有什么用？
**答案**：  
`data-` 是 HTML5 引入的自定义属性，用于在 HTML 元素上存储私有数据。格式为 `data-*`，其中 `*` 是自定义名称。通过 JavaScript 的 `dataset` 属性或 `getAttribute` 方法访问。

**解析**：  
`data-` 属性解决了早期通过类名或隐藏元素存储数据的非标准做法。它广泛用于前端框架（如 Vue、React）绑定数据，或在事件处理中传递参数。例如，一个按钮可能用 `data-id` 存储记录 ID，点击时通过 JS 获取并发送请求。注意，`data-` 属性对 SEO 无直接影响，仅作为开发工具使用。

**示例代码**：
```html
<ul>
  <li data-id="1" data-type="user">Alice</li>
  <li data-id="2" data-type="admin">Bob</li>
</ul>
<script>
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      const type = item.dataset.type;
      console.log(`Clicked ${type} with ID: ${id}`);
    });
  });
</script>
```

---

### 6. `defer` 和 `async` 在 `<script>` 中的区别是什么？
**答案**：  
- **`defer`**：脚本下载时不阻塞 HTML 解析，解析完成后按脚本顺序执行。  
- **`async`**：脚本下载时不阻塞 HTML 解析，下载完成后立即执行，不保证顺序。

**解析**：  
`<script>` 默认是同步加载，会阻塞 HTML 解析和渲染，导致页面加载变慢。`defer` 和 `async` 是优化方案：  
- `defer` 适合有依赖关系的脚本（如 jQuery 必须先于依赖它的代码加载），确保 DOM 加载完成后再执行。  
- `async` 适合独立脚本（如 Google Analytics），不关心执行顺序，可能在 DOM 未完全加载时运行。两者的选择取决于脚本的功能和依赖性。

**示例代码**：
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Script Loading</title>
</head>
<body>
  <p>Page content</p>
  <script src="script1.js" defer></script> <!-- 顺序执行 -->
  <script src="script2.js" async></script> <!-- 立即执行 -->
  <script>
    console.log('Inline script');
  </script>
</body>
</html>
```

---

### 7. `src` 和 `href` 有什么区别？
**答案**：  
- **`src`**：指定资源路径（如 `<img>`、`<script>`），用于加载并替换元素内容。  
- **`href`**：指定超链接地址（如 `<a>`、`<link>`），用于建立资源或页面间的关联。

**解析**：  
`src`（source）表示嵌入资源，浏览器会下载并渲染该资源，例如 `<img src="image.jpg">` 会显示图片。`href`（hypertext reference）表示引用，点击或加载时跳转/关联到目标，例如 `<a href="page.html">` 用于导航。两者的本质区别在于功能：`src` 是内容替换，`href` 是关系建立。

**示例代码**：
```html
<img src="logo.png" alt="Logo">
<script src="app.js"></script>
<a href="https://example.com">Visit Example</a>
<link href="styles.css" rel="stylesheet">
```

---

### 8. 什么是 HTML 的 `contenteditable` 属性？
**答案**：  
`contenteditable` 是一个全局属性，设置为 `true` 时允许用户直接编辑元素内容，设置为 `false` 或省略时不可编辑。

**解析**：  
它是 HTML5 的特性，用于实现简单的富文本编辑功能，常用于在线编辑器（如 Notion 的基础功能）。编辑后的内容可通过 JavaScript 获取（`innerHTML` 或 `textContent`），但不支持复杂格式化（如加粗），需配合 CSS 和 JS 增强。注意，`contenteditable` 会触发输入事件（如 `input`），便于实时处理用户输入。

**示例代码**：
```html
<div contenteditable="true" style="border: 1px solid #ccc; padding: 10px;">
  Click here to edit this text!
</div>
<script>
  const editable = document.querySelector('div');
  editable.addEventListener('input', (e) => {
    console.log('New content:', e.target.innerHTML);
  });
</script>
```

---

### 9. 如何实现图片懒加载？
**答案**：  
图片懒加载有两种主要方式：  
1. **HTML5 原生**：使用 `<img>` 的 `loading="lazy"` 属性，浏览器自动延迟加载未进入视口的图片。  
2. **JavaScript 实现**：通过监听滚动事件或使用 Intersection Observer API，动态设置 `src`。

**解析**：  
懒加载（Lazy Loading）是性能优化的重要技术，减少初始加载的资源量，提升页面速度。`loading="lazy"` 是现代浏览器的原生支持（Chrome 76+），简单高效，但兼容性有限。Intersection Observer 则更灵活，支持旧浏览器（需 polyfill），可用于复杂场景（如动态内容）。懒加载常用于图片密集型页面，如电商网站。

**示例代码**：
```html
<!-- 原生方式 -->
<img src="image.jpg" loading="lazy" alt="Lazy Loaded Image">

<!-- Intersection Observer 方式 -->
<img data-src="image.jpg" alt="Lazy Loaded Image">
<script>
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
</script>
```

---

### 10. `iframe` 的优缺点是什么？
**答案**：  
**优点**：  
- 嵌入第三方内容（如地图、视频）。  
- 隔离性强，内部样式和脚本不影响主页面。  
- 支持独立加载，适合复杂模块。  
**缺点**：  
- SEO 不友好，搜索引擎难以抓取内容。  
- 加载速度慢，增加页面开销。  
- 通信复杂，需使用 `postMessage` 与主页面交互。  
- 响应式设计困难，需手动调整尺寸。

**解析**：  
`iframe`（inline frame）是一个独立的窗口，常用于嵌入外部资源（如 YouTube 视频）。它的隔离性是双刃剑：既避免了样式冲突，也限制了灵活性。现代开发中，`iframe` 逐渐被组件化方案（如 Web Components）替代，但在特定场景（如广告嵌入）仍不可或缺。

**示例代码**：
```html
<iframe src="https://www.google.com/maps" width="600" height="450" style="border:0;" allowfullscreen></iframe>
```

---

### 11. HTML 中的 `title` 属性有什么作用？
**答案**：  
`title` 是一个全局属性，为元素提供额外信息，通常在鼠标悬停时显示为提示文本。

**解析**：  
`title` 增强了用户体验，特别在按钮、链接或缩写上提供上下文说明。它对可访问性也有帮助，屏幕阅读器会朗读 `title` 内容。注意，过长的 `title` 可能被截断，且移动端无悬停效果，需谨慎使用。

**示例代码**：
```html
<button title="Click to submit the form">Submit</button>
<abbr title="HyperText Markup Language">HTML</abbr>
```

---

### 12. 如何禁用浏览器的默认表单提交行为？
**答案**：  
在表单的 `onsubmit` 事件中调用 `event.preventDefault()`，阻止默认提交。

**解析**：  
表单默认提交会刷新页面或跳转，不适合现代单页应用（SPA）。通过 `preventDefault()`，开发者可接管提交逻辑（如 AJAX 请求）。此外，也可以在 `<button>` 上设置 `type="button"`，避免触发提交。

**示例代码**：
```html
<form onsubmit="event.preventDefault(); handleSubmit()">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
<script>
  function handleSubmit() {
    console.log('Form submitted without refresh');
    // AJAX 请求逻辑
  }
</script>
```

---

### 13. `link` 和 `@import` 的区别是什么？
**答案**：  
- **`<link>`**：HTML 标签，加载 CSS，阻塞页面渲染，直到样式加载完成。  
- **`@import`**：CSS 规则，串行加载 CSS，不阻塞 HTML 解析，但可能延迟样式应用。  
**区别**：  
- 加载方式：`<link>` 并行，`@import` 串行。  
- 使用场景：`<link>` 用于主样式，`@import` 可用于条件加载。  
- 性能：`<link>` 更优。

**解析**：  
`<link>` 是标准做法，浏览器会优先加载并应用样式，确保页面无闪烁（FOUC）。`@import` 常用于模块化 CSS 或动态加载，但因串行加载可能导致性能问题，现代开发中较少使用。

**示例代码**：
```html
<link rel="stylesheet" href="main.css">
<style>
  @import url('extra.css');
</style>
```

---

### 14. HTML 中的 `alt` 属性有什么作用？
**答案**：  
`alt` 为 `<img>` 提供替代文本，当图片加载失败时显示，并被屏幕阅读器朗读。

**解析**：  
`alt` 是可访问性的核心，描述图片内容（如“一只猫在草地上”），帮助视障用户理解页面。它还对 SEO 有积极影响，搜索引擎会索引 `alt` 文本。空值（`alt=""`）表示装饰性图片，不会被朗读。

**示例代码**：
```html
<img src="cat.jpg" alt="A cat sitting on the grass">
<img src="decor.png" alt="">
```

---

### 15. 什么是 HTML 的 `manifest` 属性？
**答案**：  
`manifest` 属性指定一个 `.appcache` 文件的路径，用于定义离线应用的缓存资源，现已被 Service Worker 取代。

**解析**：  
HTML5 早期通过 `manifest` 实现离线访问（如缓存 HTML、CSS、JS），用户可在无网络时使用页面。但其功能有限（如更新困难），已被更强大的 Service Worker 替代，现代浏览器逐渐废弃支持。

**示例代码**：
```html
<html manifest="cache.appcache">
<!-- cache.appcache 文件 -->
CACHE MANIFEST
/index.html
/styles.css
/app.js
```

---

### 16. 如何在 HTML 中嵌入 SVG？
**答案**：  
三种方式：  
1. **内联 `<svg>`**：直接在 HTML 中编写 SVG 代码。  
2. **`<img>` 标签**：引用外部 `.svg` 文件。  
3. **CSS 背景**：通过 `background-image` 使用 SVG。

**解析**：  
内联 SVG 可通过 CSS 和 JS 动态控制，适合交互性强的场景（如图标动画）。`<img>` 方式简单但不可操作内部元素。CSS 背景适合装饰性图形。SVG 的优势在于矢量特性，缩放无损。

**示例代码**：
```html
<!-- 内联 SVG -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>

<!-- img 方式 -->
<img src="icon.svg" alt="Icon">

<!-- CSS 背景 -->
<style>
  .bg {
    background-image: url('icon.svg');
    width: 100px;
    height: 100px;
  }
</style>
<div class="bg"></div>
```

---

### 17. HTML 中的 `hidden` 属性有什么用？
**答案**：  
`hidden` 是一个布尔属性，设置为 `true` 时隐藏元素，等效于 `display: none`，但可被 CSS 覆盖。

**解析**：  
`hidden` 提供了一种声明式的隐藏方式，比 CSS 更直观。它在 DOM 中仍存在，可通过 JS 操作（如 `element.hidden = false`）。注意，优先级低于 CSS 的 `display` 属性。

**示例代码**：
```html
<div hidden>This is hidden</div>
<style>
  div[hidden] { display: block; } /* 覆盖 hidden */
</style>
```

---

### 18. 什么是 HTML 的 `preload` 和 `prefetch`？
**答案**：  
- **`preload`**：提前加载当前页面所需的关键资源（如图片、脚本），提高渲染速度。  
- **`prefetch`**：预加载下一页面可能用到的资源（如链接目标），优化导航体验。

**解析**：  
两者都是资源提示（Resource Hints），通过 `<link>` 实现。`preload` 优先级高，适用于立即需要的资源；`prefetch` 优先级低，适用于预测性加载（如用户可能点击的链接）。它们不阻塞渲染，但需合理使用以避免浪费带宽。

**示例代码**：
```html
<link rel="preload" href="main.js" as="script">
<link rel="prefetch" href="next-page.html">
```

---

### 19. HTML 中的 `form` 标签有哪些新特性？
**答案**：  
HTML5 为 `<form>` 增加了：  
- **新输入类型**：`email`、`url`、`date`、`range`、`color` 等。  
- **新属性**：`placeholder`（占位符）、`required`（必填）、`pattern`（正则验证）、`autofocus`（自动聚焦）等。  
- **表单验证**：原生支持客户端验证。

**解析**：  
这些特性减少了对 JavaScript 的依赖，提升了用户体验。例如，`type="email"` 自动验证邮箱格式，`required` 阻止空值提交。移动端还提供特定键盘（如数字键盘），优化输入效率。

**示例代码**：
```html
<form>
  <input type="email" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
  <input type="date" autofocus>
  <button type="submit">Submit</button>
</form>
```

---

### 20. 如何实现一个可访问性（Accessibility）友好的页面？
**答案**：  
1. 使用语义化标签（如 `<nav>`、`<main>`）。  
2. 为图片添加 `alt` 属性。  
3. 确保键盘导航（`tabindex`、`focus`）。  
4. 添加 ARIA 属性（如 `aria-label`）。  
5. 保持高对比度（WCAG 标准）。  
6. 测试屏幕阅读器兼容性。

**解析**：  
可访问性（A11y）是 Web 开发的重要原则，确保残障人士（如视障、听障用户）能使用页面。WCAG（Web Content Accessibility Guidelines）提供了具体标准，如对比度至少 4.5:1。ARIA 属性弥补了 HTML 的不足，例如为动态内容添加描述。

**示例代码**：
```html
<nav>
  <ul role="navigation">
    <li><a href="/" aria-label="Go to home page">Home</a></li>
  </ul>
</nav>
<img src="logo.png" alt="Company Logo">
<button tabindex="0" aria-label="Close dialog">X</button>
```

---

## CSS 相关

### 21. CSS 中的盒模型是什么？
**答案**：  
CSS 盒模型（Box Model）是元素布局的基础，每个元素被视为一个矩形框，包括：  
- **内容（content）**：宽度和高度（`width`、`height`）。  
- **内边距（padding）**：内容与边框的间距。  
- **边框（border）**：围绕内边距的框。  
- **外边距（margin）**：框外的间距。  
两种模式：  
- **标准盒模型**（`box-sizing: content-box`）：宽度只包括内容。  
- **IE 盒模型**（`box-sizing: border-box`）：宽度包括内容、内边距和边框。

**解析**：  
盒模型决定了元素的大小和间距。标准模型直观但计算复杂（总宽度 = `width + padding + border`）；IE 模型更符合设计直觉，常通过全局设置 `box-sizing: border-box` 使用。理解盒模型是掌握 CSS 布局的关键。

**示例代码**：
```css
/* 标准盒模型 */
.box1 {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
  /* 总宽度 = 200 + 10*2 + 5*2 = 230px */
}

/* IE 盒模型 */
.box2 {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 5px solid black;
  box-sizing: border-box;
  /* 总宽度 = 200px */
}
```

---

### 22. CSS 中的 `display` 属性有哪些常用值？
**答案**：  
- **`block`**：块级元素，独占一行，可设置宽高。  
- **`inline`**：行内元素，不换行，宽高由内容决定。  
- **`inline-block`**：行内块，结合两者特性，可设置宽高且不换行。  
- **`none`**：隐藏元素，不占空间。  
- **`flex`**：弹性布局，适合一维排列。  
- **`grid`**：网格布局，适合二维布局。

**解析**：  
`display` 控制元素的渲染方式，是 CSS 布局的基石。`block` 常用于容器，`inline` 用于文本，`inline-block` 用于按钮等小组件。`flex` 和 `grid` 是现代布局方案，取代了传统的浮动和定位。

**示例代码**：
```css
.block { display: block; width: 100px; height: 100px; }
.inline { display: inline; }
.inline-block { display: inline-block; width: 50px; }
.flex { display: flex; }
```

---

### 23. 如何实现水平居中？
**答案**：  
- **块级元素**：`margin: 0 auto;`（需指定宽度）。  
- **行内/行内块元素**：父元素设置 `text-align: center;`。  
- **Flex**：`display: flex; justify-content: center;`。  
- **绝对定位**：`position: absolute; left: 50%; transform: translateX(-50%);`。

**解析**：  
水平居中取决于元素类型和上下文。`margin: 0 auto` 是传统方法，适用于固定宽度的块元素；`text-align` 简单但仅限行内内容；Flex 是现代首选，灵活且直观；绝对定位适合动态宽度但需注意脱离文档流。

**示例代码**：
```css
/* 块级元素 */
.block {
  width: 200px;
  margin: 0 auto;
}

/* Flex */
.container {
  display: flex;
  justify-content: center;
}

/* 绝对定位 */
.absolute {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

---

### 24. 如何实现垂直居中？
**答案**：  
- **单行文本**：`line-height` 等于容器高度。  
- **Flex**：`display: flex; align-items: center;`。  
- **Grid**：`display: grid; align-items: center;`。  
- **绝对定位**：`position: absolute; top: 50%; transform: translateY(-50%);`。  
- **表格布局**：`display: table-cell; vertical-align: middle;`。

**解析**：  
垂直居中一直是 CSS 布局难题。传统方法（如 `line-height`）简单但局限性大；Flex 和 Grid 是现代解决方案，支持复杂场景；绝对定位适用于动态高度；表格布局是旧方案，现已较少使用。

**示例代码**：
```css
/* Flex */
.container {
  display: flex;
  align-items: center;
  height: 200px;
}

/* 绝对定位 */
.absolute {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

---

### 25. CSS 中的 `position` 属性有哪些值？
**答案**：  
- **`static`**：默认值，按文档流排列。  
- **`relative`**：相对自身原始位置偏移，不脱离文档流。  
- **`absolute`**：相对最近的非 `static` 祖先定位，脱离文档流。  
- **`fixed`**：相对视口定位，脱离文档流。  
- **`sticky`**：粘性定位，滚动到阈值时固定。

**解析**：  
`position` 是 CSS 定位的核心，搭配 `top`、`left` 等属性使用。`relative` 常用于微调；`absolute` 和 `fixed` 用于浮层（如弹窗）；`sticky` 适合导航栏，结合了相对和固定的特性。

**示例代码**：
```css
.fixed {
  position: fixed;
  top: 10px;
  right: 10px;
}
.sticky {
  position: sticky;
  top: 0;
}
```

---

### 26. 什么是 BFC？如何触发？
**答案**：  
BFC（Block Formatting Context，块级格式化上下文）是一个独立的渲染区域，内部元素的布局不受外部影响。触发条件包括：  
- `overflow: hidden/auto/scroll;`  
- `display: flex/grid/inline-block;`  
- `float: left/right;`  
- `position: absolute/fixed;`。

**解析**：  
BFC 是 CSS 布局的重要概念，解决了浮动、外边距折叠等问题。例如，浮动元素会导致父元素高度塌陷，触发 BFC 可清除浮动。BFC 内的元素遵循特定规则（如垂直外边距不与外部折叠），是理解布局行为的关键。

**示例代码**：
```css
.container {
  overflow: hidden; /* 触发 BFC */
}
.float {
  float: left;
  width: 100px;
}
```

---

### 27. CSS 中的 `float` 属性有什么作用？
**答案**：  
`float` 使元素浮动到左侧或右侧，脱离文档流，周围内容环绕它。常用值：`left`、`right`、`none`。

**解析**：  
`float` 最初用于图文混排（如杂志布局），但也被用于早期网页布局（如两栏布局）。它会导致父元素高度塌陷，需通过清除浮动解决（如 `clear` 或 BFC）。现代布局多用 Flex 或 Grid 替代，但理解 `float` 仍很重要。

**示例代码**：
```css
.img {
  float: left;
  width: 100px;
  margin-right: 10px;
}
.container::after {
  content: '';
  display: block;
  clear: both;
}
```

---

### 28. CSS 选择器优先级如何计算？
**答案**：  
优先级通过四级权重计算：  
- 行内样式：1000  
- ID 选择器（`#id`）：100  
- 类选择器（`.class`）、伪类（`:hover`）、属性选择器（`[type]`）：10  
- 元素选择器（`div`）、伪元素（`::before`）：1  
- 通配符（`*`）：0  
相同优先级时，后定义的覆盖先定义的。

**解析**：  
优先级决定了样式冲突时的应用顺序。例如，`#id .class` 的优先级是 100 + 10 = 110。`!important` 可强制提升优先级（高于 1000），但应避免滥用以保持代码可维护性。

**示例代码**：
```css
#box { color: red; } /* 100 */
.box { color: blue; } /* 10 */
div { color: green; } /* 1 */
<div id="box" class="box">Text</div> /* 最终为 red */
```

---

### 29. 什么是 CSS 的 `z-index`？
**答案**：  
`z-index` 定义定位元素的堆叠顺序，仅对 `position` 为 `relative`、`absolute` 或 `fixed` 的元素生效。值越大越靠前，负值靠后。

**解析**：  
`z-index` 依赖堆叠上下文（Stacking Context），由根元素或特定属性（如 `z-index` 非 `auto`）创建。同一上下文内，`z-index` 决定顺序；不同上下文间，父级上下文优先级更高。常用于弹窗、悬浮菜单等。

**示例代码**：
```css
.box1 {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
}
.box2 {
  position: absolute;
  z-index: 5;
  top: 20px;
  left: 20px;
}
```

---

### 30. 如何实现一个三角形？
**答案**：  
使用 `border` 属性，设置元素宽高为 0，通过边框的交汇形成三角形。调整 `border-width` 和颜色控制方向和样式。

**解析**：  
CSS 的边框在交汇处形成斜线，利用这一特性可绘制三角形。例如，设置底部边框为实色，其余为透明，即可形成向下三角。常用于下拉箭头或提示框。

**示例代码**：
```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}
```

---

### 31. CSS 中的 `overflow` 属性有哪些值？
**答案**：  
- **`visible`**：默认，溢出内容可见。  
- **`hidden`**：隐藏溢出内容。  
- **`scroll`**：始终显示滚动条。  
- **`auto`**：溢出时显示滚动条。

**解析**：  
`overflow` 控制容器内溢出内容的显示方式，常用于限制高度的容器（如模态框）。`overflow: hidden` 还可触发 BFC，解决浮动问题。注意，`overflow-x` 和 `overflow-y` 可分别控制水平和垂直方向。

**示例代码**：
```css
.box {
  width: 100px;
  height: 100px;
  overflow: auto;
}
```

---

### 32. 什么是 CSS 动画？如何实现？
**答案**：  
CSS 动画通过 `@keyframes` 定义关键帧，使用 `animation` 属性应用到元素。`animation` 包括名称、持续时间、缓动函数、延迟、循环次数等。

**解析**：  
相比 `transition`（仅支持起点和终点），动画支持多帧控制，适合复杂效果（如加载动画）。`@keyframes` 定义了从起始状态到结束状态的变化路径，`animation` 控制执行细节。

**示例代码**：
```css
@keyframes slide {
  0% { transform: translateX(0); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(0); }
}
.box {
  width: 100px;
  height: 100px;
  background: blue;
  animation: slide 2s ease-in-out infinite;
}
```

---

### 33. CSS 中的 `transition` 属性有什么作用？
**答案**：  
`transition` 定义属性变化的过渡效果，包括：  
- `transition-property`：目标属性（如 `width`）。  
- `transition-duration`：持续时间（如 `1s`）。  
- `transition-timing-function`：缓动函数（如 `ease`）。  
- `transition-delay`：延迟时间（如 `0.5s`）。

**解析**：  
`transition` 提供平滑的样式切换效果，常用于交互（如按钮悬停）。它只支持两状态（开始和结束），不支持中间帧控制。简写形式为 `transition: width 1s ease 0.5s;`。

**示例代码**：
```css
.box {
  width: 100px;
  height: 100px;
  background: green;
  transition: width 1s ease;
}
.box:hover {
  width: 200px;
}
```

---

### 34. Flex 布局的核心属性有哪些？
**答案**：  
- **容器属性**：  
  - `display: flex;`：启用 Flex 布局。  
  - `flex-direction`：排列方向（`row`、`column`）。  
  - `justify-content`：主轴对齐（`center`、`space-between`）。  
  - `align-items`：交叉轴对齐（`center`、`stretch`）。  
- **子项属性**：  
  - `flex`：简写（`flex-grow`、`flex-shrink`、`flex-basis`）。  
  - `align-self`：单独对齐。

**解析**：  
Flex（弹性布局）是一维布局方案，适合行或列排列。它通过主轴和交叉轴的概念简化了居中、对齐等操作，是现代布局的首选。

**示例代码**：
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.item {
  flex: 1;
}
```

---

### 35. Grid 布局与 Flex 的区别是什么？
**答案**：  
- **Flex**：一维布局，专注于行或列的排列，适合线性布局。  
- **Grid**：二维布局，支持行列网格，适合复杂页面结构。  
**区别**：  
- 维度：Flex 是一维，Grid 是二维。  
- 控制：Grid 提供更精确的网格定位（如 `grid-column`）。  
- 复杂度：Flex 更简单，Grid 更强大。

**解析**：  
Flex 适合导航栏、卡片列表等单向布局；Grid 适合仪表盘、表格等需要行列控制的场景。两者可结合使用（如外层 Grid，内层 Flex）。

**示例代码**：
```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
```

---

### 36. CSS 中的 `visibility` 和 `display: none` 的区别？
**答案**：  
- **`visibility: hidden`**：隐藏元素，但保留空间，仍在文档流中。  
- **`display: none`**：隐藏元素，不占空间，脱离文档流。  
**区别**：  
- 空间占用：`visibility` 保留，`display` 不保留。  
- 性能：`display: none` 移除渲染树，性能稍优。  
- 继承：`visibility` 可被子元素覆盖。

**解析**：  
`visibility` 适合临时隐藏（如动画过渡），`display` 适合完全移除（如条件渲染）。注意，`visibility` 的子元素可通过 `visibility: visible` 显示。

**示例代码**：
```css
.hidden { visibility: hidden; }
.gone { display: none; }
```

---

### 37. 如何实现一个圆形进度条？
**答案**：  
使用 SVG 的 `<circle>` 结合 `stroke-dasharray` 和 `stroke-dashoffset`，或 CSS 的 `border-radius` 和旋转。

**解析**：  
SVG 方案更精确，通过 `stroke-dasharray` 设置圆周长度，`stroke-dashoffset` 控制进度。CSS 方案使用两个半圆拼接，适合简单场景。SVG 是主流选择，支持动态更新。

**示例代码**：
```html
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="gray" stroke-width="10" fill="none" />
  <circle cx="50" cy="50" r="40" stroke="blue" stroke-width="10" fill="none" stroke-dasharray="251.2" stroke-dashoffset="75.36" />
</svg>
<!-- 251.2 = 2 * π * 40（圆周长），75.36 表示 70% 进度 -->
```

---

### 38. CSS 中的 `calc()` 函数有什么用？
**答案**：  
`calc()` 是一个计算函数，支持加减乘除，用于动态计算长度值（如 `width: calc(100% - 20px);`）。

**解析**：  
`calc()` 增强了 CSS 的灵活性，支持不同单位（如 `px`、`%`、`em`）混合计算，常用于响应式布局或复杂间距调整。它在运行时计算，兼容性良好（IE9+）。

**示例代码**：
```css
.box {
  width: calc(100% - 50px);
  height: calc(50vh - 20px);
}
```

---

### 39. 如何使用 CSS 实现多列布局？
**答案**：  
使用 `column-count`（列数）、`column-width`（列宽）或 `columns`（简写），配合 `column-gap` 设置间距。

**解析**：  
多列布局（Column Layout）适合文章排版，内容会自动分配到各列。`column-count` 固定列数，`column-width` 动态调整列数，常用于响应式设计。

**示例代码**：
```css
.text {
  column-count: 3;
  column-gap: 20px;
  column-rule: 1px solid #ccc;
}
```

---

### 40. 什么是 CSS 的伪元素（pseudo-element）？
**答案**：  
伪元素是虚拟元素，用于在元素前后插入内容或样式，常见的有 `::before` 和 `::after`。语法为双冒号（`::`），单冒号（`:`）也兼容。

**解析**：  
伪元素通过 `content` 属性添加内容，常用于装饰（如图标）或清除浮动。它们在 DOM 中不可见，但影响渲染。注意，`::before` 和 `::after` 需配合 `content` 使用。

**示例代码**：
```css
.box::before {
  content: '★';
  color: red;
  margin-right: 5px;
}
```

---

### 41. CSS 中的 `opacity` 和 `rgba` 的区别？
**答案**：  
- **`opacity`**：设置整个元素的透明度（0-1），影响所有子元素。  
- **`rgba`**：设置颜色的透明度（如 `rgba(255, 0, 0, 0.5)`），仅影响指定属性。  
**区别**：  
- 作用范围：`opacity` 影响整体，`rgba` 仅影响颜色。  
- 继承：`opacity` 不可被子元素覆盖。

**解析**：  
`opacity` 适合淡入淡出效果，`rgba` 适合背景或边框的透明控制。两者常结合使用以实现复杂效果。

**示例代码**：
```css
.box1 { opacity: 0.5; }
.box2 { background: rgba(255, 0, 0, 0.5); }
```

---

### 42. 如何实现一个自适应正方形？
**答案**：  
- **传统方法**：`padding-top: 100%;`（基于宽度计算）。  
- **现代方法**：`aspect-ratio: 1 / 1;`。

**解析**：  
`padding-top` 利用百分比相对于宽度的特性，保持 1:1 比例。`aspect-ratio` 是 CSS 新属性（Chrome 88+），更直观，支持任意比例，兼容性逐渐提升。

**示例代码**：
```css
.square {
  width: 50%;
  padding-top: 50%;
  background: blue;
}
/* 或 */
.square {
  width: 50%;
  aspect-ratio: 1 / 1;
  background: blue;
}
```

---

### 43. CSS 中的 `clip-path` 有什么作用？
**答案**：  
`clip-path` 定义元素的裁剪区域，创建不规则形状（如多边形、圆形），只显示裁剪内的内容。

**解析**：  
`clip-path` 比 `border-radius` 更灵活，支持复杂图形（如五角星），常用于创意设计或动画。值可以是 `polygon()`、`circle()` 等，兼容性较好（IE 不支持）。

**示例代码**：
```css
.box {
  width: 100px;
  height: 100px;
  background: green;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
```

---

### 44. 如何清除浮动？
**答案**：  
- **伪元素法**：使用 `::after` 添加 `clear: both;`。  
- **BFC 法**：父元素设置 `overflow: hidden;`。  
- **直接清除**：添加 `<div style="clear: both;"></div>`。

**解析**：  
浮动会导致父元素高度塌陷，影响布局。伪元素法是现代主流，简洁且不增加 DOM 节点；BFC 法利用格式化上下文特性；直接清除法简单但增加冗余标记。

**示例代码**：
```css
.container::after {
  content: '';
  display: block;
  clear: both;
}
.float {
  float: left;
}
```

---

### 45. CSS 中的 `will-change` 属性有什么用？
**答案**：  
`will-change` 提示浏览器哪些属性将发生变化（如 `transform`、`opacity`），提前优化渲染性能。

**解析**：  
它将元素提升到独立图层，减少重绘和回流，但滥用会增加内存占用。适合高频动画，不建议设为 `auto` 或过于宽泛的值（如 `will-change: all`）。

**示例代码**：
```css
.box {
  will-change: transform;
  transition: transform 0.3s;
}
.box:hover {
  transform: scale(1.1);
}
```

---

### 46. 如何实现文字溢出省略号？
**答案**：  
单行：`overflow: hidden; white-space: nowrap; text-overflow: ellipsis;`。  
多行：使用 `-webkit-line-clamp`（Webkit 浏览器）。

**解析**：  
单行省略是标准方案，兼容性好；多行省略依赖 Webkit 特性（如 Chrome），其他浏览器需 JS 辅助。常用于标题或摘要。

**示例代码**：
```css
/* 单行 */
.text {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 多行 */
.multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

### 47. CSS 中的 `box-shadow` 如何使用？
**答案**：  
`box-shadow` 添加阴影，参数依次为：水平偏移、垂直偏移、模糊半径、扩展半径、颜色。支持多重阴影（逗号分隔）。

**解析**：  
`box-shadow` 增强视觉层次，常用于卡片、按钮等。`inset` 关键字可创建内阴影。多重阴影可实现复杂效果（如立体感）。

**示例代码**：
```css
.box {
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 255, 0.5);
}
```

---

### 48. 什么是 CSS 的 `currentColor`？
**答案**：  
`currentColor` 是当前元素的 `color` 值，可用于其他属性（如 `border`、`background`）。

**解析**：  
它是一个动态变量，确保颜色一致性，减少重复定义。常用于图标或边框与文本颜色同步。

**示例代码**：
```css
.box {
  color: red;
  border: 1px solid currentColor;
  box-shadow: 0 0 5px currentColor;
}
```

---

### 49. 如何实现一个响应式导航栏？
**答案**：  
使用 Flex 布局定义导航结构，结合媒体查询适配不同屏幕，必要时切换为汉堡菜单。

**解析**：  
响应式导航需考虑桌面端（水平排列）和移动端（垂直或隐藏）。Flex 提供灵活的对齐方式，媒体查询处理断点，JS 可控制菜单切换。

**示例代码**：
```html
<nav class="nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>
<style>
.nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
@media (max-width: 600px) {
  .nav {
    flex-direction: column;
    align-items: center;
  }
}
</style>
```

---

### 50. CSS 中的 `media` 查询如何使用？
**答案**：  
`@media` 定义条件样式，根据设备特性（如宽度、方向）应用不同规则。语法：`@media (条件) { 样式 }`。

**解析**：  
媒体查询是响应式设计的核心，支持 `min-width`、`max-width` 等条件。常用于适配手机、平板、桌面等设备，也可检测打印或暗模式。

**示例代码**：
```css
.box {
  width: 100%;
}
@media (min-width: 768px) {
  .box {
    width: 50%;
  }
}
@media print {
  .box {
    border: 1px solid black;
  }
}
```
