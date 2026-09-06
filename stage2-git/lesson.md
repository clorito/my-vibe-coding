# Stage 2 · Git 版本控制 + AI 协作规范（第 2 周）

## 为什么学 Git
Vibe Coding 改动快、改动多，Git 是你的「后悔药」：任何时刻都能回到之前能用的版本。这是和 AI 大量协作时最重要的安全网。

## Day 1：装 Git + 第一次提交
让 ZCode 手把手带你：
```
我是 Windows 零基础用户。请帮我：
1. 检查电脑是否装了 Git，没装的话告诉我怎么安装
2. 带我在 vibe-coding-course/stage2-git/samples 目录完成：git init、git add、git commit
3. 每一步先解释这条命令做什么再执行
```

核心三件套：
- `git status` —— 看现在改了什么
- `git add .` + `git commit -m "说明"` —— 存一个存档点
- `git log` —— 看历史存档点

## Day 2：让 AI 帮你写提交信息
以后每次改完，直接说：
```
请帮我提交当前所有改动，commit 信息用中文概括这次改了什么。
```

## Day 3：后悔药实操
练习：故意改坏 samples 里的文件 → 问 AI「我想撤销所有未提交的改动」→ 再练习「回到上一个 commit」。
把这两句救命提示词记下来：
```
我想撤销所有还没 commit 的改动，恢复到上次提交的样子，先告诉我影响再执行。
```

## Day 4：推到 GitHub（你的免费代码云盘）
```
带我注册/登录 GitHub，在本地创建一个仓库叫 my-vibe-coding，
把 stage1 和 stage2 的代码都推上去。每一步先解释再操作。
```

## Day 5：养成习惯 —— 每完成一个小功能就提交
节奏：让 AI 改一个功能 → 浏览器验收 → 满意就 commit → 再下一个。
这个「小步提交」习惯能让你在 AI 改乱代码时随时回退。

## samples/ 说明
`samples/my-notes.html`：一个带 localStorage 的记事本页面，本周用它做 Git 练习的靶子（改样式、改文案、回退）。

## 验收清单
- [ ] 能独立完成 add + commit
- [ ] 会用 git log 看历史
- [ ] 会让 AI 帮你撤销/回退
- [ ] GitHub 上能看到你的仓库
