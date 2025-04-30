import { Injectable } from '@nestjs/common';
import { consoleInfo } from 'src/utils';
import { imprintData } from './content';
import { ImprintService } from 'src/modules/imprint/imprint.service';

@Injectable()
export class ImprintSeeder {
  constructor(private readonly imprintService: ImprintService) {}

  async seed(): Promise<void> {
    const isTableEmpty = await this.imprintService.isTableEmpty();

    if (isTableEmpty) {
      await this.imprintService.seed(imprintData);

      consoleInfo(`Imprint created.`);
    } else {
      consoleInfo(`Imprint already exists.`);
    }
  }
}
