import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password from response
    const { password: userPassword, ...userWithoutPassword } = user;
    
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    
    if (user && (await this.usersService.validatePassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }
}