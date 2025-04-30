import { IsString } from 'class-validator';

export class UpdatePrivacyPolicyDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
