import {Module} from "@nestjs/common";
import { PortModule } from './port/port.module';
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProtocolModule } from './protocol/protocol.module';
import { DataModule } from './data/data.module';
import { StatusModule } from './status/status.module';
import { ErrorsModule } from './errors/errors.module';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    PortModule,
    ProtocolModule,
    DataModule,
    StatusModule,
    ErrorsModule
  ]
})
export class AppModule {

}