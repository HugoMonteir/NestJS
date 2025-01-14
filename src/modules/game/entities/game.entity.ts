import { GameInterface } from '../interfaces';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'games' })
@Unique(['name'])
export class Game implements GameInterface {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  public genre: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  public platform: string;
}
