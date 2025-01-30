import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  public username: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public password: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  public status: string;

  @Column({ type: 'varchar', nullable: false, length: 30 })
  public role: string;
}
