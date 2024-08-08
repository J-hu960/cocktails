import { BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from './enitities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrinksService } from 'src/drinks/drinks.service';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { error } from 'console';
import { Drink } from 'src/drinks/entities/drinks.enitity';
import { Rooms } from 'src/rooms/entities/rooms.entity';

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
    
            return username
            
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
        .leftJoinAndSelect('user.liked_drinks', 'drink')
        .where('user.PK_User=:id',{id:id})
        .getOne();
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
        console.log(user.liked_drinks)
    
        if (!user.liked_drinks) {
          user.liked_drinks = [];
        }
    
        user.liked_drinks = [...user.liked_drinks,drink];
        console.log(user.liked_drinks.length)
        await this.userRepository.save(user);
      }

      async subDrinkToUserLikeds(idDrink: number, idUser: number) {
        try {
            // Encuentra el usuario por ID
            const user = await this.findOneById(idUser);
            console.log(user.liked_drinks)
            // Verifica si el usuario tiene la propiedad liked_drinks y asegúrate de que sea un array
            if (!user.liked_drinks) {
                user.liked_drinks = [];
            }
    
            // Asigna la lista filtrada de vuelta al usuario
            const filteredDrinks = user.liked_drinks.filter(drink => drink.PK_Drink != idDrink);
            console.log(filteredDrinks.length)
            user.liked_drinks = filteredDrinks
            console.log(user.liked_drinks.length)
            console.log('bebida eliminada de likes')
            // Guarda el usuario actualizado
            await this.userRepository.save(user);
        } catch (error) {
            // Manejo de errores
            console.error('Error al actualizar las bebidas favoritas del usuario:', error);
            throw new Error('No se pudo actualizar las bebidas favoritas del usuario.');
        }
    }

      async addDrinkToUserDisLikeds(idDrink: number, idUser: number) {
      const user = await this.findOneById(idUser);
      const drink = await this.drinkService.getBBDDDrink(idDrink);
  
      if (!user.disliked_drinks) {
        user.disliked_drinks = [];
      }
  
      user.disliked_drinks.push(drink);
      await this.userRepository.save(user);
      }

      async subDrinkToUserDisLikeds(idDrink: number, idUser: number) {
        try {
            // Encuentra el usuario por ID
            const user = await this.findOneById(idUser);
            
            // Verifica si el usuario tiene la propiedad liked_drinks y asegúrate de que sea un array
            if (!user.disliked_drinks) {
                user.disliked_drinks = [];
            }
    
            // Filtra la bebida que se desea eliminar
            const removedDrinks = user.disliked_drinks.filter(drink => drink.PK_Drink !== idDrink);
    
            // Asigna la lista filtrada de vuelta al usuario
            user.disliked_drinks = removedDrinks;
    
            // Guarda el usuario actualizado
            await this.userRepository.save(user);
        } catch (error) {
            // Manejo de errores
            console.error('Error al actualizar las bebidas no favoritas del usuario:', error);
            throw new Error('No se pudo actualizar las bebidas no  favoritas del usuario.');
        }
    }
    async updateUserProfile(user:Users,body:UpdateUserDTO){
      try {
        const userInBDD = await this.findOneById(user.PK_User)
        if(!userInBDD){
          throw new UnauthorizedException({error:'El usuaio no existe'})
        }
  
        const duplicateUsername =  await this.findOne(body.username)
        if(duplicateUsername){
          throw new BadRequestException({error:'Este nombre de usuario ya existe'})
        }
    
        user.username = body.username
        await this.userRepository.save(user)
        
      } catch (error) {
        throw error
        
      }
     
  
    }

    
    async hasAlreadyLiked(idUser:number,idDrink:number):Promise<boolean>{
        const likedByUser = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.liked_drinks','drink')
        .where("user.PK_User = :id",{id:idUser})
        .getOne()

        console.log(likedByUser.liked_drinks.length)
 
        const hasLiked = likedByUser.liked_drinks.some(drink=>drink.PK_Drink == idDrink)

        if(hasLiked){
            return true

        }else{
            console.log('aun no le ha dado like')
            return false
        } 
    }
    async hasAlreadyDisliked(idUser:number,idDrink:number):Promise<boolean>{
      const dislikedByUser = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.disliked_drinks','drink')
      .where("user.PK_User = :id",{id:idUser})
      .getOne()

      console.log(dislikedByUser.disliked_drinks)

      const hasdisLiked = dislikedByUser.disliked_drinks.some(drink=>drink.PK_Drink == idDrink)

      if(hasdisLiked){
          return true

      }else{
          console.log('aun no le ha dado like')
          return false
      } 
     }

    async deleteUser(user:Users){
      await this.userRepository.createQueryBuilder()
      .delete()
      .where('PK_User = :id',{id:user.PK_User})
      .execute()
    }

    async getUserFavoriteDrinks(user:Users):Promise<Drink[]>{
      try {
        const userWithLikedDrinks:Users = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.liked_drinks','drink')
        .where('user.PK_User = :id',{id:user.PK_User})
        .getOne()
        return userWithLikedDrinks.liked_drinks
        
      } catch (error) {
        console.log(error)
        
      }
       

    }

    async getUserRooms(user:Users):Promise<Rooms[]>{
      console.log(user.PK_User)
      try {
        const userRooms = await this.userRepository.query(        
          `  select * 
          from rooms r
          left Join rooms_users_users ru on ru.usersPKUser = r.userPKUser
          where usersPKUser = ?`, [user.PK_User]);
        console.log(userRooms)
        return userRooms;
      } catch (error) {
        console.error('Error al obtener las salas del usuario:', error);
        throw new Error('No se pudieron obtener las salas del usuario.');
      }
    }


    


}
