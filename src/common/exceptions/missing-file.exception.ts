import { BadRequestException } from '@nestjs/common';

export class MissingFileException extends BadRequestException {
  constructor(field: string) {
    super(`File upload for field "${field}" is required.`);
  }
}
