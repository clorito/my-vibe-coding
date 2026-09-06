# Stage 3 · 第一个完整应用：待办清单 Todo App（第 3 周）

## 目标
从"单文件网页"升级到"有数据、有前后端"的完整小应用。
本应用：添加待办、勾选完成、删除、按状态筛选、数据存数据库。

## Day 1：跑通样例 + 理解前后端分工
先直接运行 `todo-app/` 里的样例（见下方「样例说明」），然后问 ZCode：
```
请用零基础能懂的话解释 todo-app 的结构：
1. index.html 和 app.js 负责"前端"的什么
2. server.js（如果我用样例的本地存储版就是 localStorage）负责"数据"的什么
3. 用户点击"添加"之后，数据是怎么一步步流动的
```

## Day 2：需求文档思维 —— 先写清需求再让 AI 动手
把下面的模板填好，让 AI 实现（本周核心练习）：
```
请在 stage3-first-app/todo-app/ 里开发待办清单应用，需求：
1. 功能：添加待办（标题+截止日）、勾选完成（划线效果）、删除、
   按 全部/未完成/已完成 筛选、显示未完成数量
2. 数据：先用 localStorage 保存
3. 技术：单个 index.html + app.js，不用框架
4. 风格：简洁清新，浅色主题
5. 先给我一个实现计划，我确认后再写代码
```
最后一句很重要：让 AI 先出计划，你能学会拆解需求，也减少额度浪费。

## Day 3：逐个功能验收 + 修
验收提示词：
```
请逐条检查以下验收点，通过的打勾，不通过的你来修：
- [ ] 输入空内容点添加不会产生空待办
- [ ] 刷新页面数据还在
- [ ] 筛选"已完成"后新增待办，显示符合预期
- [ ] 删除后再刷新，被删的不会复活
```

## Day 4：升级到真正的后端（Node.js + Express）
```
现在把 todo-app 升级成前后端结构：
- 用 Node.js + Express 写 server.js，提供 REST API（GET/POST/PUT/DELETE /api/todos）
- 数据用 JSON 文件存在 data/todos.json
- 前端改成调 API，不再用 localStorage
- 告诉我怎么安装依赖（npm init / npm install express）和启动
每一步解释给我听，我零基础。
```

## Day 5：学一点 API 概念
问 AI：「用点外卖打比方，给我讲什么是 GET/POST/PUT/DELETE 和 JSON」，
然后用浏览器直接访问 `http://localhost:3000/api/todos` 看原始 JSON 数据。

## 样例说明
`todo-app/index.html`：单文件版（localStorage），Day 1-3 的练习靶子。Day 4 起让 AI 在同目录升级。

## 验收清单
- [ ] 应用能通过 `npm start`（或直接开 html）运行
- [ ] 五个功能全部通过验收点
- [ ] 你能讲出"点添加按钮后数据去了哪里"
- [ ] 本阶段代码已 git commit 并推到 GitHub
