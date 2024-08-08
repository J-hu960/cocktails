import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Repository } from 'typeorm';
import { CreateRoomDTO } from './DTO/createRoomDTO';
import { Users } from 'src/users/enitities/users.entity';
import { error } from 'console';
import { User } from 'ionic';
import { Drink } from 'src/drinks/entities/drinks.enitity';
import { DrinksService } from 'src/drinks/drinks.service';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Rooms)
        private roomsRepository:Repository<Rooms>,
        private drinksService:DrinksService
    ){}
    
    async getRooms(){
        return  this.roomsRepository.createQueryBuilder('room')
        .select()
        .where('room.isPublic = 1')
        .getMany();
    }
    async createRoom(newRoom:CreateRoomDTO,user:Users){
    try {
           if(!newRoom.isPublic && !newRoom.secret_key){
            throw new BadRequestException({error:"Una sala privada debe tener una llave secreta"})
           }
        
           if(newRoom.isPublic && newRoom.secret_key){
            throw new BadRequestException({error:"Una sala pública no debe tener una llave secreta"})
           }
        
                try {
                    const bbddNewRoom = new Rooms()
                    bbddNewRoom.createdAt = new Date()
                    bbddNewRoom.isPublic =newRoom.isPublic
                    bbddNewRoom.name = newRoom.name
                    bbddNewRoom.secret_key = newRoom.secret_key || null
                    bbddNewRoom.user = user
                    bbddNewRoom.users = [user]
                    await this.roomsRepository.save(bbddNewRoom)
                
                } catch (error) {
                    console.log(error)
                     throw new InternalServerErrorException({error:"Error en el servidor al intentar crear la sala"})            
                }
        
    } catch (error) {
        throw error
    }
 
        
    }

    async userJoinPublicRoom(user:Users,roomId:number){
        try {
        //Mirar si existeix la room
         const room = await this.findOneRoom(roomId)
         if(!room){
            throw new BadRequestException({error:"La sala no existe."})
         }

        //comprovar que l'usuari no està a la room
        const roomUsers = await this.getRoomUsers(room.PK_Rooms)
        console.log(roomUsers)
        if( roomUsers.some(roomUser=>roomUser.PK_User === user.PK_User)){
            return new UnauthorizedException({error:"El usuario ya está unido a la sala."})
        }

        //afegir l'usuari a la room

        const newRoomsUser = [...roomUsers,user]
        room.users = newRoomsUser
        await this.roomsRepository.save(room)

        } catch (error) {
           throw error
        }
    }

    async userJoinPrivateRoom(user:Users,roomId:number,secret_key:string){
        const room = await this.findOneRoom(roomId)
         if(!room){
            throw new BadRequestException({error:"La sala no existe."})
         }
         const roomUsers = await this.getRoomUsers(room.PK_Rooms)
         console.log(roomUsers)
         if( roomUsers.some(roomUser=>roomUser.PK_User === user.PK_User)){
             return new UnauthorizedException({error:"El usuario ya está unido a la sala."})
         }

         //Comprovar que la clau es correcte
         if(secret_key!=room.secret_key){
            throw new UnauthorizedException({error:"Llave secreta no válida."})
         }

         const newRoomsUser = [...roomUsers,user]
         room.users = newRoomsUser
         await this.roomsRepository.save(room)



    }

    async addDrinkToRoom(roomId:number,user:Users,drinkId:number){
        //comprovar si el usuario esta en la room (sino no esta autorizado)
        const roomUsers = await this.getRoomUsers(roomId)
        if( !(roomUsers.some(roomUser=>roomUser.PK_User === user.PK_User))){
            throw new UnauthorizedException({error:"Debes ser parte de la room para poder añadir bebidas."})
        }
        //comprovar si la drink esta en la room ya (evitar duplicados)
        const roomDrinks = await this.getRoomDrinks(roomId)
        if(roomDrinks.some(roomDrink=>roomDrink.PK_Drink == drinkId)){
            throw new BadRequestException({error:"La bebida ya se encuentra disponible en la sala!"})
        }
        //añadir la drink a la room
        const drink = await this.drinksService.getBBDDDrink(drinkId)
        console.log(drink)
        const newDrinksList = [...roomDrinks,drink]
        console.log(newDrinksList)

        const room = await this.findOneRoom(roomId)
        room.drinks = newDrinksList
        room.drinks        
        await this.roomsRepository.save(room)
       
    }

    async deleteUserFromRoom(user:Users,roomId:number){
        try {
             //comprovar que l'usuari esta a la sala
        const roomUsers = await this.getRoomUsers(roomId)
        if(!(roomUsers.some(roomUser=>roomUser.PK_User == user.PK_User))){
            throw new BadRequestException({error:"El usuario no forma parte de la sala"})
        }
        //filtrar el array de usaris
        const filteredUsers = roomUsers.filter(roomUser=>roomUser.PK_User!=user.PK_User)
        const room = await this.findOneRoom(roomId)
        const roomCreator = await this.getRoomCreator(roomId)
        if(roomCreator.PK_User == user.PK_User){
            console.log('noo')
            throw new BadRequestException({error:'El creador de la sala no puede abandonarla'})
        }
        room.users = filteredUsers
        //guardar la room
        await this.roomsRepository.save(room)
            
        } catch (error) {
            throw error
            
        }
       

    }

    async findOneRoom(id:number):Promise<Rooms>{
        return this.roomsRepository.createQueryBuilder()
        .where('PK_Rooms = :id',{id:id})
        .getOne()
    }

    async getRoomUsers(id:number):Promise<Users[]>{
        try {
            const room = await this.roomsRepository.createQueryBuilder('room')
            .leftJoinAndSelect('room.users', 'user')
            .where('room.PK_Rooms = :id', { id })
            .getOne();
            if(!room) return
           return room.users || []
        
        } catch (error) {
             console.log(error)        
        }
        
    }

    async getRoomDrinks(id:number):Promise<Drink[]>{
        const room = await this.roomsRepository.createQueryBuilder('room')
        .leftJoinAndSelect('room.drinks', 'drink')
        .where('room.PK_Rooms = :id', { id })
        .getOne();
         console.log(room.drinks)
         return room.drinks
    }

    async getRoomCreator(id:number):Promise<Users>{
        const room = await this.roomsRepository.createQueryBuilder('room') 
        .leftJoinAndSelect('room.user','user')
        .where('room.PK_Rooms = :id',{id:id})
        .getOne()

        return room.user
    }








}
