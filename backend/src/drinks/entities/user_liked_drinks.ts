import { Users } from 'src/users/enitities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserLikedDrinks {
  @PrimaryGeneratedColumn()
  PK_user_drink_liked: number;

  @ManyToOne(()=>Users)
  user:Users
  @Column()
  id_drink:number

}