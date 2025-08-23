// src/common/hash.util.ts
import { createHash } from 'crypto';

export function generateHash(obj: any): string {
  // We stringify a deterministic subset to avoid transient fields like timestamps if you prefer
  return createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}
