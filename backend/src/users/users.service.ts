import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Users } from './enitities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinksService } from 'src/drinks/drinks.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository:Repository<Users>,
        @Inject(forwardRef(() => DrinksService))
        private drinkService: DrinksService,
      ){}

      async createUser(hashedPassword:string,username:string,){
        try {
            const newUser= await this.userRepository.createQueryBuilder('user')
            .insert()
            .into(Users)
            .values({
               username:username,
               password:hashedPassword,
            }).execute()
    
            return newUser
            
        } catch (error) {
            return error
        }
       
    
      
      }

      async findOne(username: string):Promise<Users> {
        return this.userRepository.createQueryBuilder('user')
        .select()
        .where('user.username=:username',{username:username}).getOne();
      }
      async findOneById(id: number):Promise<Users> {
        return this.userRepository.createQueryBuilder('user')
        .select()
        .where('user.PK_User=:id',{id:id}).getOne();
      }

      async  remove(id: number) {
        console.log(id)
        return this.userRepository.createQueryBuilder()
        .delete()
        .from(Users)
        .where('PK_User=:id',{id:id})
        .execute()
      }

      async addDrinkToUserLikeds(idDrink: number, idUser: number) {
        const user = await this.findOneById(idUser);
        const drink = await this.drinkService.getBBDDDrink(idDrink);
    
        if (!user.liked_drinks) {
          user.liked_drinks = [];
        }
    
        user.liked_drinks.push(drink);
        await this.userRepository.save(user);
      }

      async subDrinkToUserLikeds(idDrink: number, idUser: number) {
        try {
            // Encuentra el usuario por ID
            const user = await this.findOneById(idUser);
            
            // Verifica si el usuario tiene la propiedad liked_drinks y asegúrate de que sea un array
            if (!user.liked_drinks) {
                user.liked_drinks = [];
            }
    
            // Filtra la bebida que se desea eliminar
            const removedDrinks = user.liked_drinks.filter(drink => drink.PK_Drink !== idDrink);
    
            // Asigna la lista filtrada de vuelta al usuario
            user.liked_drinks = removedDrinks;
    
            // Guarda el usuario actualizado
            await this.userRepository.save(user);
        } catch (error) {
            // Manejo de errores
            console.error('Error al actualizar las bebidas favoritas del usuario:', error);
            throw new Error('No se pudo actualizar las bebidas favoritas del usuario.');
        }
    }
    
      async hasAlreadyLiked(idUser:number,idDrink:number):Promise<boolean>{
        const likedByUser = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.liked_drinks','drink')
        .where("user.PK_User = :id",{id:idUser})
        .getOne()

        console.log(likedByUser.liked_drinks)
 
        const hasLiked = likedByUser.liked_drinks.some(drink=>drink.PK_Drink == idDrink)

        if(hasLiked){
            return true

        }else{
            console.log('aun no le ha dado like')
            return false
        } 
    }



    


}
