import { Controller, Get, Param, Req } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import {
  notFoundResponseUserById,
  okResponseUserAll,
  okResponseUserById,
  operationsUserAll,
  operationUserById,
  paramUserById,
} from "./user-swagger.constants";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation(operationsUserAll)
  @ApiOkResponse(okResponseUserAll)
  public getUsers(@Req() _: Request) {
    return this.userService.getUsers();
  }

  @Get(":id")
  @ApiOperation(operationUserById)
  @ApiParam(paramUserById)
  @ApiOkResponse(okResponseUserById)
  @ApiNotFoundResponse(notFoundResponseUserById)
  public getUserById(@Param("id") id: number) {
    return this.userService.getUserById(id);
  }
}
