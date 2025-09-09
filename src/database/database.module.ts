import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('database.path'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}