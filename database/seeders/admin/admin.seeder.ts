import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { IAdmin } from 'src/modules/admin/interfaces';
import { consoleInfo } from 'src/utils';

@Injectable()
export class AdminSeeder {
  constructor(private readonly adminService: AdminService) {}

  async create(): Promise<void> {
    const adminExists =
      await this.adminService.findByEmail('admin@example.com');
    if (!adminExists) {
      const adminData: IAdmin = {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: 'admin123',
      };

      await this.adminService.create(adminData);
      consoleInfo('Admin user created');
    } else {
      consoleInfo('Admin user already exists');
    }
  }
}
