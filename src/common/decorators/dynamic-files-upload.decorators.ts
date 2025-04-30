import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IFileConfig } from '../interfaces';

export function DynamicFilesUploadInterceptor(
  filesConfig: Array<IFileConfig>,
): MethodDecorator & ClassDecorator {
  const storage = diskStorage({
    destination: (req, file, cb) => {
      const config = filesConfig.find((f) => f.field === file.fieldname);
      cb(null, `./public/${config.destination}`);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  });

  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(
        filesConfig.map((config) => ({ name: config.field, maxCount: 20 })),
        { storage },
      ),
    ),
  );
}
