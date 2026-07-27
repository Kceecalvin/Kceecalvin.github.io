import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function ensureDataDir() {
  await mkdir(path.join(process.cwd(), 'data'), { recursive: true });
}

export async function readJsonArray<T>(relativePath: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(process.cwd(), 'data', relativePath);

  try {
    const content = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function appendJsonRecord<T extends Record<string, unknown>>(
  relativePath: string,
  record: T,
) {
  const current = await readJsonArray<T>(relativePath);
  current.push(record);
  const filePath = path.join(process.cwd(), 'data', relativePath);
  await writeFile(filePath, JSON.stringify(current, null, 2), 'utf8');
}
