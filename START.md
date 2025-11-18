# 项目启动指南

## 快速启动

### 1. 启动后端服务器

```bash
cd server
npm run dev
```

后端服务将运行在：`http://localhost:3010`

### 2. 启动前端应用

打开新的终端窗口：

```bash
cd frontend
npm run dev
```

前端应用将运行在：`http://localhost:5174`

### 3. 访问应用

在浏览器中打开：`http://localhost:5174`

---

## 首次启动（初始化项目）

如果是第一次运行项目，需要先完成以下步骤：

### 1. 安装依赖

```bash
# 安装后端依赖
cd server
npm install

# 安装前端依赖
cd ../frontend
npm install
```

### 2. 配置数据库

确保 PostgreSQL 已安装并运行，然后：

```bash
cd server

# 创建数据库（如果还没创建）
# 在 PostgreSQL 中执行：CREATE DATABASE noteapp;

# 配置环境变量
# 复制 .env.example 为 .env，并修改数据库连接信息
cp .env.example .env

# 运行数据库迁移
npm run prisma:migrate

# 生成 Prisma Client
npm run prisma:generate
```

### 3. 配置前端环境变量

```bash
cd frontend

# 创建 .env 文件
echo VITE_API_URL=http://localhost:3010/api > .env
```

---

## 常用命令

### 后端命令

```bash
cd server

npm run dev              # 开发模式（热重载）
npm run build            # 构建生产版本
npm start                # 运行生产版本
npm run prisma:studio    # 打开数据库管理界面
npm run prisma:migrate   # 运行数据库迁移
```

### 前端命令

```bash
cd frontend

npm run dev              # 开发模式
npm run build            # 构建生产版本
npm run preview          # 预览生产版本
```

---

## 端口说明

- **后端 API**: `http://localhost:3000`
- **前端应用**: `http://localhost:5174`
- **数据库**: `localhost:5432` (PostgreSQL 默认端口)

---

## 故障排查

### 后端无法启动

1. 检查 PostgreSQL 是否运行
2. 检查 `server/.env` 文件中的数据库连接配置
3. 确保已运行 `npm run prisma:migrate`

### 前端无法连接后端

1. 确保后端服务已启动
2. 检查 `frontend/.env` 文件中的 `VITE_API_URL` 配置
3. 检查浏览器控制台是否有 CORS 错误

### 数据库连接失败

1. 确认 PostgreSQL 服务正在运行
2. 检查数据库名称、用户名、密码是否正确
3. 确认数据库 `noteapp` 已创建

---

## 开发流程

1. 启动后端：`cd server && npm run dev`
2. 启动前端：`cd frontend && npm run dev`
3. 开始开发！修改代码会自动热重载

---

## 生产部署

### 构建

```bash
# 构建后端
cd server
npm run build

# 构建前端
cd frontend
npm run build
```

### 运行

```bash
# 运行后端
cd server
npm start

# 前端构建产物在 frontend/dist 目录，需要配置 Web 服务器（如 Nginx）
```
