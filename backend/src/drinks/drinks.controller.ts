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
  // @Get()

  // injectdata(){
  //   categories.drinks.forEach(category=>{
  //     this.drinksService.logData(category.strCategory)
  //   })
  // }

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
   if(await(this.usersService.hasAlreadyLiked(req.user.PK_User,id))){
      this.drinksService.subsLikeToPost(id)
      this.usersService.subDrinkToUserLikeds(id,req.user.PK_User)
      return
   }

   try {

     this.drinksService.addLikeToPost(id)
     this.usersService.addDrinkToUserLikeds(id,req.user.PK_User)
    
   } catch (error) {
      throw error
   }
  }

  @Patch('/:id/addDislike')
  async addDisLikeToDrink(@Param('id') id:number){
   try {
    this.drinksService.addDislikeToPost(id)
    
   } catch (error) {
      throw error
    
   }
  }

}
