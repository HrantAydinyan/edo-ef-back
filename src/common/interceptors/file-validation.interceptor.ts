import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MissingFileException } from '../exceptions';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
  constructor(private readonly fieldsToCheck: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    for (const field of this.fieldsToCheck) {
      if (!files || !files[field]?.length) {
        throw new MissingFileException(field);
      }
    }

    return next.handle();
  }
}
