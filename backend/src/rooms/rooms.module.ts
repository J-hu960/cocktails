import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { DrinksModule } from 'src/drinks/drinks.module';

@Module({
  imports:[TypeOrmModule.forFeature([Rooms]),AuthModule,UsersModule,DrinksModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
