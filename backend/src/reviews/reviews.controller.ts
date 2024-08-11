import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/createReviewDTO';
import { AuthGuard } from 'src/auth/auth.guard';
import { Reviews } from './enitities/reviews.entities';
@UseGuards(AuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':id')
  createReview(@Param('id') idDrink:number,@Req() req,@Body()body:CreateReviewDTO ){
    this.reviewsService.createReview(idDrink,req.user,body)
  }

  @Get(':id')
  getDrinkReviews(@Param('id') idDrink:number):Promise<Reviews[]>{
    try {
      return this.reviewsService.getDrinkReviews(idDrink)
    } catch (error) {
        throw error
    }
  }
}
