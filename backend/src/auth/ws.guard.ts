import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UsersService } from "src/users/users.service";

@Injectable()
export class WsAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client: Socket = context.switchToWs().getClient<Socket>();
        const token = this.extractTokenFromHeader(client.handshake);

        if (!token) {
            throw new WsException('Unauthorized');
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                { secret: 'Esta es la llave secreta deberia estar en variables de configuracion.' }
            );
            const user = await this.userService.findOne(payload.PK_User);
            console.log('Usuario: ' ,user)
            client['user'] = user;
        } catch (error) {
            throw new WsException('Unauthorized');
        }
        return true;
    }

    private extractTokenFromHeader(handshake): string | undefined {
        if (!handshake.headers.authorization) {
            throw new WsException('Unauthorized');
        }
        const [type, token] = handshake.headers.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}