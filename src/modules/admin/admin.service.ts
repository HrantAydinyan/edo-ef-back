import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { IAdmin } from './interfaces';
import { compare, hash } from 'bcrypt';
import { ChangePasswordDto } from './dtos';
import { MaybeType, OrNeverType } from 'src/common';
import {
  AdminNotFoundException,
  IncorrectPasswordException,
} from './exceptions';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findById(id: number): Promise<OrNeverType<Admin>> {
    const existingAdmin = this.adminRepository.findOneBy({ id });

    if (!existingAdmin) {
      throw new AdminNotFoundException();
    }

    return existingAdmin;
  }

  async findByEmail(email: string): Promise<MaybeType<Admin>> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email },
    });

    return existingAdmin;
  }

  async create(adminData: IAdmin): Promise<Admin> {
    const hashedPassword = await hash(adminData.password, 10);
    const admin = this.adminRepository.create({
      ...adminData,
      password: hashedPassword,
    });
    return this.adminRepository.save(admin);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Partial<Admin>> {
    const admin = await this.findById(id);

    const isMatch = await compare(
      changePasswordDto.currentPassword,
      admin.password,
    );
    if (!isMatch) {
      throw new IncorrectPasswordException();
    }

    const hashedNewPassword = await hash(changePasswordDto.newPassword, 10);
    admin.password = hashedNewPassword;

    const updatedAdmin = await this.adminRepository.save(admin);

    return instanceToPlain(updatedAdmin);
  }
}
