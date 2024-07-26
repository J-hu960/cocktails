import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:"*"
  })
   app.setGlobalPrefix('api/v1/cocktails/');
    
   const config = new DocumentBuilder()
   .setTitle('Cocktails App')
   .setDescription('Description of the cocktails API')
    .setVersion('0.0')
    .addTag('Drinks','Alochol')
    .build()

    const document = SwaggerModule.createDocument(app,config)
    SwaggerModule.setup('api', app, document);

  
  await app.listen(3070);
  console.log('Listening on port 3070');
}
bootstrap();
