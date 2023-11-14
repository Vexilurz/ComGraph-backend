import {Module} from "@nestjs/common";
import { PortModule } from './port/port.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    PortModule
  ]
})
export class AppModule {

}