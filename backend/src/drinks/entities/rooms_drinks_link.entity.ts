import { Rooms } from 'src/rooms/entities/rooms.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class RoomDrinks {
  @PrimaryGeneratedColumn()
  PK_user_drink_liked: number;

  @ManyToOne(()=>Rooms)
  room:Rooms
  @Column()
  id_drink:number

}