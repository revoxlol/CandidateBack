import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { CandidateStatus } from '../entities/candidate.entity';

export class CreateCandidateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsEnum(CandidateStatus)
  @IsOptional()
  status?: CandidateStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}