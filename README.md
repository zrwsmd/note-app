# 笔记应用

一个类似印象笔记的在线笔记应用，支持富文本编辑、用户认证和笔记管理。

## 功能特性

- ✅ 用户注册和邮箱验证
- ✅ 用户登录/登出
- ✅ 富文本笔记编辑器（支持标题、粗体、列表、代码等格式）
- ✅ 笔记自动保存
- ✅ 笔记搜索
- ✅ 用户数据隔离
- ✅ 精美的响应式UI

## 技术栈

### 前端
- React 18 + TypeScript
- Vite
- TailwindCSS
- TipTap (富文本编辑器)
- React Query
- React Router

### 后端
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT 认证
- Nodemailer

## 快速开始

### 前置要求

- Node.js 18+
- PostgreSQL 14+
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd note-app
```

2. 安装前端依赖
```bash
cd frontend
npm install
```

3. 安装后端依赖
```bash
cd ../server
npm install
```

4. 配置环境变量

复制 `.env.example` 为 `.env` 并填写配置：

**后端 (server/.env):**
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/noteapp
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5174
PORT=3010
```

**前端 (frontend/.env):**
```env
VITE_API_URL=http://localhost:3010/api
```

5. 初始化数据库
```bash
cd server
npm run prisma:migrate
npm run prisma:generate
```

6. 启动开发服务器

**后端:**
```bash
cd server
npm run dev
```

**前端 (新终端):**
```bash
cd frontend
npm run dev
```

7. 访问应用

打开浏览器访问 http://localhost:5173

## 项目结构

```
.
├── frontend/              # React 前端应用
│   ├── src/
│   │   ├── components/   # React 组件
│   │   ├── pages/        # 页面组件
│   │   ├── hooks/        # 自定义 Hooks
│   │   ├── services/     # API 服务
│   │   ├── types/        # TypeScript 类型
│   │   └── utils/        # 工具函数
│   └── package.json
│
└── server/               # Express 后端应用
    ├── src/
    │   ├── controllers/  # 控制器
    │   ├── middleware/   # 中间件
    │   ├── services/     # 业务逻辑
    │   ├── routes/       # 路由
    │   ├── prisma/       # 数据库模型
    │   └── utils/        # 工具函数
    └── package.json
```

## 开发指南

### 数据库迁移

创建新的迁移：
```bash
cd server
npm run prisma:migrate
```

查看数据库：
```bash
npm run prisma:studio
```

### 构建生产版本

**前端:**
```bash
cd frontend
npm run build
```

**后端:**
```bash
cd server
npm run build
```

## License

MIT
