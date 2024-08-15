import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/UpdateUserDTO';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('picture')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file:Express.Multer.File){
    console.log(file)
    return {
      message:'hola'
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
