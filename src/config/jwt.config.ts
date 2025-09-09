import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('jwt.secret'),
    signOptions: {
      expiresIn: configService.get('jwt.expiresIn'),
    },
  }),
  inject: [ConfigService],
};