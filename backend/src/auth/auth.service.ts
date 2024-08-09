import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/CreateUserDTO';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/enitities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService:UsersService,
    private jwtService:JwtService,

){}


    async signIn(user:CreateUserDto){

    const userStored = await this.usersService.findOne(user.username)
    if(!userStored || !( await this.comparePasswords(user.password,userStored.password))){
        throw new UnauthorizedException()
     }

    const jwt = await this.createAccessToken(userStored.username)
    return jwt
    }

    async signUp(user:CreateUserDto){
     const userExist = await this.usersService.findOne(user.username)
     if(userExist){
       throw new UnauthorizedException()
     }
    try {
        const hashedPassword =  await this.hashPassword(user.password)
        const newUsername = await this.usersService.createUser(hashedPassword,user.username,)
        const jwt = await this.createAccessToken(newUsername)
     
        console.log(newUsername)
        return jwt
        
    } catch (error) {
      console.log(error)
        throw new UnauthorizedException()   
     }}

    async createAccessToken(username:string):Promise<string>{
      const payload = {username:username}
      const access_token:string = await this.jwtService.signAsync(payload)
      return  access_token
     }


    async comparePasswords(candidate:string,password:string):Promise<boolean>{
        return await bcrypt.compare(candidate,password)
       }


      async hashPassword(pass){
        return await bcrypt.hash(pass,10)
       }

  }

