import { Users } from 'src/users/enitities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  PK_Rooms: number;

  @CreateDateColumn()
  createdAt:Date

  @Column()
  secret_key:string;

  @ManyToOne(()=>Users)
  user:Users

  @ManyToMany(()=>Users)
  @JoinTable()
   users:Users[]
}