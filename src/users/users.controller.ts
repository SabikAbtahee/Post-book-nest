import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get()
	findOneUserByQuery(@Query() query: any) {
		return this.userService.findUserByQueryParam(query,null);
	}

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

}
