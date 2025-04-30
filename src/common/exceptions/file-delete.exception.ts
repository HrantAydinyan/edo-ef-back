import { NotFoundException } from '@nestjs/common';

export class FileDeleteException extends NotFoundException {
  constructor() {
    super('File delete failed');
  }
}
