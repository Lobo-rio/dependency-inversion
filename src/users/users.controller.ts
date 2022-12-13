import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('app/v1/users')
@ApiTags('Users')
export class UsersController {
    constructor(private userService: UsersService) {}
    
    @Get()
    @ApiOperation({ summary: 'List users' })
    @ApiResponse({ status:  200, description: 'OK' })
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'List a single users' })
    @ApiResponse({ status:  200, description: 'OK' })
    @ApiResponse({ status:  404, description: 'Not Found' })
    async findById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status:  201, description: 'Created' })
    @ApiResponse({ status:  400, description: 'Bad Request' })
    @ApiResponse({ status:  409, description: 'ConflictException' })
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status:  201, description: 'Created' })
    @ApiResponse({ status:  400, description: 'Bad Request' })
    @ApiResponse({ status:  404, description: 'Not Found' })
    async update( 
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateUserDto
    ) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status:  200, description: 'OK' })
    @ApiResponse({ status:  400, description: 'Bad Request' })
    @ApiResponse({ status:  404, description: 'Not Found' })
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.remove(id);
    }
}
