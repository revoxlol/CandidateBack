import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { FilterCandidateDto } from './dto/filter-candidate.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('candidates')
@UseGuards(JwtAuthGuard)
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return await this.candidatesService.create(createCandidateDto);
  }

  @Get()
  async findAll(@Query() filterDto: FilterCandidateDto) {
    return await this.candidatesService.findAll(filterDto);
  }

  @Get('stats')
  async getStats() {
    const statusCounts = await this.candidatesService.getStatusCounts();
    const recentCandidates = await this.candidatesService.getRecentCandidates();
    
    return {
      statusCounts,
      recentCandidates,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.candidatesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return await this.candidatesService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.candidatesService.remove(+id);
    return {
      message: 'Candidate deleted successfully',
    };
  }
}