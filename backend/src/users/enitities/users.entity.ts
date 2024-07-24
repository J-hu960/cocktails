import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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


}