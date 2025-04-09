class PerformanceVisualizer {
  constructor(metrics, containerId) {
    this.metrics = metrics;
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = containerId;
      document.body.appendChild(this.container);
    }
  }

  render() {
    this.container.innerHTML = "";
    this.createHeader();
    this.createMetricsTable();
    this.createResourcesChart();
    this.createFPSChart();
    this.createLongTasksChart();
  }

  createHeader() {
    const header = document.createElement("div");
    header.className = "perf-header";
    header.innerHTML = `
        <h2>性能监控报告</h2>
        <p>页面: ${window.location.href}</p>
        <p>生成时间: ${new Date().toLocaleString()}</p>
      `;
    this.container.appendChild(header);
  }

  createMetricsTable() {
    const metricsTable = document.createElement("div");
    metricsTable.className = "perf-metrics-table";

    const webVitalsHTML = `
        <h3>核心Web指标</h3>
        <table>
          <tr>
            <th>指标</th>
            <th>值</th>
            <th>状态</th>
          </tr>
          <tr>
            <td>LCP (最大内容绘制)</td>
            <td>${Math.round(this.metrics.metrics.LCP || 0)}ms</td>
            <td>${this.getRatingClass(
              this.metrics.metrics.LCP,
              2500,
              4000
            )}</td>
          </tr>
          <tr>
            <td>FID (首次输入延迟)</td>
            <td>${Math.round(this.metrics.metrics.FID || 0)}ms</td>
            <td>${this.getRatingClass(this.metrics.metrics.FID, 100, 300)}</td>
          </tr>
          <tr>
            <td>CLS (累积布局偏移)</td>
            <td>${(this.metrics.metrics.CLS || 0).toFixed(3)}</td>
            <td>${this.getRatingClass(
              this.metrics.metrics.CLS,
              0.1,
              0.25,
              true
            )}</td>
          </tr>
          <tr>
            <td>FCP (首次内容绘制)</td>
            <td>${Math.round(this.metrics.metrics.FCP || 0)}ms</td>
            <td>${this.getRatingClass(
              this.metrics.metrics.FCP,
              1800,
              3000
            )}</td>
          </tr>
          <tr>
            <td>TTFB (首字节时间)</td>
            <td>${Math.round(this.metrics.metrics.TTFB || 0)}ms</td>
            <td>${this.getRatingClass(
              this.metrics.metrics.TTFB,
              800,
              1800
            )}</td>
          </tr>
        </table>
      `;

    metricsTable.innerHTML = webVitalsHTML;
    this.container.appendChild(metricsTable);

    // 添加其他性能指标部分
    const otherMetricsTable = document.createElement("div");
    otherMetricsTable.className = "perf-other-metrics";

    const navigationTiming = this.metrics.metrics.navigationTiming || {};
    const pageLoadTime = this.metrics.metrics.pageLoadTime || 0;

    otherMetricsTable.innerHTML = `
        <h3>其他性能指标</h3>
        <table>
          <tr>
            <th>指标</th>
            <th>值</th>
          </tr>
          <tr>
            <td>页面加载时间</td>
            <td>${Math.round(pageLoadTime)}ms</td>
          </tr>
          <tr>
            <td>DOM处理时间</td>
            <td>${Math.round(
              this.metrics.metrics.domProcessingTime || 0
            )}ms</td>
          </tr>
          <tr>
            <td>平均FPS</td>
            <td>${Math.round(this.metrics.metrics.averageFPS || 0)}</td>
          </tr>
          <tr>
            <td>总阻塞时间 (TBT)</td>
            <td>${Math.round(this.metrics.metrics.TBT || 0)}ms</td>
          </tr>
          <tr>
            <td>DOM元素数量</td>
            <td>${this.metrics.metrics.domStats?.elements || 0}</td>
          </tr>
          <tr>
            <td>最大DOM深度</td>
            <td>${this.metrics.metrics.domStats?.maxDOMDepth || 0}</td>
          </tr>
        </table>
      `;

    this.container.appendChild(otherMetricsTable);
  }

  getRatingClass(value, good, poor, lowerIsBetter = false) {
    if (value === undefined || value === null)
      return '<span class="neutral">未知</span>';

    if (lowerIsBetter) {
      if (value <= good) return '<span class="good">良好</span>';
      if (value <= poor) return '<span class="needs-improvement">需改进</span>';
      return '<span class="poor">较差</span>';
    } else {
      if (value <= good) return '<span class="good">良好</span>';
      if (value <= poor) return '<span class="needs-improvement">需改进</span>';
      return '<span class="poor">较差</span>';
    }
  }

  createResourcesChart() {
    // 这里可以实现资源加载图表
    // 简化版，实际项目中可以使用Chart.js等库创建图表
    const resourcesDiv = document.createElement("div");
    resourcesDiv.className = "perf-resources";
    resourcesDiv.innerHTML = "<h3>资源加载情况</h3>";

    const resourceTypes = {};

    // 按资源类型分组
    (this.metrics.resources || []).forEach((resource) => {
      if (!resourceTypes[resource.type]) {
        resourceTypes[resource.type] = {
          count: 0,
          totalSize: 0,
          maxDuration: 0,
          avgDuration: 0,
          totalDuration: 0,
        };
      }

      resourceTypes[resource.type].count++;
      resourceTypes[resource.type].totalSize += resource.transferSize || 0;
      resourceTypes[resource.type].totalDuration += resource.duration || 0;

      if (resource.duration > resourceTypes[resource.type].maxDuration) {
        resourceTypes[resource.type].maxDuration = resource.duration;
      }
    });

    // 计算平均加载时间
    Object.keys(resourceTypes).forEach((type) => {
      resourceTypes[type].avgDuration =
        resourceTypes[type].totalDuration / resourceTypes[type].count;
    });

    const table = document.createElement("table");
    table.innerHTML = `
        <tr>
          <th>资源类型</th>
          <th>数量</th>
          <th>总大小</th>
          <th>平均加载时间</th>
          <th>最大加载时间</th>
        </tr>
      `;

    Object.keys(resourceTypes).forEach((type) => {
      const data = resourceTypes[type];
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${type || "未知"}</td>
          <td>${data.count}</td>
          <td>${(data.totalSize / 1024).toFixed(2)} KB</td>
          <td>${data.avgDuration.toFixed(2)} ms</td>
          <td>${data.maxDuration.toFixed(2)} ms</td>
        `;
      table.appendChild(row);
    });

    resourcesDiv.appendChild(table);
    this.container.appendChild(resourcesDiv);
  }

  createFPSChart() {
    // FPS图表展示框架
    const fpsDiv = document.createElement("div");
    fpsDiv.className = "perf-fps-chart";
    fpsDiv.innerHTML = "<h3>FPS性能</h3>";

    // 实际项目中可以使用Canvas绘制图表
    const fpsInfo = document.createElement("p");
    fpsInfo.textContent = `平均FPS: ${Math.round(
      this.metrics.metrics.averageFPS || 0
    )}`;
    fpsDiv.appendChild(fpsInfo);

    this.container.appendChild(fpsDiv);
  }

  createLongTasksChart() {
    const longTasksDiv = document.createElement("div");
    longTasksDiv.className = "perf-long-tasks";
    longTasksDiv.innerHTML = "<h3>长任务分析</h3>";

    const longTasks = this.metrics.longTasks || [];

    if (longTasks.length === 0) {
      const noTasks = document.createElement("p");
      noTasks.textContent = "没有检测到长任务";
      longTasksDiv.appendChild(noTasks);
    } else {
      const table = document.createElement("table");
      table.innerHTML = `
          <tr>
            <th>开始时间</th>
            <th>持续时间</th>
            <th>任务名称</th>
          </tr>
        `;

      longTasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${Math.round(task.startTime)}ms</td>
            <td>${Math.round(task.duration)}ms</td>
            <td>${task.name}</td>
          `;
        table.appendChild(row);
      });

      longTasksDiv.appendChild(table);
    }

    this.container.appendChild(longTasksDiv);
  }
}
