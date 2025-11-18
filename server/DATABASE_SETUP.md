# 数据库设置指南

## PostgreSQL 安装

### Windows
1. 下载 PostgreSQL: https://www.postgresql.org/download/windows/
2. 运行安装程序并按照提示操作
3. 记住设置的密码（默认用户名是 postgres）

### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 创建数据库

1. 连接到 PostgreSQL:
```bash
psql -U postgres
```

2. 创建数据库:
```sql
CREATE DATABASE noteapp;
```

3. 退出 psql:
```sql
\q
```

## 配置环境变量

在 `server/.env` 文件中设置数据库连接字符串：

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/noteapp"
```

替换 `your_password` 为你的 PostgreSQL 密码。

## 运行数据库迁移

在 server 目录下运行：

```bash
# 生成 Prisma Client
npm run prisma:generate

# 创建并应用迁移
npm run prisma:migrate

# 或者使用 Prisma 的推送命令（开发环境）
npx prisma db push
```

## 查看数据库

使用 Prisma Studio 可视化查看数据库：

```bash
npm run prisma:studio
```

这将在浏览器中打开 http://localhost:5555

## 常用 Prisma 命令

```bash
# 生成 Prisma Client
npx prisma generate

# 创建迁移
npx prisma migrate dev --name init

# 应用迁移
npx prisma migrate deploy

# 重置数据库（警告：会删除所有数据）
npx prisma migrate reset

# 格式化 schema 文件
npx prisma format

# 查看数据库
npx prisma studio
```

## 数据库模型说明

### User 表
- `id`: UUID 主键
- `email`: 唯一邮箱地址
- `password`: 加密后的密码
- `isVerified`: 邮箱是否已验证
- `verificationToken`: 邮箱验证令牌
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Note 表
- `id`: UUID 主键
- `title`: 笔记标题
- `content`: 笔记内容（文本类型）
- `userId`: 用户ID（外键）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### 关系
- User 和 Note 是一对多关系
- 删除用户时会级联删除其所有笔记
- userId 和 updatedAt 字段有索引以提高查询性能
