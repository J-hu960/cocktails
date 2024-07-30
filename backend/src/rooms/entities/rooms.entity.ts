import { Drink } from 'src/drinks/entities/drinks.enitity';
import { Users } from 'src/users/enitities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  PK_Rooms: number;

  @Column()
  name:string

  @Column()
  isPublic:boolean

  @CreateDateColumn()
  createdAt:Date

  @Column()
  secret_key:string;

  @ManyToOne(()=>Users)
  user:Users

  @ManyToMany(()=>Users)
  @JoinTable()
   users:Users[]

  @ManyToMany(()=>Users)
  @JoinTable()
   drinks:Drink[]


}