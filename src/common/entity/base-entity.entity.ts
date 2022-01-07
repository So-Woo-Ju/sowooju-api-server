import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({description: '아이디', example: '1'})
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
