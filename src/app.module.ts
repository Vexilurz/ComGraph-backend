import {Module} from "@nestjs/common";
import { PortModule } from './port/port.module';
import {ConfigModule} from "@nestjs/config";
import {ServeStaticModule} from "@nestjs/serve-static";
import { ProtocolModule } from './protocol/protocol.module';
import { StatusModule } from './status/status.module';
import { LogModule } from './log/log.module';
import { DataModule } from './data/data.module';
import { ParserModule } from './parser/parser.module';
import { NumbersModule } from './numbers/numbers.module';
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
    StatusModule,
    LogModule,
    DataModule,
    ParserModule,
    NumbersModule
  ]
})
export class AppModule {

}