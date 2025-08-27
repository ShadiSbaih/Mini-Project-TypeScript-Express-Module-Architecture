import path from 'node:path';
import { promises as fs } from 'fs';

export const deleteUploadedAsset = async (fileName: string): Promise<void> => {
  const filePath = path.join(__dirname, '../../uploads', fileName);
  try {
    await fs.unlink(filePath);
    console.log(`File deleted successfully: ${fileName}`);
  } catch (error) {
    console.error(`Error deleting file ${fileName}:`, error);
    // Don't throw error, just log it since file might not exist
  }
};

export const ensureUploadsDirectory = async (): Promise<void> => {
  const uploadsPath = path.join(__dirname, '../../uploads');
  try {
    await fs.access(uploadsPath);
  } catch {
    // Directory doesn't exist, create it
    await fs.mkdir(uploadsPath, { recursive: true });
    console.log('📁 Uploads directory created');
  }
};
