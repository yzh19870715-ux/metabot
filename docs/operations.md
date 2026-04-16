# Metabot 运维指南

## 日常维护

### 定时任务
- **数据库备份**: 每天 6:00 AM 自动执行
- **日志轮转**: 每天 6:00 AM 自动执行（日志超过100MB时自动压缩）
- **系统监控**: 每小时执行一次

### 手动操作

#### 备份数据库
```bash
/Users/m4/metabot/backups/backup-db.sh
```

#### 查看日志
```bash
tail -f /Users/m4/metabot/logs/metabot.log
```

#### 监控状态
```bash
/Users/m4/metabot/backups/monitor.sh
tail /Users/m4/metabot/logs/monitor.log
```

#### 日志轮转（手动）
```bash
/Users/m4/metabot/logs/rotate.sh
```

## 目录结构

```
metabot/
├── backups/
│   ├── backup-db.sh      # 数据库备份
│   ├── daily-maintenance.sh  # 每日维护
│   └── monitor.sh        # 监控脚本
├── logs/
│   ├── metabot.log       # 主日志
│   ├── metabot.error.log # 错误日志
│   └── monitor.log       # 监控日志
└── data/
    ├── metamemory.db     # 记忆数据库
    ├── skill-hub.db      # 技能中心数据库
    └── sync-mapping.db   # 同步映射数据库
```

## 故障排查

### API 无响应
```bash
# 检查进程
pgrep -f "tsx src/index"

# 重启服务
cd /Users/m4/metabot && npm start
```

### 磁盘空间不足
```bash
# 清理旧日志
find /Users/m4/metabot/logs -name "*.gz" -mtime +7 -delete

# 清理旧备份
find /Users/m4/metabot/backups -name "*.db" -mtime +30 -delete
```

### 内存不足
```bash
# 查看内存使用
vm_stat

# 清理内存缓存 (需要sudo)
sudo purge
```
