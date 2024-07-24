import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService:JwtService,
        private userService:UsersService,
        private configService:ConfigService
    ){}
    async canActivate(context: ExecutionContext):Promise<boolean> {
         
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret:this.configService.get('SECRET_JWT')
                }
            )
            const user = await this.userService.findOne(payload.id)
            request['user'] =  user
            console.log(user)

            
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException();
        }
        return true
    }

    private extractTokenFromHeader(request): string | undefined {
        if(!request.headers.authorization){
            throw new UnauthorizedException()
        }
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }

}