import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}


    @Get(':username')
	findOneByUserName(@Param('username') username: string) {
		return this.userService.findByUserName(username);
	}
}
