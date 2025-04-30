import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards';
import { PrivacyPolicyService } from './privacy-policy.service';
import { UpdatePrivacyPolicyDto } from './dtos';
import { PrivacyPolicy } from './privacy-policy.entity';

@Controller('admin/privacy-policy')
@UseGuards(AdminGuard)
export class AdminPrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrivacyPolicyDto: UpdatePrivacyPolicyDto,
  ): Promise<PrivacyPolicy> {
    return this.privacyPolicyService.update(id, updatePrivacyPolicyDto);
  }
}
