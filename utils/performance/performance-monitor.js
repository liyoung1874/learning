class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      sampleRate: 100, // 百分比，默认100%采样
      reportUrl: null, // 上报地址
      autoSend: false, // 是否自动发送数据
      ...options,
    };

    this.metrics = {};
    this.resources = [];
    this.marks = {};
    this.measures = {};
    this.longTasks = [];
    this.layoutShifts = [];
    this.FPSData = [];

    // 随机决定是否采样
    this.isSampled = Math.random() * 100 <= this.options.sampleRate;

    if (this.isSampled) {
      this.init();
    }
  }

  init() {
    // 基本性能指标收集
    this.collectNavigationTiming();
    this.observeResources();
    this.observeLayoutShifts();
    this.observeLongTasks();
    this.collectWebVitals();
    this.trackMemoryUsage();
    this.trackFPS();

    // 页面加载完成后收集指标
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.updateNavigationTiming();
        if (this.options.autoSend) {
          this.sendMetrics();
        }
      }, 1000);
    });

    // 页面卸载时发送最终指标
    window.addEventListener("beforeunload", () => {
      this.collectFinalMetrics();
      if (this.options.autoSend) {
        this.sendMetrics(true);
      }
    });
  }

  // 收集导航计时指标
  collectNavigationTiming() {
    if (!performance || !performance.timing) return;

    const timing = performance.timing;
    const navigationStart = timing.navigationStart;

    this.metrics.navigationTiming = {
      navigationStart: navigationStart,
      unloadEventStart: timing.unloadEventStart - navigationStart,
      unloadEventEnd: timing.unloadEventEnd - navigationStart,
      redirectStart: timing.redirectStart - navigationStart,
      redirectEnd: timing.redirectEnd - navigationStart,
      fetchStart: timing.fetchStart - navigationStart,
      domainLookupStart: timing.domainLookupStart - navigationStart,
      domainLookupEnd: timing.domainLookupEnd - navigationStart,
      connectStart: timing.connectStart - navigationStart,
      connectEnd: timing.connectEnd - navigationStart,
      secureConnectionStart: timing.secureConnectionStart
        ? timing.secureConnectionStart - navigationStart
        : 0,
      requestStart: timing.requestStart - navigationStart,
      responseStart: timing.responseStart - navigationStart,
      responseEnd: timing.responseEnd - navigationStart,
      domLoading: timing.domLoading - navigationStart,
      domInteractive: timing.domInteractive - navigationStart,
      domContentLoadedEventStart:
        timing.domContentLoadedEventStart - navigationStart,
      domContentLoadedEventEnd:
        timing.domContentLoadedEventEnd - navigationStart,
      domComplete: timing.domComplete - navigationStart,
      loadEventStart: timing.loadEventStart - navigationStart,
      loadEventEnd: timing.loadEventEnd - navigationStart,
    };

    // 计算关键时间
    this.metrics.TTFB = timing.responseStart - timing.navigationStart;
  }

  // 页面加载后更新导航计时数据
  updateNavigationTiming() {
    if (!performance || !performance.timing) return;

    const timing = performance.timing;
    const navigationStart = timing.navigationStart;

    this.metrics.pageLoadTime = timing.loadEventEnd - navigationStart;
    this.metrics.domReadyTime =
      timing.domContentLoadedEventEnd - navigationStart;
    this.metrics.dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    this.metrics.tcpConnectTime = timing.connectEnd - timing.connectStart;
    this.metrics.requestTime = timing.responseStart - timing.requestStart;
    this.metrics.responseTime = timing.responseEnd - timing.responseStart;
    this.metrics.domProcessingTime = timing.domComplete - timing.domLoading;
  }

  // 监控资源加载
  observeResources() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "resource") {
            this.resources.push({
              name: entry.name,
              type: entry.initiatorType,
              startTime: entry.startTime,
              duration: entry.duration,
              transferSize: entry.transferSize,
              decodedBodySize: entry.decodedBodySize,
              encodedBodySize: entry.encodedBodySize,
            });
          }
        });
      });

      observer.observe({ entryTypes: ["resource"] });
    } catch (e) {
      console.error("Resource monitoring error:", e);
    }
  }

  // 监控布局偏移
  observeLayoutShifts() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.layoutShifts.push({
            value: entry.value,
            startTime: entry.startTime,
            sources: entry.sources || [],
          });
        });

        // 计算累积布局偏移 (CLS)
        const totalShift = this.layoutShifts.reduce(
          (sum, shift) => sum + shift.value,
          0
        );
        this.metrics.CLS = totalShift;
      });

      observer.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.error("Layout shift monitoring error:", e);
    }
  }

  // 监控长任务
  observeLongTasks() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.longTasks.push({
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
            attribution: entry.attribution,
          });
        });

        // 计算总阻塞时间 (TBT)
        const threshold = 50; // 长任务阈值 (ms)
        this.metrics.TBT = this.longTasks.reduce((sum, task) => {
          return sum + Math.max(0, task.duration - threshold);
        }, 0);
      });

      observer.observe({ entryTypes: ["longtask"] });
    } catch (e) {
      console.error("Long task monitoring error:", e);
    }
  }

  // 收集Web Vitals指标
  collectWebVitals() {
    if (!window.PerformanceObserver) return;

    // 首次内容绘制 (FCP)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries[entries.length - 1];
        this.metrics.FCP = fcpEntry.startTime;
        fcpObserver.disconnect();
      });

      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {
      console.error("FCP monitoring error:", e);
    }

    // 最大内容绘制 (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        this.metrics.LCP = lcpEntry.startTime;
      });

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      console.error("LCP monitoring error:", e);
    }

    // 首次输入延迟 (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === "first-input") {
            this.metrics.FID = entry.processingStart - entry.startTime;
            fidObserver.disconnect();
          }
        });
      });

      fidObserver.observe({ type: "first-input", buffered: true });
    } catch (e) {
      console.error("FID monitoring error:", e);
    }
  }

  // 内存使用监控
  trackMemoryUsage() {
    if (performance.memory) {
      const collectMemory = () => {
        this.metrics.memory = {
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        };
      };

      collectMemory();
      setInterval(collectMemory, 10000); // 每10秒收集一次
    }
  }

  // FPS监控
  trackFPS() {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    const collect = () => {
      frames++;
      const now = performance.now();
      const delta = now - lastTime;

      if (delta >= 1000) {
        fps = Math.round((frames * 1000) / delta);
        this.FPSData.push({
          timestamp: now,
          fps: fps,
        });

        frames = 0;
        lastTime = now;
      }

      requestAnimationFrame(collect);
    };

    requestAnimationFrame(collect);
  }

  // 用户自定义计时点
  mark(name) {
    if (performance && performance.mark) {
      const markName = `custom:${name}`;
      performance.mark(markName);
      this.marks[name] = performance.now();
      return markName;
    }
    return null;
  }

  // 测量两个计时点之间的时间
  measure(name, startMark, endMark) {
    if (performance && performance.measure) {
      try {
        const measureName = `custom:${name}`;
        performance.measure(
          measureName,
          `custom:${startMark}`,
          `custom:${endMark}`
        );

        const startTime = this.marks[startMark] || 0;
        const endTime = this.marks[endMark] || performance.now();

        this.measures[name] = endTime - startTime;
        return measureName;
      } catch (e) {
        console.error("Measurement error:", e);
      }
    }
    return null;
  }

  // 获取DOM节点统计
  getDOMStats() {
    this.metrics.domStats = {
      elements: document.getElementsByTagName("*").length,
      documentSize: document.documentElement.outerHTML.length,
      maxDOMDepth: this.getMaxDOMDepth(),
      totalNodes: document.querySelectorAll("*").length,
    };
  }

  // 获取DOM最大深度
  getMaxDOMDepth() {
    let max = 0;

    function getDepth(node, depth) {
      if (depth > max) max = depth;
      for (let i = 0; i < node.children.length; i++) {
        getDepth(node.children[i], depth + 1);
      }
    }

    getDepth(document.body, 1);
    return max;
  }

  // 收集最终指标
  collectFinalMetrics() {
    this.getDOMStats();

    // 资源计数
    const resourcesByType = {};
    this.resources.forEach((resource) => {
      resourcesByType[resource.type] =
        (resourcesByType[resource.type] || 0) + 1;
    });

    this.metrics.resourceCounts = resourcesByType;

    // 计算JS、CSS、图片等资源总大小
    const resourceSizeByType = {};
    this.resources.forEach((resource) => {
      if (!resourceSizeByType[resource.type]) {
        resourceSizeByType[resource.type] = 0;
      }
      resourceSizeByType[resource.type] += resource.transferSize || 0;
    });

    this.metrics.resourceSizes = resourceSizeByType;

    // 计算平均FPS
    if (this.FPSData.length > 0) {
      const totalFPS = this.FPSData.reduce((sum, data) => sum + data.fps, 0);
      this.metrics.averageFPS = totalFPS / this.FPSData.length;
    }
  }

  // 发送性能数据
  sendMetrics(sync = false) {
    if (!this.options.reportUrl) return;

    const data = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.metrics,
      resources: this.options.includeResources ? this.resources : undefined,
      longTasks: this.options.includeLongTasks ? this.longTasks : undefined,
      layoutShifts: this.options.includeLayoutShifts
        ? this.layoutShifts
        : undefined,
      measures: this.measures,
    };

    if (sync) {
      // 同步发送（适用于beforeunload事件）
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      navigator.sendBeacon(this.options.reportUrl, blob);
    } else {
      // 异步发送
      fetch(this.options.reportUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch((err) => console.error("Error sending metrics:", err));
    }

    return data;
  }

  // 获取收集的所有指标
  getAllMetrics() {
    this.collectFinalMetrics();
    return {
      metrics: this.metrics,
      resources: this.resources,
      longTasks: this.longTasks,
      layoutShifts: this.layoutShifts,
      measures: this.measures,
      fpsData: this.FPSData,
    };
  }
}
