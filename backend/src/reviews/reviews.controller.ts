import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/createReviewDTO';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':id')
  createReview(@Param('id') idDrink:number,@Req() req,@Body()body:CreateReviewDTO ){
    this.reviewsService.createReview(idDrink,req.user,body)
  }
}
