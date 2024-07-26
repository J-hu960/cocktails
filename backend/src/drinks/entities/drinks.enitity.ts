import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drink {
  @PrimaryColumn()
  PK_Drink: number;
  
  @Column()
  name:string;

  @Column()
  photo:string;

  @Column({default:0})
  likes:number;

  @Column({default:0})
  dislikes:number;

  @Column()
  category:string


 
}
