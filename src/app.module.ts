import {Module} from "@nestjs/common";
import { PortsModule } from './ports/ports.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    PortsModule
  ]
})
export class AppModule {

}