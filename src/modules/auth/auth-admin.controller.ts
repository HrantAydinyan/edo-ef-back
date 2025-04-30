import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { LoginDto } from './dtos';
import { IAdminData, ILoginResponse } from './interfaces';
import { AdminUnauthorizedException } from './exceptions';
import { AdminGuard } from './guards';
import { AdminData } from 'src/common/decorators';
import { ChangePasswordDto } from '../admin/dtos';
import { Admin } from '../admin/admin.entity';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    const admin = await this.authService.validateAdmin(
      loginDto.email,
      loginDto.password,
    );

    if (!admin) {
      throw new AdminUnauthorizedException();
    }

    const payload = {
      name: admin.name,
      email: admin.email,
      id: admin.id,
    };

    const accessToken = await this.authService.login(payload);

    return {
      success: true,
      accessToken,
    };
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async changePassword(
    @AdminData() admin: IAdminData,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<Partial<Admin>> {
    await changePasswordDto.validate();
    const id = admin.id;

    return this.adminService.changePassword(id, changePasswordDto);
  }
}
