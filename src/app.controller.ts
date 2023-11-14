import {Controller, Get} from "@nestjs/common";
import {AppService} from "./app.service";

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {

  }

  @Get('/ports')
  getPorts() {
    return this.appService.getPorts()
  }
}