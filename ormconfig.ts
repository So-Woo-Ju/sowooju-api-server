import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  extra: {
    decimalNumbers: true,
  },
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'so_woo_ju',
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: '/src/migrations',
  },
  autoLoadEntities: true,
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
};

export = ormconfig;
