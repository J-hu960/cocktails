import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"*"
  })
   app.setGlobalPrefix('api/v1/cocktails/');
  await app.listen(3070);
  console.log('Listening on port 3070');
}
bootstrap();
