import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  extra: {
    decimalNumbers: true,
  },
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
  autoLoadEntities: true,
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: false,
  logging: false,
};

export = ormconfig;
