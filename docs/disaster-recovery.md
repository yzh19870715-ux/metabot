# Metabot 容灾恢复计划

## 数据备份清单

### 必须备份的数据
1. **数据库文件**
   - `data/metamemory.db` - 记忆数据
   - `data/skill-hub.db` - 技能中心数据
   - `data/sync-mapping.db` - 同步映射

2. **配置文件**
   - `.env` - 环境变量（含敏感信息）

3. **GitHub 仓库**
   - 代码仓库: yzh19870715-ux/metabot

### 自动备份
- 数据库每日 6:00 AM 自动备份 → `backups/`
- GitHub 实时推送备份

---

## 恢复流程

### 1. 服务崩溃恢复

```bash
# 1. 检查进程状态
pgrep -f "tsx src/index"

# 2. 如果进程不存在，重启服务
cd /Users/m4/metabot && npm start

# 3. 检查日志确认恢复
tail -f logs/metabot.log
```

### 2. 数据库损坏恢复

```bash
# 1. 停止服务
pkill -f "tsx src/index"

# 2. 找到最近的备份
ls -lt backups/*.db | head -3

# 3. 恢复数据库
cp backups/YYYYMMDD_HHMMSS_metamemory.db data/metamemory.db

# 4. 重启服务
npm start
```

### 3. 完全重建

```bash
# 1. 克隆仓库
git clone https://github.com/yzh19870715-ux/metabot.git

# 2. 安装依赖
npm install

# 3. 恢复配置
cp backups/.env .env

# 4. 恢复数据库
cp backups/*.db data/

# 5. 启动服务
npm start
```

---

## 故障场景

| 场景 | 影响 | 恢复时间 | 方案 |
|------|------|----------|------|
| 服务崩溃 | 新用户无法访问 | 1-5分钟 | 重启服务 |
| 数据库损坏 | 记忆丢失 | 5-15分钟 | 恢复备份 |
| 服务器故障 | 完全不可用 | 1-4小时 | 迁移到新服务器 |
| 数据泄露 | 安全风险 | 立即 | 更换密钥 + 通知用户 |

---

## 监控告警阈值

- API 无响应: 立即告警
- 磁盘 > 90%: 立即告警
- 内存空闲 < 10000页: 警告
- 进程消失: 立即告警
