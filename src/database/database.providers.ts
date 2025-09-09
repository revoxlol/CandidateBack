import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: process.env.DATABASE_PATH || './database.sqlite',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];