import { Module,forwardRef } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drink } from './entities/drinks.enitity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Drink]),AuthModule,forwardRef(()=>UsersModule)],
  controllers: [DrinksController],
  providers: [DrinksService],
  exports:[TypeOrmModule.forFeature([Drink]),DrinksService]
})
export class DrinksModule {}
