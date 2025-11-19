# Zeabur 部署指南

本文档介绍如何将笔记应用部署到 Zeabur 平台。

## 前置条件

1. 有 Zeabur 账户（https://zeabur.com）
2. GitHub 账户（用于连接代码仓库）
3. 项目已推送到 GitHub

---

## 部署步骤

### 第一步：准备 GitHub 仓库

1. 将项目推送到 GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/note-app.git
   git push -u origin main
   ```

2. 确保项目结构正确：
   ```
   note-app/
   ├── server/          # 后端项目
   ├── frontend/        # 前端项目
   ├── START.md
   └── DEPLOY_ZEABUR.md
   ```

---

### 第二步：在 Zeabur 创建项目

1. 登录 Zeabur (https://zeabur.com)
2. 点击 "New Project"
3. 选择 "Deploy from GitHub"
4. 授权 GitHub 账户
5. 选择你的 `note-app` 仓库
6. 点击 "Deploy"

---

### 第三步：部署后端服务

#### 3.1 添加后端服务

1. 在 Zeabur 项目中，点击 "Add Service"
2. 选择 "GitHub"
3. 选择你的仓库
4. 在 "Root Directory" 中填入：`server`
5. 点击 "Deploy"

#### 3.2 配置后端环境变量

1. 在后端服务的设置中，找到 "Environment Variables"
2. 添加以下环境变量：

   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d
   PORT=8080
   NODE_ENV=production
   ```

3. 数据库连接字符串会在添加 PostgreSQL 后自动生成

#### 3.3 添加 PostgreSQL 数据库

1. 在 Zeabur 项目中，点击 "Add Service"
2. 选择 "PostgreSQL"
3. Zeabur 会自动创建数据库并生成连接字符串
4. 复制生成的 `DATABASE_URL` 环境变量到后端服务

#### 3.4 运行数据库迁移

1. 在后端服务中，找到 "Logs" 或 "Terminal"
2. 运行以下命令：
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

   或者在本地运行（需要配置远程数据库连接）：
   ```bash
   DATABASE_URL="postgresql://..." npm run prisma:migrate
   ```

---

### 第四步：部署前端应用

#### 4.1 添加前端服务

1. 在 Zeabur 项目中，点击 "Add Service"
2. 选择 "GitHub"
3. 选择你的仓库
4. 在 "Root Directory" 中填入：`frontend`
5. 点击 "Deploy"

#### 4.2 配置前端环境变量

1. 在前端服务的设置中，找到 "Environment Variables"
2. 添加以下环境变量：

   ```
   VITE_API_URL=https://your-backend-domain.zeabur.app
   ```

   其中 `your-backend-domain` 是你后端服务在 Zeabur 上的域名

#### 4.3 配置构建命令

确保前端服务的构建配置正确：

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Start Command**: 不需要（Zeabur 会自动配置静态文件服务）

---

### 第五步：配置域名（可选）

#### 5.1 为后端配置域名

1. 在后端服务中，找到 "Domain" 或 "Custom Domain"
2. 点击 "Add Domain"
3. 输入你的域名（如 `api.example.com`）
4. 按照 Zeabur 的指示配置 DNS 记录

#### 5.2 为前端配置域名

1. 在前端服务中，找到 "Domain" 或 "Custom Domain"
2. 点击 "Add Domain"
3. 输入你的域名（如 `example.com`）
4. 按照 Zeabur 的指示配置 DNS 记录

#### 5.3 更新前端环境变量

如果使用了自定义域名，更新前端的 `VITE_API_URL`：

```
VITE_API_URL=https://api.example.com
```

---

## 部署后的验证

### 1. 检查后端服务

访问后端健康检查端点：
```
https://your-backend-domain.zeabur.app/health
```

或者尝试登录：
```
POST https://your-backend-domain.zeabur.app/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. 检查前端应用

在浏览器中访问前端应用：
```
https://your-frontend-domain.zeabur.app
```

应该能看到登录页面。

### 3. 测试完整流程

1. 注册新账户
2. 登录
3. 创建笔记
4. 编辑笔记
5. 删除笔记
6. 批量删除笔记

---

## 常见问题

### Q: 前端无法连接后端

**A:** 检查以下几点：
1. 确保后端服务已成功部署
2. 检查前端环境变量 `VITE_API_URL` 是否正确
3. 检查后端是否启用了 CORS（应该已启用）
4. 在浏览器开发者工具中查看网络请求错误

### Q: 数据库迁移失败

**A:** 
1. 确保 PostgreSQL 服务已创建
2. 确保 `DATABASE_URL` 环境变量已正确设置
3. 尝试在本地运行迁移测试
4. 检查 Zeabur 的日志获取更多错误信息

### Q: 部署后无法登录

**A:**
1. 检查数据库是否已正确迁移
2. 确保 JWT_SECRET 已设置
3. 检查后端日志中的错误信息
4. 尝试创建新账户

### Q: 笔记数据丢失

**A:**
1. 检查数据库连接是否正确
2. 确保 PostgreSQL 服务未被删除
3. 检查数据库备份设置

---

## 更新部署

### 更新后端

1. 在本地修改代码
2. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```
3. Zeabur 会自动检测更改并重新部署

### 更新前端

同样的流程，Zeabur 会自动重新构建和部署。

---

## 性能优化建议

1. **启用 CDN**：在 Zeabur 中为前端启用 CDN 加速
2. **数据库备份**：定期备份 PostgreSQL 数据库
3. **监控日志**：定期检查应用日志，及时发现问题
4. **环境变量管理**：使用 Zeabur 的密钥管理功能存储敏感信息

---

## 回滚部署

如果部署出现问题，可以在 Zeabur 中：

1. 找到服务的部署历史
2. 选择之前的稳定版本
3. 点击 "Rollback" 回滚到该版本

---

## 获取帮助

- Zeabur 文档：https://docs.zeabur.com
- 项目 GitHub Issues：提交问题和反馈
- Zeabur 社区：https://discord.gg/zeabur

---

## 部署检查清单

- [ ] GitHub 仓库已创建并推送代码
- [ ] Zeabur 项目已创建
- [ ] 后端服务已部署
- [ ] PostgreSQL 数据库已添加
- [ ] 数据库迁移已运行
- [ ] 后端环境变量已配置
- [ ] 前端服务已部署
- [ ] 前端环境变量已配置（VITE_API_URL）
- [ ] 前端可以访问
- [ ] 后端可以访问
- [ ] 登录功能正常
- [ ] 笔记 CRUD 功能正常
- [ ] 批量删除功能正常
- [ ] 自定义域名已配置（可选）
