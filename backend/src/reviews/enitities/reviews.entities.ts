import { Users } from 'src/users/enitities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn()
  PK_Review: number;

  @CreateDateColumn()
  createdAt:Date

  @Column()
  content:string;

  @ManyToOne(()=>Users)
  user:Users

  @Column()
  id_drink:number

  
}