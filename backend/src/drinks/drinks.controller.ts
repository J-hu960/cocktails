import { BadRequestException, Body, Controller, Get, Param, Patch, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import * as categories from "./data/categories.json"
import axios from 'axios';
import { API_Drink } from 'src/types';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';


@UseGuards(AuthGuard)
@Controller('drinks')
export class DrinksController {
  
  constructor(
    private readonly drinksService: DrinksService,
    private usersService:UsersService
  ) {}

  @Get()
  getDrinksPaginated(
    @Query('category') category:string="",
    @Query('page') page:number = 1,
    @Query('limit') limit:number=10 ){
      try {
        return this.drinksService.getDrinks(category,page,limit)
      } catch (error) {
        console.log('error retrieving drinks')
        throw new UnauthorizedException()
      }
  }

  @Get('/:id')
  async getDrinkDetails(@Param('id') id:number){
    try {
      if(!id){ throw new BadRequestException({error:"Es necesario proporcionar un id"})}
      return this.drinksService.getDrinkById(id)
      
    } catch (error) {
      throw error
      
    }
  
  }

  @Patch('/:id/addlike')
  async addLikeToDrink(@Param('id') id:number, @Req() req){
     //comprovar si l'usuari ya ha donat like
   if(await(this.usersService.hasAlreadyLiked(req.user.PK_User,id))){
      //Retirar el like del Drink
      this.drinksService.subsLikeToPost(id)
      //Retirar la relacio de usuari-Drink liked
      this.usersService.subDrinkToUserLikeds(id,req.user.PK_User)
      return
   }
   //si no ...
   try {
        //sumem like al Drink
         this.drinksService.addLikeToPost(id)
          //Generem relació usuari-Drink liked
          this.usersService.addDrinkToUserLikeds(id,req.user.PK_User)

   } catch (error) {
      throw error
   }
  }

  @Patch('/:id/addDislike')
  async addDisLikeToDrink(@Param('id') id:number,@Req() req){

    //Comprovar si l'usuari ha donar dislike
     if(await(this.usersService.hasAlreadyDisliked(req.user.PK_User,id))){
      //restar un dislike al post
       this.drinksService.subsDislikeToPost(id)
       //treure relacio user-disliked Drink
       this.usersService.subDrinkToUserDisLikeds(id,req.user.PK_User)
     }

   try {
       this.drinksService.addDislikeToPost(id)
       this.usersService.addDrinkToUserDisLikeds(id,req.user.PK_User)
    
   } catch (error) {
      throw error
   }
  }

}
