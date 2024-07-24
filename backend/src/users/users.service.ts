import { Injectable } from '@nestjs/common';
import { Users } from './enitities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepository:Repository<Users>
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

      async  remove(id: number) {
        console.log(id)
        return this.userRepository.createQueryBuilder()
        .delete()
        .from(Users)
        .where('PK_User=:id',{id:id})
        .execute()
      }


}
