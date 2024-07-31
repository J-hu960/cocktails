import { Body, Controller, Delete, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDTO } from './DTO/createRoomDTO';
import { AuthGuard } from 'src/auth/auth.guard';
import {JoinRoomDTO} from './DTO/joinRoomDTO'


@UseGuards(AuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  //borrar l'usuari de la request de una sala
  @Delete(':id')
  removeUserFromRoom(@Param('id') roomId, @Req() req){
    try {
       this.roomsService.deleteUserFromRoom(req.user,roomId)
    } catch (error) {
      throw error
    }
  }

  //crear una sala amb nom + codi secret? + isPublic
  @Post('')
  createRoom(@Body() body:CreateRoomDTO,@Req() req){
    try {
      this.roomsService.createRoom(body,req.user)
    } catch (error) {
      throw  error 
    }
  }

  //unirse a una sala, si es privada codi secret
  @Patch('join/:id')
  async addUserToRoom(@Req() req, @Param('id') roomId:number, @Body() body:JoinRoomDTO){

    const room = await this.roomsService.findOneRoom(roomId)

    if(room.isPublic){
      try {
        this.roomsService.userJoinPublicRoom(req.user,roomId)
      } catch (error) {
       throw error
      }

    }else{
      try {
         this.roomsService.userJoinPrivateRoom(req.user,roomId,body.secret_key)
      } catch (error) {
        throw error
      }
    }
  }

  //afegir una beguda a una sala (todos los usuarios de la sala lo pueden hacer)
  @Patch(':idRoom/:idDrink')
  async addDrinkToRoom(
    @Req() req,
    @Param('idRoom') roomId,
    @Param('idDrink') drinkId,


){
    try {
      this.roomsService.addDrinkToRoom(roomId,req.user,drinkId)
    } catch (error) {
      console.log(error)
  
    }
    
  }
}
