import { Drink } from 'src/drinks/entities/drinks.enitity';
import { Rooms } from 'src/rooms/entities/rooms.entity';
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

  @ManyToMany(()=>Drink,{cascade:true})
  @JoinTable()
  liked_drinks:Drink[]

  @ManyToMany(()=>Drink,{cascade:true})
  @JoinTable()
  disliked_drinks:Drink[]

  @ManyToMany(()=>Rooms,{cascade:true})
  rooms:Rooms[]



}