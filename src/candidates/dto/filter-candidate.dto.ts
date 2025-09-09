import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CandidateStatus } from '../entities/candidate.entity';

export class FilterCandidateDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}