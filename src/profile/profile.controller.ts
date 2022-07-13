import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '@shared';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post()
	async create(@Body() createProfileDto: CreateProfileDto) {
		await this.profileService.create(createProfileDto);
	}

    @Get(':id')
	findOne(@Param('id') id: string) {
		return this.profileService.findOne(id);
	}
    
    @UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.profileService.findAll();
	}



	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
		return this.profileService.update(id, updateProfileDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.profileService.remove(+id);
	}
}
