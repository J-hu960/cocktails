import { Drink } from 'src/drinks/entities/drinks.enitity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  PK_User: number;

  @Column()
  password:string;

  @Column({nullable:true})
  picture:string;

  @CreateDateColumn()
  createdAt:Date

  @Column({unique:true})
  username: string;

  @ManyToMany(()=>Drink)
  liked_drinks:Drink[]

  @ManyToMany(()=>Drink)
  @JoinTable()
  disliked_drinks:Drink[]



}