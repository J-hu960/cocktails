import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Repository } from 'typeorm';
import { CreateRoomDTO } from './DTO/createRoomDTO';
import { Users } from 'src/users/enitities/users.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Rooms)
        private roomsRepository:Repository<Rooms>
    ){}
    
   async createRoom(newRoom:CreateRoomDTO,user:Users){
        try {
            const bbddNewRoom = new Rooms()
            bbddNewRoom.createdAt = new Date()
            bbddNewRoom.isPublic = newRoom.isPublic
            bbddNewRoom.name = newRoom.name
            bbddNewRoom.secret_key = newRoom.secret_key || null
            bbddNewRoom.user = user
            bbddNewRoom.users = [user]
            await this.roomsRepository.save(bbddNewRoom)
        
        
        } catch (error) {
            console.log(error)
             throw new InternalServerErrorException({error:"Error en el servidor al intentar crear la sala"})            
        }
        
    }

}
