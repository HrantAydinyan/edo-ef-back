import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/modules/admin/admin.module';
import { AdminJwtStrategy } from './admin-jwt.strategy';
import { JwtExpiration } from './constants';
import { AdminAuthController } from './auth-admin.controller';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: JwtExpiration.OneWeek },
    }),
    AdminModule,
  ],
  controllers: [AdminAuthController],
  providers: [AuthService, AdminJwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
