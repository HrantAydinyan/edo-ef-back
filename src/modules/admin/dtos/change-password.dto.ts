import { UnprocessableEntityException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { validateOrReject } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmPassword: string;

  constructor(data: Partial<ChangePasswordDto>) {
    Object.assign(this, data);
  }

  async validate(): Promise<void> {
    if (this.newPassword !== this.confirmPassword) {
      throw new UnprocessableEntityException(
        'New password and confirm password must match',
      );
    }
    await validateOrReject(this);
  }
}
