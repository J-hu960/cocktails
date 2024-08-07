import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Patch('me')
  async updateUserProfile(@Req() req, @Body() body:UpdateUserDTO){
    try {
      await this.usersService.updateUserProfile(req.user,body)   
    } catch (error) {
      throw error    
    }
  }

  @Delete('me')
  async deleteUser(@Req() req){
    try {
      await this.usersService.deleteUser(req.user)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException({error:'Error del servidor al intentar borrar al usuario'})
    }
  }

  @Get('favorites')
  async getUserFavoritesDrinks(@Req() req){
    try {
      return this.usersService.getUserFavoriteDrinks(req.user)
    } catch (error) {
      throw error    
    }
  }
}
