// ===== 待办清单后端服务器 =====
// 职责：1. 保管数据（data/todos.json） 2. 对外提供 API 3. 把页面发给浏览器

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "data", "todos.json");
const PORT = 3000;

// 中间件：让 express 能读懂 JSON 请求体（POST/PUT 传来的数据）
app.use(express.json());

// ---- 数据的读和写（对文件的封装） ----
function readTodos() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}
function writeTodos(todos) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
}

// ---- 四个 API：对应增删改查 ----
// 用餐厅打比方：GET=看菜单，POST=下单，PUT=改单，DELETE=退单

// 查：获取全部待办
app.get("/api/todos", (req, res) => {
  res.json(readTodos());
});

// 增：新增一条待办
app.post("/api/todos", (req, res) => {
  const todos = readTodos();
  const item = { id: Date.now(), ...req.body };
  todos.push(item);
  writeTodos(todos);
  res.status(201).json(item);
});

// 改：更新某条待办（URL 里的 :id 是占位符，指明改哪条）
app.put("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const item = todos.find(t => t.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "找不到这条待办" });
  Object.assign(item, req.body);   // 把传来的字段合并进去
  writeTodos(todos);
  res.json(item);
});

// 删：删除某条待办
app.delete("/api/todos/:id", (req, res) => {
  const todos = readTodos();
  const next = todos.filter(t => t.id !== Number(req.params.id));
  if (next.length === todos.length) return res.status(404).json({ error: "找不到这条待办" });
  writeTodos(next);
  res.status(204).end();
});

// ---- 静态页面：访问 http://localhost:3000 时把 index.html 发给浏览器 ----
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`待办清单服务器已启动： http://localhost:${PORT}`);
});
