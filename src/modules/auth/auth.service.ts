import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { IPayload } from './interfaces';
import { NullableType } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  private async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(admin: IPayload): Promise<string> {
    return this.jwtService.sign(admin);
  }

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<NullableType<IPayload>> {
    const admin = await this.adminService.findByEmail(email);

    if (admin && (await this.comparePasswords(password, admin.password))) {
      const { ...result } = admin;
      return result;
    }

    return null;
  }
}
