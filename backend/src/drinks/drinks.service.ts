import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drink } from './entities/drinks.enitity';
import { Repository } from 'typeorm';
import * as drinks from './data/cocktails.json'
import { API_Drink, DrinkType } from 'src/types';
import axios from 'axios';
import { API_COCKTAILS_BASE } from 'src/constants';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class DrinksService {
    constructor(
        @InjectRepository(Drink)
        private drinkRepository:Repository<Drink>,
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
    ){}

    async logData(cat:string){
        const drinksRetrieved= await this.getDrinksByCategory(cat)
        const drinksWcategory:DrinkType[] = drinksRetrieved.drinks.map(drink=>{
            return {
                ...drink,
                category:cat
            }
        })

        drinksWcategory.forEach(drink=>{
            this.persistDrink(drink) 
        })
      }

    async persistDrink(drink:DrinkType){
        await this.drinkRepository.createQueryBuilder()
        .insert()
        .into(Drink)
        .values({
            PK_Drink: Number(drink.idDrink), 
            name:drink.strDrink,
            photo:drink.strDrinkThumb,
            category:drink.category || "UNKOWN"
          }
        ).execute()
    }

    async getDrinksByCategory(category:string){
        const drinks = await axios.get(`${API_COCKTAILS_BASE}/json/v1/1/filter.php?c=${category}`)
        return drinks.data 
    }

    async getDrinks(category:string,page:number,limit:number){
        const skip = (page*limit) -limit //2-1

        if(category!==""){
            return this.drinkRepository.createQueryBuilder('drink')
            .where("drink.category = :category",{category:category})
            .skip(skip)
            .take(limit)
            .getMany()
        }else{
            return this.drinkRepository.createQueryBuilder('drink')
            .skip(skip)
            .take(limit)
            .getMany()
        }
    }

    async getDrinkById(id:number):Promise<API_Drink>{
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            const drink = await response.data
            if(!drink){
                throw new NotFoundException()
            }
            return drink.drinks[0]    
        } catch (error) {
            throw error
        }
      
    }

    async getBBDDDrink(id:number){
        return this.drinkRepository.createQueryBuilder('drink')
        .select()
        .where('drink.PK_Drink=:id',{id:id}).getOne();
    }

    async addLikeToPost(id:number){
        const drink = await this.getDrinkById(id)
        try {
            this.drinkRepository.createQueryBuilder()
            .update(Drink)
            .set({
                likes:()=> "likes + 1"
            })
            .where("PK_Drink =:id",{id:id})
            .execute()
            
        } catch (error) {
            throw new InternalServerErrorException({error:"Error del servidor al actualizar los likes de la bebida:("})
        }
       
    }

    async subsLikeToPost(id:number){
        this.drinkRepository.createQueryBuilder()
        .update(Drink)
        .set({
            likes:()=> "likes - 1"
        })
        .where("PK_Drink =:id",{id:id})
        .execute()

    }

    async addDislikeToPost(id:number){
        this.drinkRepository.createQueryBuilder()
        .update(Drink)
        .set({
            dislikes:()=> "dislikes + 1"
        })
        .where("PK_Drink =:id",{id:id})
        .execute()
    }

    async subsDislikeToPost(id:number){
        this.drinkRepository.createQueryBuilder()
        .update(Drink)
        .set({
            dislikes:()=> "dislikes - 1"
        })
        .where("PK_Drink =:id",{id:id})
        .execute()

    }

   
    

   




}
