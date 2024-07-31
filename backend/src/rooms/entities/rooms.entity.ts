import { Drink } from 'src/drinks/entities/drinks.enitity';
import { Users } from 'src/users/enitities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  PK_Rooms: number;

  @Column({unique:true})
  name:string

  @Column()
  isPublic:boolean

  @CreateDateColumn()
  createdAt:Date

  @Column({nullable:true})
  secret_key:string;

  @ManyToOne(()=>Users,{cascade:true})
  user:Users

  @ManyToMany(()=>Users)
  @JoinTable()
   users:Users[]

  @ManyToMany(()=>Drink)
  @JoinTable()
   drinks:Drink[]


}