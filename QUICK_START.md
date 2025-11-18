# 快速启动指南

## 当前状态

✅ **前端已启动**: http://localhost:5173/
❌ **后端需要数据库配置**

## 数据库设置步骤

### 1. 安装 PostgreSQL

**Windows:**
- 下载: https://www.postgresql.org/download/windows/
- 安装时记住设置的密码（默认用户名是 postgres）

**或者使用 Docker (推荐):**
```bash
docker run --name noteapp-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=noteapp -p 5432:5432 -d postgres:14
```

### 2. 创建数据库（如果不使用Docker）

```bash
# 连接到 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE noteapp;

# 退出
\q
```

### 3. 配置环境变量

编辑 `server/.env` 文件，更新数据库连接字符串：

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/noteapp"
```

将 `password` 替换为你的 PostgreSQL 密码。

### 4. 推送数据库模型

```bash
cd server
npx prisma db push
```

### 5. 重启后端服务器

后端会自动重启（tsx watch），或者手动重启。

## 访问应用

1. 打开浏览器访问: http://localhost:5173/
2. 注册一个新账户
3. 开始使用笔记应用！

## 注意事项

### 邮箱验证

如果要测试邮箱验证功能，需要配置 `server/.env` 中的邮件设置：

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**临时解决方案**: 可以暂时跳过邮箱验证，直接在数据库中将用户的 `isVerified` 设置为 `true`：

```bash
npx prisma studio
```

然后在 Prisma Studio 中编辑用户记录。

## 故障排除

### 端口被占用

如果端口 3010 或 5174 被占用：

**前端**: 修改 `frontend/vite.config.ts` 中的 `server.port`
**后端**: 修改 `server/.env` 中的 `PORT`

### 数据库连接失败

1. 确认 PostgreSQL 正在运行
2. 检查 `server/.env` 中的 `DATABASE_URL` 是否正确
3. 确认数据库 `noteapp` 已创建

## 已实现的功能

✅ 用户注册和登录
✅ 邮箱验证（需配置邮件服务）
✅ 笔记创建、编辑、删除
✅ 富文本编辑器（支持标题、粗体、列表、代码等）
✅ 笔记搜索
✅ 自动保存（30秒）
✅ 用户数据隔离
✅ 响应式UI设计

## 下一步

配置好数据库后，你就可以：
1. 注册账户
2. 创建笔记
3. 使用富文本编辑器
4. 搜索笔记
5. 体验自动保存功能
