import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './enitities/reviews.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Reviews])],
  controllers:[ReviewsController],
  providers:[ReviewsService],
  exports:[TypeOrmModule.forFeature([Reviews])],

})
export class ReviewsModule {}
