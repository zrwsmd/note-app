# 设计文档

## 概述

本笔记应用采用现代化的全栈Web架构，前端使用React + TypeScript构建响应式用户界面，后端使用Node.js + Express提供RESTful API，数据库使用PostgreSQL存储用户和笔记数据。应用支持用户注册、邮箱验证、登录认证、笔记CRUD操作以及用户数据隔离。

### 技术栈

**前端:**
- React 18 + TypeScript
- Vite（构建工具）
- TailwindCSS（样式框架）
- React Router（路由管理）
- TipTap（富文本编辑器）
- Axios（HTTP客户端）
- React Query（数据获取和缓存）

**后端:**
- Node.js + Express
- TypeScript
- PostgreSQL（数据库）
- Prisma（ORM）
- JWT（身份认证）
- Nodemailer（邮件发送）
- bcrypt（密码加密）

## 架构

### 系统架构图

```mermaid
graph TB
    Client[浏览器客户端]
    Frontend[React前端应用]
    API[Express API服务器]
    Auth[认证中间件]
    DB[(PostgreSQL数据库)]
    Email[邮件服务]
    
    Client -->|HTTPS| Frontend
    Frontend -->|REST API| API
    API --> Auth
    Auth --> DB
    API --> DB
    API --> Email
```

### 应用层次结构

1. **表现层（Presentation Layer）**: React组件、页面和UI逻辑
2. **API层（API Layer）**: Express路由和控制器
3. **业务逻辑层（Business Logic Layer）**: 服务类处理核心业务逻辑
4. **数据访问层（Data Access Layer）**: Prisma ORM与数据库交互
5. **数据库层（Database Layer）**: PostgreSQL存储持久化数据

## 组件和接口

### 前端组件结构

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx          # 登录表单
│   │   ├── RegisterForm.tsx       # 注册表单
│   │   └── EmailVerification.tsx  # 邮箱验证提示
│   ├── notes/
│   │   ├── NoteList.tsx           # 笔记列表
│   │   ├── NoteCard.tsx           # 笔记卡片
│   │   ├── NoteEditor.tsx         # 笔记编辑器
│   │   └── NoteToolbar.tsx        # 编辑器工具栏
│   ├── layout/
│   │   ├── Header.tsx             # 顶部导航栏
│   │   ├── Sidebar.tsx            # 侧边栏
│   │   └── Layout.tsx             # 主布局
│   └── common/
│       ├── Button.tsx             # 通用按钮
│       ├── Input.tsx              # 通用输入框
│       ├── Modal.tsx              # 模态对话框
│       └── SearchBar.tsx          # 搜索栏
├── pages/
│   ├── LoginPage.tsx              # 登录页面
│   ├── RegisterPage.tsx           # 注册页面
│   ├── NotesPage.tsx              # 笔记主页
│   └── NoteDetailPage.tsx         # 笔记详情页
├── hooks/
│   ├── useAuth.ts                 # 认证钩子
│   ├── useNotes.ts                # 笔记数据钩子
│   └── useAutoSave.ts             # 自动保存钩子
├── services/
│   ├── api.ts                     # API客户端配置
│   ├── authService.ts             # 认证服务
│   └── noteService.ts             # 笔记服务
├── types/
│   ├── user.ts                    # 用户类型定义
│   └── note.ts                    # 笔记类型定义
└── utils/
    ├── validation.ts              # 表单验证
    └── formatDate.ts              # 日期格式化
```

### 后端API结构

```
server/
├── src/
│   ├── controllers/
│   │   ├── authController.ts      # 认证控制器
│   │   └── noteController.ts      # 笔记控制器
│   ├── middleware/
│   │   ├── auth.ts                # JWT认证中间件
│   │   ├── errorHandler.ts        # 错误处理中间件
│   │   └── validation.ts          # 请求验证中间件
│   ├── services/
│   │   ├── authService.ts         # 认证业务逻辑
│   │   ├── emailService.ts        # 邮件发送服务
│   │   └── noteService.ts         # 笔记业务逻辑
│   ├── routes/
│   │   ├── auth.ts                # 认证路由
│   │   └── notes.ts               # 笔记路由
│   ├── prisma/
│   │   └── schema.prisma          # 数据库模型定义
│   └── utils/
│       ├── jwt.ts                 # JWT工具函数
│       └── emailTemplates.ts      # 邮件模板
└── index.ts                        # 应用入口
```

### API接口定义

#### 认证接口

```typescript
// POST /api/auth/register
Request: {
  email: string;
  password: string;
  confirmPassword: string;
}
Response: {
  message: string;
  userId: string;
}

