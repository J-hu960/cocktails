import { Module,forwardRef  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './enitities/users.entity';
import { DrinksModule } from 'src/drinks/drinks.module';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),forwardRef(()=>DrinksModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule.forFeature([Users]),UsersService],
})
export class UsersModule {}
