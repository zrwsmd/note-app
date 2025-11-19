# Zeabur 本地部署指南（无需 GitHub）

本文档介绍如何直接从本地部署项目到 Zeabur，无需上传到 GitHub。

---

## 前置条件

1. 有 Zeabur 账户（https://zeabur.com）
2. 已安装 Zeabur CLI
3. 项目已在本地完成开发

---

## 安装 Zeabur CLI

### macOS / Linux

```bash
curl -fsSL https://get.zeabur.sh | bash
```

### Windows (PowerShell)

```powershell
irm https://get.zeabur.sh | iex
```

### 验证安装

```bash
zeabur --version
```

---

## 部署步骤

### 第一步：登录 Zeabur

```bash
zeabur auth login
```

浏览器会打开 Zeabur 登录页面，完成登录后返回终端。

---

### 第二步：创建项目

```bash
zeabur project create
```

按照提示输入项目名称，例如：`note-app`

---

### 第三步：部署后端服务

#### 3.1 进入后端目录

```bash
cd server
```

#### 3.2 部署后端

```bash
zeabur deploy
```

按照提示选择：
- 项目：选择刚创建的 `note-app`
- 服务名称：输入 `backend` 或 `api`
- 选择运行时：选择 `Node.js`

#### 3.3 配置环境变量

部署完成后，在 Zeabur 控制面板中配置环境变量：

1. 登录 Zeabur (https://zeabur.com)
2. 进入你的项目
3. 选择后端服务
4. 找到 "Environment Variables" 或 "环境变量"
5. 添加以下变量：

```
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
PORT=8080
NODE_ENV=production
```

#### 3.4 添加 PostgreSQL 数据库

1. 在项目中点击 "Add Service"
2. 选择 "PostgreSQL"
3. Zeabur 会自动创建数据库
4. 复制生成的 `DATABASE_URL` 到后端服务的环境变量中

#### 3.5 运行数据库迁移

在后端服务的控制面板中：

1. 找到 "Logs" 或 "Terminal" 选项
2. 运行以下命令：

```bash
npm run prisma:migrate
npm run prisma:generate
```

或者在本地运行（需要配置远程数据库）：

```bash
# 在本地 server 目录中
DATABASE_URL="postgresql://user:password@host:port/database" npm run prisma:migrate
```

---

### 第四步：部署前端应用

#### 4.1 返回项目根目录

```bash
cd ../frontend
```

#### 4.2 部署前端

```bash
zeabur deploy
```

按照提示选择：
- 项目：选择 `note-app`
- 服务名称：输入 `frontend` 或 `web`
- 选择运行时：选择 `Node.js` 或 `Static`

#### 4.3 配置前端环境变量

1. 在 Zeabur 控制面板中选择前端服务
2. 找到 "Environment Variables"
3. 添加以下变量：

```
VITE_API_URL=https://your-backend-domain.zeabur.app
```

其中 `your-backend-domain` 是你后端服务的域名（可在后端服务详情中查看）

#### 4.4 重新部署前端

修改环境变量后，需要重新部署前端以应用新的配置：

```bash
zeabur deploy
```

---

## 获取服务域名

### 查看后端域名

```bash
zeabur service info backend
```

或在 Zeabur 控制面板中：
1. 进入项目
2. 选择后端服务
3. 在 "Domain" 或 "Domains" 中查看

### 查看前端域名

```bash
zeabur service info frontend
```

或在 Zeabur 控制面板中查看前端服务的域名。

---

## 部署后的验证

### 1. 检查后端服务

访问后端服务：
```
https://your-backend-domain.zeabur.app
```

应该返回 404 或其他响应（表示服务正在运行）。

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

## 常用 CLI 命令

### 查看项目列表

```bash
zeabur project list
```

### 查看服务列表

```bash
zeabur service list
```

### 查看服务信息

```bash
zeabur service info <service-name>
```

### 查看服务日志

```bash
zeabur service logs <service-name>
```

### 删除服务

```bash
zeabur service delete <service-name>
```

### 重新部署服务

```bash
zeabur deploy
```

---

## 更新部署

### 更新后端

1. 在本地修改后端代码
2. 进入 `server` 目录
3. 运行部署命令：

```bash
cd server
zeabur deploy
```

### 更新前端

1. 在本地修改前端代码
2. 进入 `frontend` 目录
3. 运行部署命令：

```bash
cd frontend
zeabur deploy
```

---

## 配置自定义域名

### 为后端配置域名

1. 在 Zeabur 控制面板中选择后端服务
2. 找到 "Domain" 或 "Custom Domain"
3. 点击 "Add Domain"
4. 输入你的域名（如 `api.example.com`）
5. 按照 Zeabur 的指示配置 DNS 记录

### 为前端配置域名

1. 在 Zeabur 控制面板中选择前端服务
2. 找到 "Domain" 或 "Custom Domain"
3. 点击 "Add Domain"
4. 输入你的域名（如 `example.com`）
5. 按照 Zeabur 的指示配置 DNS 记录

### 更新前端 API 地址

如果使用了自定义域名，需要更新前端的 `VITE_API_URL`：

1. 在前端服务的环境变量中修改 `VITE_API_URL`
2. 重新部署前端

```bash
cd frontend
zeabur deploy
```

---

## 常见问题

### Q: 部署时出现权限错误

**A:** 
1. 确保已登录：`zeabur auth login`
2. 检查是否有项目创建权限
3. 尝试重新登录

### Q: 前端无法连接后端

**A:**
1. 检查 `VITE_API_URL` 环境变量是否正确
2. 确保后端服务已成功部署
3. 检查后端服务是否在运行
4. 在浏览器开发者工具中查看网络请求错误

### Q: 数据库迁移失败

**A:**
1. 确保 PostgreSQL 服务已创建
2. 确保 `DATABASE_URL` 环境变量已正确设置
3. 检查数据库连接是否正常
4. 查看 Zeabur 的日志获取更多错误信息

### Q: 部署后无法登录

**A:**
1. 检查数据库是否已正确迁移
2. 确保 JWT_SECRET 已设置
3. 检查后端日志中的错误信息
4. 尝试创建新账户

### Q: 如何查看部署日志

**A:**
```bash
# 查看后端日志
zeabur service logs backend

# 查看前端日志
zeabur service logs frontend
```

或在 Zeabur 控制面板中选择服务，找到 "Logs" 选项。

---

## 性能优化建议

1. **启用 CDN**：在 Zeabur 中为前端启用 CDN 加速
2. **数据库备份**：定期备份 PostgreSQL 数据库
3. **监控日志**：定期检查应用日志，及时发现问题
4. **环境变量管理**：使用 Zeabur 的密钥管理功能存储敏感信息

---

## 回滚部署

如果部署出现问题，可以在 Zeabur 控制面板中：

1. 找到服务的部署历史
2. 选择之前的稳定版本
3. 点击 "Rollback" 回滚到该版本

---

## 获取帮助

- Zeabur 文档：https://docs.zeabur.com
- Zeabur CLI 文档：https://docs.zeabur.com/cli
- Zeabur 社区：https://discord.gg/zeabur

---

## 部署检查清单

- [ ] Zeabur CLI 已安装
- [ ] 已登录 Zeabur 账户
- [ ] 项目已创建
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

---

## 快速参考

```bash
# 登录
zeabur auth login

# 创建项目
zeabur project create

# 部署后端
cd server
zeabur deploy

# 部署前端
cd ../frontend
zeabur deploy

# 查看日志
zeabur service logs <service-name>

# 查看服务信息
zeabur service info <service-name>
```
