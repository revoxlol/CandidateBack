import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}