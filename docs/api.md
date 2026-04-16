# Metabot API 文档

## 基础信息

- **Base URL**: `http://localhost:9100`
- **认证**: Bearer Token (通过 `API_SECRET` 环境变量配置)

## 健康检查

### GET /api/health

检查服务健康状态。

**响应**:
```json
{
  "status": "ok",
  "uptime": 5490,
  "bots": 1,
  "peerBots": 0,
  "peers": 0,
  "peersHealthy": 0,
  "scheduledTasks": 0,
  "recurringTasks": 0
}
```

## Bot 管理

### GET /api/bots

获取所有 Bot 列表。

### POST /api/bots

创建新 Bot。

**请求体**:
```json
{
  "name": "my-bot",
  "platform": "feishu",
  "feishuAppId": "...",
  "feishuAppSecret": "...",
  "defaultWorkingDirectory": "/path/to/workspace"
}
```

## 会话管理

### GET /api/sessions

获取会话列表。

### GET /api/sessions/:id

获取特定会话详情。

## 任务管理

### GET /api/tasks

获取任务列表。

### POST /api/tasks

创建新任务。

## 技能中心

### GET /api/skills

获取已安装技能列表。

### POST /api/skills/install

安装新技能。

## 文件管理

### GET /api/files

获取文件列表。

### POST /api/files/upload

上传文件。

## 团队管理

### GET /api/teams

获取团队列表。

### POST /api/teams

创建团队。

## WebSocket

### WS /ws

WebSocket 连接用于实时通信。

**用途**:
- 实时消息推送
- 任务状态更新
- 流式响应
