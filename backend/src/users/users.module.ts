import { Module,forwardRef  } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './enitities/users.entity';
import { DrinksModule } from 'src/drinks/drinks.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),forwardRef(()=>DrinksModule),AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[TypeOrmModule.forFeature([Users]),UsersService],
})
export class UsersModule {}
