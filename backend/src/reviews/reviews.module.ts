import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './enitities/reviews.entities';
import { DrinksModule } from 'src/drinks/drinks.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Reviews]),DrinksModule,AuthModule,UsersModule],
  controllers:[ReviewsController],
  providers:[ReviewsService],
  exports:[TypeOrmModule.forFeature([Reviews])],

})
export class ReviewsModule {}
