import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {getVersion} from "./shared/lib/packageJsonParser";

async function start() {
  const PORT = process.env.PORT || 11148
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('ComGraph backend')
    .setDescription('API documentation')
    .setVersion(getVersion())
    .addTag('API')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/help', app, document)

  app.setGlobalPrefix('api', {
    // exclude: [{ path: 'health', method: RequestMethod.GET }],
  })
  await app.listen(PORT, () => console.log(`ComGraph server started on port ${PORT}`))
}

start()