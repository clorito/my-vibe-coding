// ===== 待办清单 Pro：全部逻辑（后端 API 版）=====
// 模式不变：改数据 → 落库（现在是调服务器 API）→ render()
// 区别：数据不再存浏览器 localStorage，而是存在服务器的 todos.json 里

const API = "/api/todos";
let filter = "all";
let editingId = null;   // 当前正在编辑哪一条（null = 没在编辑）

// ---- 存取（异步：网络请求需要等待，await 表示"等结果回来再往下走"）----
async function load() {
  const res = await fetch(API);            // 向服务器要数据
  const list = await res.json();           // 把响应解析成数组
  // 兼容旧数据：没有 priority 字段的按 4（中性）处理
  return list.map(t => ({ priority: 4, ...t }));
}

async function addTodo() {
  const titleEl = document.getElementById("titleInput");
  const title = titleEl.value.trim();
  if (!title) return alert("请输入内容");
  const due = document.getElementById("dueInput").value;
  const priority = Number(document.getElementById("priInput").value);

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, due, done: false, priority })
  });
  titleEl.value = "";
  document.getElementById("dueInput").value = todayStr();   // 添加完也归位为今天
  render();
}

async function finishEdit(id, newTitle, newDue, newPriority) {
  const title = newTitle.trim();
  if (!title) return alert("标题不能为空");
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, due: newDue, priority: Number(newPriority) })
  });
  editingId = null;
  render();
}

async function toggleDone(id) {
  const todos = await load();
  const item = todos.find(t => t.id === id);
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !item.done })
  });
  render();
}

async function removeTodo(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  render();
}

// ---- 优先级配色：1 红 → 7 绿，色相 0°~120° 均分 ----
function priorityColor(p) {
  const hue = (p - 1) / 6 * 120;
  return `hsl(${hue}, 85%, 55%)`;
}

// ---- 今天的日期串（本地时区），用于判断超期 ----
function todayStr() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// ---- 渲染 ----
async function render() {
  const todos = await load();
  const today = todayStr();

  const visible = todos.filter(t =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  const list = document.getElementById("list");
  list.innerHTML = "";
  document.getElementById("empty").style.display =
    visible.length === 0 ? "block" : "none";

  visible.forEach(t => {
    const li = document.createElement("li");
    if (t.done) li.classList.add("done");

    // 优先级色块（数字写在颜色里）
    const pri = document.createElement("span");
    pri.className = "pri";
    pri.textContent = t.priority;
    pri.style.background = priorityColor(t.priority);
    li.appendChild(pri);

    if (editingId === t.id) {
      // ===== 编辑态：标题、日期、优先级全部可改 =====
      const input = document.createElement("input");
      input.className = "edit-input";
      input.value = t.title;
      li.appendChild(input);

      const dueInput = document.createElement("input");
      dueInput.type = "date";
      dueInput.value = t.due || "";
      dueInput.style.cssText =
        "background:#0d1322;border:1px solid rgba(127,219,255,.2);color:var(--text);border-radius:6px;padding:5px;font-size:13px;";
      li.appendChild(dueInput);

      const priInput = document.createElement("select");
      priInput.style.cssText =
        "background:#0d1322;border:1px solid rgba(127,219,255,.2);color:var(--text);border-radius:6px;padding:5px;font-size:13px;";
      for (let p = 1; p <= 7; p++) {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = "P" + p;
        if (p === t.priority) opt.selected = true;
        priInput.appendChild(opt);
      }
      li.appendChild(priInput);

      const ok = document.createElement("button");
      ok.className = "op";
      ok.textContent = "💾";
      ok.onclick = () => finishEdit(t.id, input.value, dueInput.value, priInput.value);
      li.appendChild(ok);

      const cancel = document.createElement("button");
      cancel.className = "op del";
      cancel.textContent = "✖";
      cancel.onclick = () => { editingId = null; render(); };
      li.appendChild(cancel);

      input.focus();                    // 自动聚焦，直接打字即可
      input.addEventListener("keydown", e => {
        if (e.key === "Enter") finishEdit(t.id, input.value, dueInput.value, priInput.value);
        if (e.key === "Escape") { editingId = null; render(); }
      });
    } else {
      // ===== 普通展示态 =====
      const overdue = t.due && !t.done && t.due < today;
      const title = document.createElement("span");
      title.className = "title" + (overdue ? " overdue" : "");
      title.textContent = t.title;
      title.title = overdue ? "已超期" : "";   // 悬停提示
      li.appendChild(title);

      if (t.due) {
        const due = document.createElement("span");
        due.className = "due" + (overdue ? " overdue" : "");
        due.textContent = overdue ? "⚠ " + t.due : t.due;
        li.appendChild(due);
      }

      // 编辑按钮
      const edit = document.createElement("button");
      edit.className = "op";
      edit.textContent = "✏️";
      edit.onclick = () => { editingId = t.id; render(); };
      li.appendChild(edit);
    }

    // 勾选框（插到最前面）
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;
    checkbox.style.accentColor = "#00c6ff";
    checkbox.onchange = () => toggleDone(t.id);
    li.insertBefore(checkbox, li.firstChild);

    // 删除按钮（最后）
    const del = document.createElement("button");
    del.className = "op del";
    del.textContent = "🗑";
    del.onclick = () => removeTodo(t.id);
    li.appendChild(del);

    list.appendChild(li);
  });

  document.getElementById("count").textContent =
    `未完成 ${todos.filter(t => !t.done).length} 项`;
}

// ---- 筛选 ----
function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

document.getElementById("titleInput").addEventListener("keydown", e => {
  if (e.key === "Enter") addTodo();
});

// 页面打开时，日期默认填今天
document.getElementById("dueInput").value = todayStr();

render();
