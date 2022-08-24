import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { GetCurrentUser, JwtAuthGuard, Role, Roles, RolesGuard, UserReadables } from '@shared';
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	// @Get()
	// findOneUserByQuery(@Query() query: any) {
	// 	return this.userService.findUserByQueryParam(query,null);
	// }

	// @Post('signup')
	// createUser(@Body() createUserDto:CreateUserDto){
	//     return this.userService.createUser(createUserDto);
	// }

	@Get()
	@Roles(Role.Admin)
	getAllUser() {
		return this.userService.findUsers({}, UserReadables.User);
	}

	@Get('current')
	getCurrentUser(@GetCurrentUser('id') userId: string) {
		return this.userService.findCurrentUser(userId);
	}
}
