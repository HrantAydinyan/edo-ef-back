import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Imprint } from './imprint.entity';
import { Repository } from 'typeorm';
import { IImprint } from './interfaces';
import { UpdateImprintDto } from './dtos';
import { ImprintNotFoundException } from './exceptions';

@Injectable()
export class ImprintService {
  constructor(
    @InjectRepository(Imprint)
    private readonly imprintRepository: Repository<Imprint>,
  ) {}

  async findByIdOrFail(id: number): Promise<Imprint> {
    const imprint = await this.imprintRepository.findOneBy({ id });

    if (!imprint) {
      throw new ImprintNotFoundException();
    }

    return imprint;
  }

  async seed(createImprint: IImprint): Promise<Imprint> {
    const imprint = this.imprintRepository.create(createImprint);
    return this.imprintRepository.save(imprint);
  }

  async update(
    id: number,
    updateImprintDto: UpdateImprintDto,
  ): Promise<Imprint> {
    const imprint = await this.findByIdOrFail(id);

    const updatedImprint = this.imprintRepository.merge(
      imprint,
      updateImprintDto,
    );

    return this.imprintRepository.save(updatedImprint);
  }

  async isTableEmpty(): Promise<boolean> {
    return !Boolean(await this.imprintRepository.count());
  }

  async findSingle(): Promise<Imprint> {
    return this.imprintRepository.findOneBy({});
  }
}
