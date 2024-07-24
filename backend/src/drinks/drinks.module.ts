import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomDrinks } from './entities/rooms_drinks_link.entity';
import { UserLikedDrinks } from './entities/user_liked_drinks';

@Module({
  imports:[TypeOrmModule.forFeature([RoomDrinks,UserLikedDrinks])],
  controllers: [DrinksController],
  providers: [DrinksService],
  exports:[TypeOrmModule.forFeature([RoomDrinks,UserLikedDrinks])]
})
export class DrinksModule {}
