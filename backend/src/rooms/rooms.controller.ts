import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDTO } from './DTO/createRoomDTO';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  //borrar l'usuari de la request de una sala

  @Patch(':id/')
  removeUserFromRoom(@Param('id') roomId, @Req() req){
    
  }
    
  //crear una sala amb nom + codi secret? + isPublic
  @Post()
  createRoom(@Body() body:CreateRoomDTO,@Req() req){
    try {
      this.roomsService.createRoom(body,req.user)
    } catch (error) {
      throw  error 
    }
  }
  //unirse a una sala, si es privada codi secret
}
