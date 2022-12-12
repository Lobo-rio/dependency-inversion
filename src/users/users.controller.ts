import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('app/v1/users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get('id')
    async findById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findById(id);
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Put('id')
    async update( 
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateUserDto
    ) {
        return await this.userService.update(id, body);
    }

    @Delete('id')
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.remove(id);
    }
}
