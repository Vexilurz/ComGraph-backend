import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";

async function start() {
  const PORT = process.env.PORT || 11148
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api', {
    // exclude: [{ path: 'health', method: RequestMethod.GET }],
  })
  await app.listen(PORT, () => console.log(`ComGraph server started on port ${PORT}`))
}

start()