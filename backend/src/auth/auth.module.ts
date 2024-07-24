import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>({
        global:true,
        secret:configService.get('SECRET_JWT'),
        signOptions:{expiresIn:'86400s'}

      })
      
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService,AuthGuard],
  exports:[AuthService,AuthGuard,JwtModule]
})
export class AuthModule {}
