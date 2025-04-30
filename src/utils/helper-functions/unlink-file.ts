import { promises as fs } from 'fs';
import * as path from 'path';

export const unlinkFile = async function unlinkImage(
  imagePath: string,
): Promise<void> {
  if (!imagePath) return;

  const fullPath = path.join(process.cwd(), imagePath);

  try {
    await fs.unlink(fullPath);
  } catch (err) {
    console.error(
      `Failed to delete file: ${fullPath}`,
      err.message ? err.message : err,
    );
  }
};
