import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(@Req() request: Request) {
    console.log(request);
    return this.appService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }
}
