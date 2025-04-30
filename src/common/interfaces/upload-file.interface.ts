import { FolderPaths } from '../enums';

export interface IUploadFileParams {
  buffer: Buffer;
  mimetype: string;
  folderPath: FolderPaths;
}
