import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from './entities/drinks.enitity';

@Module({
  imports:[TypeOrmModule.forFeature([Drink])],
  controllers: [DrinksController],
  providers: [DrinksService],
  exports:[TypeOrmModule.forFeature([Drink])]
})
export class DrinksModule {}
