import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from '../admin/admin.service';
import { AdminNotFoundException } from '../admin/exceptions';
import { IAdminData, IPayload } from './interfaces';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IPayload): Promise<IAdminData> {
    const admin = await this.adminService.findById(payload.id);

    if (!admin) {
      throw new AdminNotFoundException();
    }
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }
}
