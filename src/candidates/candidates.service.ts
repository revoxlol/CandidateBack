import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { FilterCandidateDto } from './dto/filter-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    // Check if candidate with email already exists
    const existingCandidate = await this.candidateRepository.findOne({
      where: { email: createCandidateDto.email },
    });

    if (existingCandidate) {
      throw new ConflictException('Candidate with this email already exists');
    }

    const candidate = this.candidateRepository.create(createCandidateDto);
    return await this.candidateRepository.save(candidate);
  }

  async findAll(filterDto: FilterCandidateDto) {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      position, 
      sortBy = 'createdAt', 
      sortOrder = 'DESC' 
    } = filterDto;
    
    const options: FindManyOptions<Candidate> = {
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy as keyof Candidate]: sortOrder,
      },
    };

    // Build where conditions
    const where: any = {};
    
    if (search) {
      where.name = Like(`%${search}%`);
    }
    
    if (status) {
      where.status = status;
    }
    
    if (position) {
      where.position = Like(`%${position}%`);
    }

    if (Object.keys(where).length > 0) {
      options.where = where;
    }

    const [candidates, total] = await this.candidateRepository.findAndCount(options);

    return {
      data: candidates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    return candidate;
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    const candidate = await this.findOne(id);

    // Check if email is being updated and if it conflicts
    if (updateCandidateDto.email && updateCandidateDto.email !== candidate.email) {
      const existingCandidate = await this.candidateRepository.findOne({
        where: { email: updateCandidateDto.email },
      });

      if (existingCandidate) {
        throw new ConflictException('Candidate with this email already exists');
      }
    }

    Object.assign(candidate, updateCandidateDto);
    return await this.candidateRepository.save(candidate);
  }

  async remove(id: number): Promise<void> {
    const candidate = await this.findOne(id);
    await this.candidateRepository.remove(candidate);
  }

  // Additional utility methods
  async getStatusCounts() {
    const counts = await this.candidateRepository
      .createQueryBuilder('candidate')
      .select('candidate.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('candidate.status')
      .getRawMany();

    return counts.reduce((acc, item) => {
      acc[item.status] = parseInt(item.count);
      return acc;
    }, {});
  }

  async getRecentCandidates(limit: number = 5): Promise<Candidate[]> {
    return await this.candidateRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}