import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/enitities/users.entity';
import { Reviews } from './enitities/reviews.entities';
import { Repository } from 'typeorm';
import { CreateReviewDTO } from './dto/createReviewDTO';
import { DrinksService } from 'src/drinks/drinks.service';

@Injectable()
export class ReviewsService {
   constructor(
    @InjectRepository(Reviews)
    private reviewsRepository:Repository<Reviews>,
    private drinksService:DrinksService
   ){}
    async createReview(idDrink:number,user:Users,body:CreateReviewDTO){
        const newReview = new Reviews()
        newReview.content = body.content
        newReview.createdAt = new Date()
        newReview.drink =  await this.drinksService.getBBDDDrink(idDrink)
        newReview.user = user
        await this.reviewsRepository.save(newReview)
    }

    async getDrinkReviews(idDrink:number):Promise<Reviews[]>{
        try {
            return await this.reviewsRepository.createQueryBuilder()
            .select()
            .where('drinkPKDrink = :id',{id:idDrink})
            .getMany()
        
        } catch (error) {
               return error         
        }
        
    }
}
