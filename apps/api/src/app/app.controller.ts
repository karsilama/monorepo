import { Controller, Get, Param, Req } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { AppService } from "./app.service";
import {
  notFoundResponseUserById,
  okResponseUserAll,
  okResponseUserById,
  operationsUserAll,
  operationUserById,
  paramUserById,
} from "./users/constants";

@ApiTags("users")
@Controller("users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation(operationsUserAll)
  @ApiOkResponse(okResponseUserAll)
  public getUsers(@Req() _: Request) {
    return this.appService.getUsers();
  }

  @Get(":id")
  @ApiOperation(operationUserById)
  @ApiParam(paramUserById)
  @ApiOkResponse(okResponseUserById)
  @ApiNotFoundResponse(notFoundResponseUserById)
  public getUserById(@Param("id") id: number) {
    return this.appService.getUserById(id);
  }
}
