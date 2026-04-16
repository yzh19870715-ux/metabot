import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Backup Logic', () => {
  const backupDir = '/Users/m4/metabot/backups';
  
  it('should have backup directory', () => {
    expect(fs.existsSync(backupDir)).toBe(true);
  });

  it('should have backup scripts', () => {
    expect(fs.existsSync(path.join(backupDir, 'backup-db.sh'))).toBe(true);
    expect(fs.existsSync(path.join(backupDir, 'monitor.sh'))).toBe(true);
  });

  it('should have backup script permissions', () => {
    const script = path.join(backupDir, 'backup-db.sh');
    const stats = fs.statSync(script);
    const mode = stats.mode;
    // Check if executable (owner)
    expect(mode & 0o100).toBeGreaterThan(0);
  });
});
