import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '@shared';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.profileService.findOne(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.profileService.findAll();
	}

	@Post('update')
    @HttpCode(200)
	update(@Body() updateProfileDto: UpdateProfileDto) {
		return this.profileService.update(updateProfileDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.profileService.remove(+id);
	}
}
