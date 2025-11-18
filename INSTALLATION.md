# 安装指南

## 当前状态

项目结构已创建完成，现在需要安装依赖包。

## 安装步骤

### 1. 安装前端依赖

```bash
cd frontend
npm install
```

这将安装以下包：
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- TipTap (富文本编辑器)
- React Query
- Axios
- React Hot Toast

### 2. 安装后端依赖

```bash
cd ../server
npm install
```

这将安装以下包：
- Express
- TypeScript
- Prisma
- PostgreSQL Client
- JWT
- bcrypt
- Nodemailer
- CORS
- dotenv

### 3. 设置数据库

#### 安装 PostgreSQL

**Windows:**
- 下载: https://www.postgresql.org/download/windows/
- 运行安装程序

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### 创建数据库

```bash
# 连接到 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE noteapp;

# 退出
\q
```

### 4. 配置环境变量

确保 `server/.env` 文件中的数据库连接字符串正确：

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/noteapp"
```

### 5. 初始化数据库

```bash
cd server

# 生成 Prisma Client
npx prisma generate

# 推送数据库模型（开发环境）
npx prisma db push

# 或者创建迁移（生产环境推荐）
npx prisma migrate dev --name init
```

### 6. 启动开发服务器

**启动后端（终端1）:**
```bash
cd server
npm run dev
```

服务器将运行在 http://localhost:3010

**启动前端（终端2）:**
```bash
cd frontend
npm run dev
```

前端将运行在 http://localhost:5173

### 7. 验证安装

1. 访问 http://localhost:3010/health 应该看到：
```json
{
  "status": "ok",
  "message": "Server is running",
  "database": "connected"
}
```

2. 访问 http://localhost:5173 应该看到前端应用

## 常见问题

### 端口被占用

如果端口 3010 或 5174 被占用，可以修改：

**后端:** 修改 `server/.env` 中的 `PORT`
**前端:** 修改 `frontend/vite.config.ts` 中的 `server.port`

### 数据库连接失败

1. 确认 PostgreSQL 正在运行
2. 检查 `server/.env` 中的 `DATABASE_URL` 是否正确
3. 确认数据库 `noteapp` 已创建

### TypeScript 错误

在安装依赖之前看到 TypeScript 错误是正常的。运行 `npm install` 后错误会消失。

## 下一步

安装完成后，你可以：
1. 继续实现后端认证系统（任务3）
2. 使用 Prisma Studio 查看数据库：`npx prisma studio`
3. 查看 API 文档了解接口定义
