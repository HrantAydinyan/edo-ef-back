import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivacyPolicy } from './privacy-policy.entity';
import { Repository } from 'typeorm';
import { IPrivacyPolicy } from './interfaces';
import { UpdatePrivacyPolicyDto } from './dtos';
import { PrivacyPolicyNotFoundException } from './exceptions';

@Injectable()
export class PrivacyPolicyService {
  constructor(
    @InjectRepository(PrivacyPolicy)
    private readonly privacyPolicyRepository: Repository<PrivacyPolicy>,
  ) {}

  async findByIdOrFail(id: number): Promise<PrivacyPolicy> {
    const privacyPolicy = await this.privacyPolicyRepository.findOneBy({ id });

    if (!privacyPolicy) {
      throw new PrivacyPolicyNotFoundException();
    }

    return privacyPolicy;
  }

  async seed(createPrivacyPolicy: IPrivacyPolicy): Promise<PrivacyPolicy> {
    const privacyPolicy =
      this.privacyPolicyRepository.create(createPrivacyPolicy);
    return this.privacyPolicyRepository.save(privacyPolicy);
  }

  async update(
    id: number,
    updatePrivacyPolicyDto: UpdatePrivacyPolicyDto,
  ): Promise<PrivacyPolicy> {
    const privacyPolicy = await this.findByIdOrFail(id);

    const updatedPrivacyPolicy = this.privacyPolicyRepository.merge(
      privacyPolicy,
      updatePrivacyPolicyDto,
    );

    return this.privacyPolicyRepository.save(updatedPrivacyPolicy);
  }

  async isTableEmpty(): Promise<boolean> {
    return !Boolean(await this.privacyPolicyRepository.count());
  }

  async findSingle(): Promise<PrivacyPolicy> {
    return this.privacyPolicyRepository.findOneBy({});
  }
}
