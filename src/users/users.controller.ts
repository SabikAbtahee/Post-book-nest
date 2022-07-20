import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	findOneUserByQuery(@Query() query: any) {
		return this.userService.findUserByQueryParam(query,null);
	}

    // @Post(@Body)

}