// POST /api/auth/verify-email
Request: {
  token: string;
}
Response: {
  message: string;
}

// POST /api/auth/login
Request: {
  email: string;
  password: string;
}
Response: {
  token: string;
  user: {
    id: string;
    email: string;
  }
}

// POST /api/auth/logout
Headers: { Authorization: "Bearer <token>" }
Response: {
  message: string;
}

// GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: {
  user: {
    id: string;
    email: string;
    createdAt: string;
  }
}
```

#### 笔记接口

```typescript
// GET /api/notes
Headers: { Authorization: "Bearer <token>" }
Query: { search?: string }
Response: {
  notes: Array<{
    id: string;
    title: string;
    content: string;
    preview: string;
    createdAt: string;
    updatedAt: string;
  }>
}

// GET /api/notes/:id
Headers: { Authorization: "Bearer <token>" }
Response: {
  note: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}

// POST /api/notes
Headers: { Authorization: "Bearer <token>" }
Request: {
  title: string;
  content: string;
}
Response: {
  note: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}

// PUT /api/notes/:id
Headers: { Authorization: "Bearer <token>" }
Request: {
  title?: string;
  content?: string;
}
Response: {
  note: {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

// DELETE /api/notes/:id
Headers: { Authorization: "Bearer <token>" }
Response: {
  message: string;
}
```

## 数据模型

### 数据库Schema（Prisma）

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  isVerified    Boolean   @default(false)
  verificationToken String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  notes         Note[]
}

model Note {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([userId])
  @@index([updatedAt])
}
```

### 数据关系

- 一个用户（User）可以拥有多个笔记（Note）：一对多关系
- 笔记通过`userId`外键关联到用户
- 当用户被删除时，其所有笔记也会被级联删除（`onDelete: Cascade`）

## 核心功能设计

### 1. 用户认证流程

#### 注册流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant A as API
    participant D as 数据库
    participant E as 邮件服务
    
    U->>F: 填写注册表单
    F->>F: 客户端验证
    F->>A: POST /api/auth/register
    A->>A: 验证邮箱格式
    A->>A: 检查邮箱是否已注册
    A->>A: 加密密码
    A->>A: 生成验证token
    A->>D: 创建用户记录
    A->>E: 发送验证邮件
    A->>F: 返回成功消息
    F->>U: 显示"请查收验证邮件"
    U->>E: 点击邮件中的链接
    E->>A: GET /api/auth/verify-email?token=xxx
    A->>D: 更新用户验证状态
    A->>F: 重定向到登录页
    F->>U: 显示"验证成功，请登录"
```

#### 登录流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant A as API
    participant D as 数据库
    
    U->>F: 输入邮箱和密码
    F->>A: POST /api/auth/login
    A->>D: 查询用户
    A->>A: 验证密码
    A->>A: 检查邮箱是否已验证
    A->>A: 生成JWT token
    A->>F: 返回token和用户信息
    F->>F: 存储token到localStorage
    F->>U: 重定向到笔记主页
```

### 2. 笔记编辑器设计

#### TipTap编辑器配置

使用TipTap作为富文本编辑器，支持以下扩展：

- **基础格式**: Bold, Italic, Underline, Strike
- **标题**: Heading (H1-H6)
- **列表**: BulletList, OrderedList
- **代码**: Code, CodeBlock
- **引用**: Blockquote
- **链接**: Link
- **图片**: Image
- **历史记录**: History (撤销/重做)

#### 自动保存机制

```typescript
// 使用防抖实现自动保存
const useAutoSave = (noteId: string, content: string) => {
  const debouncedSave = useMemo(
    () => debounce((id: string, data: string) => {
      noteService.updateNote(id, { content: data });
    }, 30000), // 30秒
    []
  );
  
  useEffect(() => {
    if (noteId && content) {
      debouncedSave(noteId, content);
    }
  }, [content, noteId, debouncedSave]);
};
```

### 3. UI/UX设计原则

#### 配色方案

- **主色调**: 蓝色系（#3B82F6）- 专业、可信赖
- **辅助色**: 灰色系（#6B7280）- 文本和边框
- **背景色**: 浅灰色（#F9FAFB）- 柔和、不刺眼
- **强调色**: 绿色（#10B981）- 成功状态
- **警告色**: 红色（#EF4444）- 错误和删除操作

#### 响应式设计断点

- **移动设备**: < 640px
- **平板设备**: 640px - 1024px
- **桌面设备**: > 1024px

#### 动画效果

- 页面切换: 淡入淡出（200ms）
- 按钮悬停: 颜色过渡（150ms）
- 模态框: 缩放动画（300ms）
- 列表项: 滑入动画（200ms）

### 4. 搜索功能设计

```typescript
// 后端搜索实现（使用PostgreSQL全文搜索）
const searchNotes = async (userId: string, query: string) => {
  return await prisma.note.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } }
      ]
    },
    orderBy: { updatedAt: 'desc' }
  });
};
```

## 错误处理

### 错误类型定义

```typescript
enum ErrorCode {
  // 认证错误
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  
  // 笔记错误
  NOTE_NOT_FOUND = 'NOTE_NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  
  // 验证错误
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  
  // 服务器错误
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  EMAIL_SEND_FAILED = 'EMAIL_SEND_FAILED'
}
```

### 错误处理中间件

```typescript
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: ErrorCode.VALIDATION_ERROR,
      message: err.message,
      details: err.details
    });
  }
  
  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      error: err.code,
      message: err.message
    });
  }
  
  // 默认服务器错误
  console.error(err);
  return res.status(500).json({
    error: ErrorCode.INTERNAL_SERVER_ERROR,
    message: '服务器内部错误'
  });
};
```

### 前端错误处理

```typescript
// 使用React Query的错误处理
const { data, error, isError } = useQuery({
  queryKey: ['notes'],
  queryFn: noteService.getNotes,
  onError: (error: ApiError) => {
    if (error.code === ErrorCode.UNAUTHORIZED) {
      // 清除token并重定向到登录页
      authService.logout();
      navigate('/login');
    } else {
      // 显示错误提示
      toast.error(error.message);
    }
  }
});
```

## 安全设计

### 1. 密码安全

- 使用bcrypt加密密码，salt rounds设置为10
- 密码最小长度8位，必须包含字母和数字
- 不在任何日志或响应中暴露密码

### 2. JWT认证

- Token有效期: 7天
- Token存储在localStorage（前端）
- 每个需要认证的请求都在Header中携带token
- 后端验证token的有效性和完整性

### 3. 数据访问控制

- 所有笔记API都需要认证
- 用户只能访问自己的笔记
- 在数据库查询中始终添加userId过滤条件

### 4. 输入验证

- 前端和后端都进行输入验证
- 防止SQL注入（使用Prisma参数化查询）
- 防止XSS攻击（对用户输入进行转义）
- 邮箱格式验证使用正则表达式

### 5. CORS配置

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

## 测试策略

### 1. 单元测试

**前端（使用Vitest + React Testing Library）:**
- 组件渲染测试
- 用户交互测试
- 自定义Hook测试
- 工具函数测试

**后端（使用Jest）:**
- 服务层业务逻辑测试
- 工具函数测试
- 中间件测试

### 2. 集成测试

**API集成测试（使用Supertest）:**
- 认证流程测试
- 笔记CRUD操作测试
- 权限控制测试
- 错误处理测试

### 3. E2E测试

**使用Playwright:**
- 用户注册和登录流程
- 创建、编辑、删除笔记
- 搜索功能
- 响应式布局测试

### 测试覆盖率目标

- 单元测试: > 80%
- 集成测试: 覆盖所有API端点
- E2E测试: 覆盖核心用户流程

## 部署架构

### 开发环境

- 前端: Vite开发服务器（localhost:5174）
- 后端: Node.js服务器（localhost:8080）
- 数据库: 本地PostgreSQL实例

### 生产环境建议

- **前端**: Vercel或Netlify（静态托管）
- **后端**: Railway、Render或AWS EC2
- **数据库**: Railway PostgreSQL、Supabase或AWS RDS
- **邮件服务**: SendGrid、Mailgun或AWS SES

### 环境变量

```env
# 后端
DATABASE_URL=postgresql://user:password@localhost:5432/noteapp
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:5173

# 前端
VITE_API_URL=http://localhost:8080/api
```

## 性能优化

### 前端优化

1. **代码分割**: 使用React.lazy()和Suspense进行路由级别的代码分割
2. **图片优化**: 使用WebP格式，实现懒加载
3. **缓存策略**: 使用React Query缓存API响应
4. **虚拟滚动**: 笔记列表较长时使用虚拟滚动

### 后端优化

1. **数据库索引**: 在userId和updatedAt字段上创建索引
2. **查询优化**: 使用Prisma的select限制返回字段
3. **分页**: 笔记列表实现分页（每页20条）
4. **连接池**: 配置PostgreSQL连接池

### 监控和日志

- 使用Winston记录后端日志
- 使用Sentry监控前端错误
- 记录API响应时间和错误率
